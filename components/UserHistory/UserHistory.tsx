import React, { useEffect } from 'react'
import { getFromLocalStorage } from '../../services/storageService'

const UserHistory = () => {

    useEffect(() => {
        const todo = getFromLocalStorage('user')
    }, [])



    return (
        <div>UserHistory</div>
    )
}

export default UserHistory