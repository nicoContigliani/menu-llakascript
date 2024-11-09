// pages/_app.tsx
import './globals.css'; // Importa los estilos globales
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'



function MyApp({ Component, pageProps }) {
  
  return <Component {...pageProps} />; // Renderiza la página correspondiente
}

export default MyApp;