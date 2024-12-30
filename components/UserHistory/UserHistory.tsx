import React, { useEffect, useState } from 'react'
import { getFromLocalStorage } from '../../services/storageService'
import { useAuth } from '../../hooks/useAuth';
import ReactVirtualizedTable from '../Table/Table';
import styles from './userHistory.module.css'

const UserHistory = () => {
    const { user } = useAuth();
    const [getUser, setGetUser] = useState<any | any[] | undefined>()
    useEffect(() => {
        setGetUser(user)
    }, [user])



    return (
        <div className={styles.menuWrapper}>
            <h2>
                UserHistory
            </h2>
            {
                getUser && <ReactVirtualizedTable />
            }
        </div>
    )
}

export default UserHistory