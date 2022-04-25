import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);

    useEffect( () => {
        const email = user?.email;
        const url = `http://localhost:5000/orders?email=${email}`;
        const getOrders = async() => {
            await axios.get(url)
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