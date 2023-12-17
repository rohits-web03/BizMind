import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function SupplierProfile({handleProfile,supplier}) {
  // The open/closed state lives outside of the Dialog and is managed by you
  let [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onClose={() => {
        handleProfile();
        setIsOpen(false)
    }
    }>
      <Dialog.Panel>
        <Dialog.Title>supplier</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        {/*
          You can render additional buttons to dismiss your dialog by setting
          `isOpen` to `false`.
        */}
        {/* <button onClick={() => setIsOpen(false)}>Cancel</button>
        <button onClick={handleDeactivate}>Deactivate</button> */}
      </Dialog.Panel>
    </Dialog>
  )
}  

export default SupplierProfile;