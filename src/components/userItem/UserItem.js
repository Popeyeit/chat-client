import React from 'react';
import { NavLink } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from './styles.module.css';

const StyledBadge = withStyles(theme => ({
  badge: {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
    colorPrimary: { color: '#44b700' },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function BadgeAvatars({ name, status, id }) {
  const classes = useStyles();

  return (
    <NavLink to={`/profile/${id}`} className={styles.item}>
      <div className={classes.root}>
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
          className={`${
            status === 'online' ? styles.badge_online : styles.badge_offline
          }`}
        >
          <Avatar
            className={classes.large}
            alt="avatar"
            src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"
          />
        </StyledBadge>
        <div className={styles.login}>
          <p> {name}</p>
        </div>
      </div>
    </NavLink>
  );
}
