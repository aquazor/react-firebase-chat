import { createPortal } from 'react-dom';

type ModalLayoutProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const ModalLayout = ({ onClose, children }: ModalLayoutProps) => {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-10 bg-black bg-opacity-35"
      ></div>
      {children}
    </>,
    document.querySelector('.modals')!,
  );
};

export default ModalLayout;
