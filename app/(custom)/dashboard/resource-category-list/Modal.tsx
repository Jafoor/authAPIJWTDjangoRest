"use client";

import React, { useState, useRef } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";

const APP_URI = process.env.APP_URI;

type ResourceCat = {
  _id?: string;
  name?: string;
  description?: string;
  image?: string;
  createdAt?: string;
};

type ShowProps = {
  data: ResourceCat;
};

const ShowModal = ({ data }: ShowProps) => {
  const [formData, setFormData] = useState({
    name: data.name,
    description: data.description,
    image: data.image,
  });

  const route = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    try {
      await fetch(`${APP_URI}/api/resource-category/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Show
      </Button>

      <div ref={rootRef}>
        <Modal
          root={rootRef.current ?? undefined}
          show={open}
          onClose={() => setOpen(false)}
        >
          <Modal.Header>Message Details</Modal.Header>

          <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sub Topic Updated</h3>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                  id="name"
                  
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="description" />
              </div>
              <TextInput
                  id="description"
                  
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="image" value="image" />
              </div>
              <TextInput
                  id="image"
                  
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
            </div>

          </div>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>OK</Button>
            <Button onClick={handleSubmit}>UPDATE</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ShowModal;
