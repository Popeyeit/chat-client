import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { createMessageOperation } from '../../redux/messages/operations';
import {
  getRoomByIdOperation,
  changeRoomOperation,
} from '../../redux/room/operations';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import Modal from '../../components/modal/Modal';
import styles from './styles.module.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const user = useSelector(state => state.auth.user);
  const { roomId } = useParams();

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const openModal = () => {
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

  useEffect(() => {
    dispatch(getRoomByIdOperation(roomId));
  }, [roomId, dispatch]);

  useEffect(() => {
    const allEl = document.querySelector('#chat')?.querySelectorAll('p');

    if (!allEl) {
      return;
    }

    const el = allEl[allEl.length - 1];

    if (!el) {
      return;
    }

    el.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    if (roomId) {
      dispatch(createMessageOperation({ message, roomId }));
      dispatch(changeRoomOperation(roomId, message));
    }
    setMessage('');
  };
  return (
    <section className={styles.page}>
      {isOpenedModal && (
        <Modal closeModalByKey={closeModalByKey} closeModal={closeModal}>
          <Sidebar visible={true} />
        </Modal>
      )}

      <div className={styles.page_wrapper}>
        <Header url="/chat" />
        <Sidebar />
        <div className={styles.chat}>
          <div className={styles.chat_body} id="chat">
            {messages.length > 0 &&
              messages.map(message => (
                <p
                  key={message.id}
                  className={`${
                    message?.name === user.name
                      ? styles.chat_my_message
                      : styles.chat_message
                  }`}
                >
                  <span className={styles.chat_login}>{message.name}</span>
                  {message.message}
                </p>
              ))}
          </div>
          <div className={styles.chat_footer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                placeholder="Type a message"
                name="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                minLength="1"
              />

              <div className={styles.chat_wrapper_btn}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Send a message
                </Button>
              </div>
              <div className={styles.room_btn} onClick={openModal}>
                <button type="button">
                  <MeetingRoomIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
