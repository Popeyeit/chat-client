import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { logoutOperation } from '../../redux/user/operations';
import Modal from '../modal/Modal';
import RoomForm from '../roomForm/RoomForm';
import styles from './styles.module.css';

const Header = ({ url = '/' }) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const openModal = id => {
    setIsOpenedModal(true);
  };
  const closeModalByKey = e => {
    if (e.code === 'Escape') {
      setIsOpenedModal(false);

      return;
    }
  };
  const closeModal = e => {
    if (!e) {
      setIsOpenedModal(false);

      return;
    }
    if (!e.target) {
      setIsOpenedModal(false);
      return;
    }
    if (e.target === e.currentTarget) {
      setIsOpenedModal(false);
    }
    if (e.target.dataset.close === 'close') {
      setIsOpenedModal(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutOperation());
  };

  const history = useHistory();
  const handleRedirect = () => {
    if (url === '/') {
      history.push('/chat');
    } else {
      history.push('/');
    }
  };

  return (
    <>
      {isOpenedModal && (
        <Modal closeModalByKey={closeModalByKey} closeModal={closeModal}>
          <RoomForm closeModal={closeModal} />
        </Modal>
      )}
      <div className={styles.header}>
        <div className={styles.header_btn_wrapper}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleRedirect}
          >
            {url === '/' ? 'Start chatting' : 'Home'}
          </Button>
          {url === '/chat' && (
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={openModal}
            >
              Create Room
            </Button>
          )}
        </div>

        {user.name && (
          <div className={styles.user_wrapper}>
            <button className={styles.logout_btn} onClick={handleLogout}>
              <ExitToAppIcon />
            </button>
            <p>{user?.name}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
