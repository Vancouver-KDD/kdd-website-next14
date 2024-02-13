import {User} from 'firebase/auth'
import {DocumentReference, Query, doc, onSnapshot} from 'firebase/firestore'
import {atom, Getter, type Atom} from 'jotai'
import {atomEffect} from 'jotai-effect'
import {db, firebaseAuth} from './actions/firebase'
import {DB} from './app'

function getAtomFromDocRef<T>(_getDocRef: (get: Getter) => DocumentReference | null) {
  const _value = atom<T | null | undefined>(undefined)
  const _valueEffect = atomEffect((get, set) => {
    const docRef = _getDocRef(get)
    console.log('docRef', docRef)
    if (docRef) {
      const unsub = onSnapshot(docRef, (snap) => {
        set(_value, (snap.data() as T) ?? null)
      })
      return () => {
        console.log('unsub')
        unsub()
      }
    } else {
      set(_value, null)
    }
  })
  const _atom = atom<T | null | undefined>((get) => {
    get(_valueEffect) // registers the atom effect
    return get(_value)
  })
  // const _storybookAtom = atom<T | null | undefined>(undefined)
  // const _newAtom = atom<T | null | undefined, [T | null], void>(
  //   (get) => get(_storybookAtom) ?? get(_atom),
  //   (get, set, _newValue) => {
  //     set(_storybookAtom, _newValue)
  //   }
  // )
  // return _newAtom
  return _atom
}

function getAtomFromQuery<T>(_getQuery: (get: Getter) => Query | null) {
  const _value = atom<Map<string, T> | undefined>(undefined)
  const _valueEffect = atomEffect((get, set) => {
    const query = _getQuery(get)
    return query
      ? onSnapshot(query, (snap) => {
          const data = new Map<string, T>()
          for (const doc of snap.docs) {
            data.set(doc.id, {...(doc.data() as T), id: doc.id})
          }
          set(_value, data)
        })
      : set(_value, new Map<string, T>())
  })
  return atom<Map<string, T> | undefined, [Map<string, T>], void>(
    (get) => {
      get(_valueEffect) // registers the atom effect
      return get(_value)
    },
    (get, set, _newValue) => {
      set(_value, _newValue)
    }
  )
}

export const authUser = atom<User | null | undefined>(undefined)
authUser.onMount = (setSelf) => firebaseAuth?.onAuthStateChanged(setSelf)

export const user = getAtomFromDocRef<DB.User>((get) => {
  const uid = get(authUser)?.uid
  return uid ? doc(db, `Users/${uid}`) : null
})
