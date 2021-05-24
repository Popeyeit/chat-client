import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMessagesByIdOperation } from '../../redux/messages/operations';
import Header from '../../components/header/Header';
import styles from './styles.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getMessagesByIdOperation(userId));
  }, [dispatch, userId]);

  return (
    <section>
      <Header url="/profile" />
      <ul className={styles.list}>
        {messages.length > 0 &&
          messages.map(message => (
            <li key={message.id}>
              <p>
                <span>author: </span>
                {message.name}
              </p>
              <p>
                <span>message: </span>
                {message.message}
              </p>
              <p>
                <span>time created: </span>
                {message.timestamp}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Profile;
