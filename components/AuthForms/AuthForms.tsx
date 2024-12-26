import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebase';
// import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import styles from './index.module.css';
import UserHistory from '../UserHistory/UserHistory';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/sudoAdminSlice';
import Auths from '../Auths/Auths';

export function AuthForms() {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const { user } = useAuth();
  const getOut = () => {
    auth.signOut()
    dispatch(logout())
  }

  if (user) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <UserHistory />
          <div className={styles.welcomeText}>Welcome, {user.email}!</div>
          <button
            onClick={() => getOut()}
            className={styles.signOutButton}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* {isLogin ? <Login /> : <Register />} */}
        {isLogin && <Auths />}

        {/* <button
          onClick={() => setIsLogin(!isLogin)}
          className={styles.toggleFormButton}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button> */}
      </div>
    </div>
  );
}
