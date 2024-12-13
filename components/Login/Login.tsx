import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice'; // Importar la acción de login
import styles from './Login.module.css';
import GoogleIcons from '@mui/icons-material/Google';

export function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch(); // Hook para despachar acciones

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;

      // Despachamos la acción de login con los datos del usuario
      dispatch(login({
        name: user.displayName || '',  // Nombre del usuario de Google
        email: user.email || '',  // Correo del usuario
        role: 'user',  // Aquí puedes definir un rol predeterminado, puedes modificar esto según sea necesario
        additionalInfo: null,  // Puedes agregar información adicional si la tienes
      }));

      console.log("Google login successful");
    } catch (error) {
      console.error("Google login error:", error);
      setError('Failed to log in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`${styles.googleButton} ${isLoading ? styles.disabledButton : ''}`}
        >
          {isLoading ? (
            <span>Logging in...</span>
          ) : (
            <span className={styles.googleContent}>
              <GoogleIcons />
              <hr />
              Sign in with Google
            </span>
          )}
        </button>
        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
