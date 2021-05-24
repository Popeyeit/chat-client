import React, { useEffect } from 'react';
import styles from './styles.module.css';
const Modal = ({ children, closeModal, closeModalByKey }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModalByKey);

    return () => {
      window.removeEventListener('keydown', closeModalByKey);
    };
  }, [closeModalByKey]);
  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.modal_content}>
        {children}
        <button
          className={styles.close}
          type="button"
          data-close="close"
        ></button>
      </div>
    </div>
  );
};

export default Modal;
