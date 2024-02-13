import React from 'react'

type Props = {}

const Settings: React.FC<Props> = (props) => {
  return (
    <section className="flex-center flex-col">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-4">
        <div className="w-full px-5 pt-2">
          <div className="p-4">
            <h1 className="text-xl font-semibold text-royalBlue-700">Settings</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
