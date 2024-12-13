import dynamic from 'next/dynamic';
import Link from 'next/link';

import styles from './index.module.css';
import { AuthForms } from '../components/AuthForms/AuthForms';
import LogoPresentation from '../components/LogoPresentation/LogoPresentation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { RootState } from '../redux/store/store';
import { useState } from 'react';

// Importación dinámica del componente QRScanner
const QRScanner = dynamic(() => import('../components/QrScanner/QrScanner'), {
  ssr: false,
  loading: () => <p>Loading QR Scanner...</p>,
});

const IndexPage = () => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  console.log("🚀 ~ IndexPage ~ userState:", userState)

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.body}>
      {/* Main Content */}
      <div className={styles.qrContainer}>
        <AuthForms />
      </div>

      <div className={styles.container}>
        <LogoPresentation />

        <div className={styles.textContainer}>
          <h1 className={styles.title}>LlakaScript</h1>
          <h2 className={styles.titleApp}>Menu</h2>
        </div>

        <div className={styles.userInfo}>
          {isLoggedIn ? (
            <>
              <p>Welcome, {user?.name}!</p>
              <p>Role: {user?.role}</p>
              {user?.additionalInfo && <p>Info: {user.additionalInfo}</p>}
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <p>Please log in to access more features.</p>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/companies/LlakaScript" className={styles.link}>
            LlakaScript
          </Link>
          {isLoggedIn && user?.role === 'admin' && (
            <Link href="/admin-dashboard" className={styles.link}>
              Admin Dashboard
            </Link>
          )}
          <Link href="/brandgrid" className={styles.link}>
            Empresa
          </Link>
        </div>
      </div>

      <div className={styles.qrContainer}>
        <QRScanner />
      </div>
    </div>
  );
};

export default IndexPage;