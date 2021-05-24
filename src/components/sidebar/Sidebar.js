import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomsOperation } from '../../redux/room/operations';
import SidebarItem from '../sidebarItem/SidebarItem';
import styles from './styles.module.css';

const Sidebar = ({ visible = false }) => {
  const rooms = useSelector(state => state.rooms);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomsOperation());
  }, [dispatch]);
  return (
    <>
      <div className={`${styles.sidebar} ${visible ? styles.visible : null}`}>
        {rooms.length > 0 &&
          rooms.map(room => <SidebarItem key={room._id} {...room} />)}
      </div>
    </>
  );
};

export default Sidebar;
