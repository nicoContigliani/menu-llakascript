import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebase';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import styles from './index.module.css';

export function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  if (user) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.welcomeText}>Welcome, {user.email}!</div>
          <button
            onClick={() => auth.signOut()}
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
        {isLogin ? <Login /> : <Register />}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className={styles.toggleFormButton}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
