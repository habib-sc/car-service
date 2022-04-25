import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect( () => {
        
        const getOrders = async() => {
            const email = user?.email;
            const url = `https://sleepy-lowlands-70836.herokuapp.com/orders?email=${email}`;
            try{
                await axiosPrivate.get(url)
                .then(res => setOrders(res.data));
            }
            catch(error){
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();
    }, []);

    return (
        <div className='container'>
            <h1>Orders {orders.length}</h1>
            <div>
                {
                    orders.map(order => <div key={order._id}>
                        <p>{order.email} : {order.service}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Orders;