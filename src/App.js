import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserOperation } from './redux/user/operations';
import { create } from './redux/messages/slice';
import Pusher from 'pusher-js';
import Home from './pages/home/Home';
import Chat from './pages/chat/Chat';
import Auth from './pages/auth/Auth';
import Profile from './pages/profile/Profile';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const pusher = new Pusher('1bcb3902369132546112', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', data => {
      dispatch(create(data));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(getCurrentUserOperation());
  }, [dispatch]);
  return (
    <div className="App">
      <>
        {token ? (
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/chat/:roomId">
              <Chat />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/profile/:userId">
              <Profile />
            </Route>

            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" exact>
              <Auth url="/login" />
            </Route>

            <Route path="/register">
              <Auth url="/register" />
            </Route>

            <Redirect to="/login" />
          </Switch>
        )}
      </>
    </div>
  );
}

export default App;
