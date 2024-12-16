import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styles from './index.module.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchData } from '../../servicesApi/fetch.services';

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setExcelData] = useState<any | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetchData('GET', '/api/admin');
        console.log('🚀 ~ return ~ response:', response);

        if (response.ok) {
          setExcelData(response?.data);
          setIsLoaded(true);
        } else {
          router.push('/notfound');
        }
      } catch (error) {
        console.error('Error in fetchDataAsync:', error);
        router.push('/notfound');
      }
    };
    fetchDataAsync();
  }, [router]);


  const updateDB = async () => {
    alert("si")
  }




  return (
    <Layout>
      <div className={styles.body}>
        <h1>Hello</h1>
        <div className={styles.buttonContainer}>
          <button onClick={() => { /* Add reload DB logic */ }}>Reload DB</button>
          <button onClick={() => { updateDB() }}>Update DB</button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
