"use client"

import React, {useState} from 'react';
import { Button, Modal } from 'flowbite-react';

type Contact = {
    _id?:string,
    name?: string,
    email?: string,
    message?: string,
    subject?: string,
    createdAt?: string
}

type ShowProps = {
    deleteBtn: () => void;
    data: Contact;
  }

const ShowModal = ({ deleteBtn, data}: ShowProps ) => {
    const [open, setOpen] = useState(false);
  return (
    <>
      
<Button  onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Show
</Button>

<Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>Message Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h1>
                {data.name}
            </h1>

            <h1>
                {data.email}
            </h1>

            <h1>
                {data.subject}
            </h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {data.message}
            </p>
            <p>
                {data.createdAt &&
                new Date(data.createdAt).toLocaleString()
                }
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>OK</Button>
          <Button color="gray" onClick={deleteBtn}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ShowModal
