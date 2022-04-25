import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);

    useEffect( () => {
        
        const getOrders = async() => {
            const email = user?.email;
            const url = `http://localhost:5000/orders?email=${email}`;
            await axios.get(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => setOrders(res.data));
        }
        getOrders();
    }, []);

    return (
        <div className='container'>
            <h1>Orders {orders.length}</h1>
        </div>
    );
};

export default Orders;