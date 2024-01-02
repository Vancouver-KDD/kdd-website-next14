import 'server-only'
import admin, {type ServiceAccount} from 'firebase-admin'

const serviceAccount = {
  clientEmail: process.env.FIREABSE_ADMIN_CLIENT_EMAIL,
  projectId: process.env.FIREABSE_ADMIN_PROJECT_ID,
  privateKey: process.env.FIREABSE_ADMIN_PRIVATE_KEY,
} as ServiceAccount

export const app =
  (admin.apps.length > 0 && admin.apps[0]) ||
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

export const increment = admin.firestore.FieldValue.increment
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
export const db = app.firestore()
