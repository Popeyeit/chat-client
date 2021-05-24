import React from 'react';
import AuthForm from '../../components/authForm/AuthForm';
import image from '../../images/group_chat.svg';
import styles from './styles.module.css';

const Auth = ({ url }) => {
  return (
    <section className={styles.page}>
      <div className={styles.title_wrapper}>
        <img src={image} alt="group chat" title="" />
        <h1>Allows you to read and send messages anywhere and anytime.</h1>
      </div>
      <AuthForm url={url} />
    </section>
  );
};

export default Auth;
