import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserOperation } from '../../redux/user/operations';
import Item from '../userItem/UserItem';
import styles from './styles.module.css';

const UserList = ({ sortValue = 'all' }) => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const sortUser = useMemo(() => {
    switch (sortValue) {
      case 'all':
        return users;

      case 'online':
        return users.filter(user => user.status === sortValue);

      case 'offline':
        return users.filter(user => user.status === sortValue);

      default:
        return users;
    }
  }, [sortValue, users]);
  useEffect(() => {
    dispatch(getAllUserOperation());
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      {sortUser.map(user => (
        <Item key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default UserList;
