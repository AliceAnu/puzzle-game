import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        {title && <h2 className="font-sans text-xl text-primary mb-4">{title}</h2>}
        <div className="mb-4">{children}</div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
