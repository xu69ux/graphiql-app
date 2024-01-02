import { FC } from 'react';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-window'>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};
