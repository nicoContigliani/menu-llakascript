import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store'; // Asegúrate de que esta ruta sea correcta
import { logout } from '../redux/slices/userSlice'; // Asegúrate de importar la acción logout correctamente

import styles from './index.module.css';
import { AuthForms } from '../components/AuthForms/AuthForms';
import LogoPresentation from '../components/LogoPresentation/LogoPresentation';
import UserHistory from '../components/UserHistory/UserHistory';





// Importación dinámica del componente QRScanner
const QRScanner = dynamic(() => import('../components/QrScanner/QrScanner'), {
  ssr: false,
  loading: () => <p>Loading QR Scanner...</p>,
});

const IndexPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);  // Accede al estado del usuario
  console.log("🚀 ~ IndexPage ~ user:", user)

  // Handler para logout
  const handleLogout = () => {
    dispatch(logout());  // Despacha la acción de logout
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
          {user.isLoggedIn ? (
            <>
              {/* <p>Welcome, {user.user?.name}!</p>
              <p>Role: {user.user?.role}</p>
              {user.user?.additionalInfo && <p>Info: {user.user.additionalInfo}</p>} */}
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
          {/* {user.isLoggedIn && user.user?.role === 'admin' && (
            <Link href="/admin-dashboard" className={styles.link}>
              Admin Dashboard
            </Link>
          )} */}
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
