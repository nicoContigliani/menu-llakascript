import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "./layout.module.css";
import Footer from "../components/footer/Footer";
import flamaSvg from "../icons/flama.svg"; // Asegúrate de que esta ruta sea válida
import HeaderBody from "./HeadersBody/HeadersBody";
import SliderSudoAdmin from "./sliderSudoAdmin/SliderSudoAdmin";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {

  const user = useSelector((state: RootState) => state.user);  // Accede al estado del usuario

  return (
    <div className={styles.body}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeaderBody logo={flamaSvg.src} title="LlakaScript" /> {/* Se usa Header en lugar de Headers */}
      {children}
      {user.user?.email === 'nico.contigliani@gmail.com' ?
        < SliderSudoAdmin /> : null
      }
      <Footer />
    </div>
  )
};

export default Layout;