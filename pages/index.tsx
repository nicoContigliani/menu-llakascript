import Link from "next/link";
import Layout from "../components/Layout";
import styles from './index.module.css'
import Image from "next/image";
import flamaSvg from '../icons/flama.svg';



const IndexPage = () => (
  <div className={styles.container}>
    <div className={styles.image}>
      <Image src={flamaSvg} width={300} height={200} alt="Logo" />
    </div>

    <div className={styles.textContainer}>
      <div className={styles.title}>LlakaScript</div>
      <div className={styles.titleApp}>Menu</div>
    </div>
    <div className={styles.button} >
      <Link href={`/companies/LlakaScript`} className="text-#ffffff-600 hover:underline">
        <div>
          LlakaScript
        </div>
      </Link>
      <div>Ver Menú</div>
      <div>Nueva Empresa</div>

    </div>

  </div>
);

export default IndexPage;
