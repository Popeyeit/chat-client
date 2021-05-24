import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import styles from './styles.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(2),
    },
    cursor: 'pointer',
    width: '100%',
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));

const SidebarItem = ({
  name,
  lastMessage = 'This is the last message',
  _id,
}) => {
  const classes = useStyles();
  return (
    <NavLink
      to={`/chat/${_id}`}
      activeClassName={styles.active}
      className={styles.sidebar_item}
    >
      <div className={classes.root}>
        {
          <div className={styles.avatar_wrapper}>
            <Avatar
              alt="avatar"
              src="/broken-image.jpg"
              className={classes.blue}
            >
              {name.length > 0 && name[0].toUpperCase()}
            </Avatar>
          </div>
        }
        <div className={styles.sidebar_info}>
          <h2>{name}</h2>
          <p>{lastMessage}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default SidebarItem;
