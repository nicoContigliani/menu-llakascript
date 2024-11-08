import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "./layout.module.css";
import Footer from "../components/footer/Footer"
type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className={styles.body}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link> |{" "}
        <Link href="/users">Users List</Link> |{" "}
        <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
     <Footer/>
  </div>
);

export default Layout;
