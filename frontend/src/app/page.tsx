"use client";

import { useState } from "react";

import Button from "./t1-components-library/components/Button/Button";
import Input from "./t1-components-library/components/Input/Input";
import Card from "./t1-components-library/components/Card/Card";
import Modal from "./t1-components-library/components/Modal/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<null | 'small' | 'medium' | 'large'>(null);

  return (
    <div className="p-8 space-y-12 font-sans">
      <h1 className="text-3xl font-bold">Component Library Demo</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" state="loading">
            Loading
          </Button>
          <Button variant="primary" state="disabled">
            Disabled
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input label="Default" placeholder="Your name" />
          <Input label="Email" type="email" placeholder="email@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input label="Success" state="success" placeholder="Valid input" />
          <Input label="Error" state="error" placeholder="Invalid input" />
          <Input label="Disabled" disabled placeholder="Disabled input" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Modals</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setIsModalOpen("small")}>
            Open Small Modal
          </Button>
          <Button onClick={() => setIsModalOpen("medium")}>
            Open Medium Modal
          </Button>
          <Button onClick={() => setIsModalOpen("large")}>
            Open Large Modal
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen === "small"}
          onClose={() => setIsModalOpen(null)}
          size="small"
          header={<div className="text-base font-bold">Small Modal</div>}
          body={<div>This is a small modal with compact content.</div>}
          footer={<Button onClick={() => setIsModalOpen(null)}>Close</Button>}
        />

        <Modal
          isOpen={isModalOpen === "medium"}
          onClose={() => setIsModalOpen(null)}
          size="medium"
          header={<div className="text-lg font-bold">Medium Modal</div>}
          body={
            <div>
              This is a medium-sized modal. Good for form inputs or messages.
            </div>
          }
          footer={<Button onClick={() => setIsModalOpen(null)}>Close</Button>}
        />

        <Modal
          isOpen={isModalOpen === "large"}
          onClose={() => setIsModalOpen(null)}
          size="large"
          header={<div className="text-xl font-bold">Large Modal</div>}
          body={
            <div>
              <p>
                This is a large modal. Ideal for showing detailed content like
                tables or long forms.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                You can add more complex layouts here.
              </p>
            </div>
          }
          footer={<Button onClick={() => setIsModalOpen(null)}>Close</Button>}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            header={<div className="font-semibold">Card Header</div>}
            body={<div>This is the body of the card.</div>}
            footer={<div className="text-sm text-gray-600">Card Footer</div>}
            borderStyle="default"
          />
          <Card
            image="https://picsum.photos/700/300"
            header={<div className="font-semibold">With Image</div>}
            body={<div>Image-supported content.</div>}
            footer={<div className="text-sm">Image Footer</div>}
            borderStyle="rounded"
          />
          <Card
            body={<div>Only body, outlined border</div>}
            borderStyle="outlined"
          />
        </div>
      </section>
    </div>
  );
}
