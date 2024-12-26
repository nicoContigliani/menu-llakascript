import React from 'react';

const useAuths = (userTest: any | any[] | undefined) => {
    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userTest),
        });

        //acá va la db


        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem('token', token);
            // router.push('/profile'); // Uncomment this if you have router logic
        } else {
            alert('Credenciales inválidas');
        }
    };

    return {
        handleSubmitLogin,
    };
};

export default useAuths;
