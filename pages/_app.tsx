// pages/_app.tsx
import './globals.css'; // Importa los estilos globales
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useMongoDbConnection } from '../hooks/useMongoDbConnection';

function MyApp({ Component, pageProps }) {
  const { isConnected, error, isLoading, verifyConnection } = useMongoDbConnection();
  console.log("🚀 ~ MyApp ~ error:", error)
  console.log("🚀 ~ MyApp ~ isConnected:", isConnected)


  // useEffect(() => {
  //   if (!isConnected) {
  //     const interval = setInterval(() => {
  //       console.log('Attempting to verify MongoDB connection...');
  //       verifyConnection();
  //     }, 5000); // Intenta reconectar cada 5 segundos

  //     return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  //   }
  // }, [isConnected, verifyConnection]);
  return (
    <Provider store={store}> {/* Envuelve la aplicación con el Provider */}
      {
        !isConnected ? <button onClick={verifyConnection}>Verify MongoDB</button> : null

      }

      <Component {...pageProps} /> {/* Renderiza la página correspondiente */}
    </Provider>
  );
}

export default MyApp;