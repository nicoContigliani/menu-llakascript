// import { useState } from 'react';
// import { signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
// import { auth } from '../../lib/firebase';
// import { useDispatch } from 'react-redux';
// import { login } from '../../redux/slices/userSlice'; // Importar la acción de login
// import styles from './index.module.css';
// import GoogleIcons from '@mui/icons-material/Google';

// const Auths = () => {
//     const [error, setError] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const dispatch = useDispatch(); // Hook para despachar acciones

//     const handleGoogleLogin = async () => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             const provider = new GoogleAuthProvider();
//             const result: UserCredential = await signInWithPopup(auth, provider);
//             const user = result.user;

//             // Despachamos la acción de login con los datos del usuario
//             dispatch(login({
//                 name: user.displayName || '',  // Nombre del usuario de Google
//                 email: user.email || '',  // Correo del usuario
//                 role: 'user',  // Aquí puedes definir un rol predeterminado, puedes modificar esto según sea necesario
//                 additionalInfo: null,  // Puedes agregar información adicional si la tienes
//             }));

//             console.log("Google login successful!!!!!!!!!!!!!!1");
//         } catch (error) {
//             console.error("Google login error:", error);
//             setError('Failed to log in with Google. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };







//     return (
//         <div className={`${styles.container}`}>
//             <div className={styles.card}>
//                 <h1 className={styles.title}>Login</h1>
//                 <button
//                     onClick={handleGoogleLogin}
//                     disabled={isLoading}
//                     className={`${styles.googleButton} ${isLoading ? styles.disabledButton : ''}`}
//                 >
//                     {isLoading ? (
//                         <span>Logging in...</span>
//                     ) : (
//                         <span className={styles.googleContent}>
//                             <GoogleIcons />
//                             <hr />
//                             Sign in with Google
//                         </span>
//                     )}
//                 </button>
//                 {error && (
//                     <div className={styles.error} role="alert">
//                         {error}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Auths


import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAppDispatch } from '../../redux/hooks'; // Import the new hook
import styles from './index.module.css';
import GoogleIcons from '@mui/icons-material/Google';
import useAuths from '../../hooks/useAuths';
import { login } from '../../redux/slices/userSlice';

const Auths = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userTest, setUserTest] = useState<any[] | any | undefined>()
    const dispatch = useAppDispatch(); // Use the new hook

    const { handleSubmitLogin } = useAuths(userTest);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);

        const attemptLogin = async () => {
            try {
                const provider = new GoogleAuthProvider();
                const result: UserCredential = await signInWithPopup(auth, provider);
                const user = result.user;

                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email }),
                });

                if (response.ok) {
                    const { user: userData, token } = await response.json();

                    // Guarda usuario y token en Redux
                    dispatch(login({ user: userData, token }));

                    // Guarda usuario y token en localStorage
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('token', token);
                    localStorage.setItem('isLoggedIn', 'true');

                    console.log("Login successful");
                    return true;
                } else {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.error || 'Credenciales inválidas');
                }
            } catch (error) {
                console.error("Google login error:", error);
                setError('Failed to log in with Google. Please try again.');
                return false;
            }
        };

        try {
            const firstAttempt = await attemptLogin();
            if (!firstAttempt) {
                console.log("Retrying login...");
                const secondAttempt = await attemptLogin();
                if (!secondAttempt) {
                    setError('Login failed after two attempts. Please try again later.');
                }
            }
        } catch (error) {
            console.error("Error in login process:", error);
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <div className={`${styles.container}`}>
            <div className={styles.card}>
                {/* <h1 className={styles.title}>Login</h1> */}
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
    )
}

export default Auths;

