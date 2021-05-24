import React, { useState } from 'react';
import UserList from '../../components/userList/UserList';
import Sort from '../../components/sort/Sort';

import styles from './styles.module.css';
import Header from '../../components/header/Header';

const Home = () => {
  const [sortValue, setSortValue] = useState('all');

  const handleChange = event => {
    setSortValue(event.target.value);
  };

  return (
    <section>
      <Header url="/" />
      <div className={styles.sort_wrapper}>
        <Sort handleChange={handleChange} sortValue={sortValue} />
      </div>
      <div className={styles.users_list_wrapper}>
        <UserList sortValue={sortValue} />
      </div>
    </section>
  );
};

export default Home;
