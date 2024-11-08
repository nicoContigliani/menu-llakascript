// pages/_app.tsx
import './globals.css'; // Importa los estilos globales

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />; // Renderiza la página correspondiente
}

export default MyApp;