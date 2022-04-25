import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service, setService] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    const handlePlaceOrder = e => {
        e.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }

        axios.post('http://localhost:5000/order', order)
        .then(res => {
            console.log(res.data);
            toast('Order Placed Successfuly!')
        });

    };

    return (
        <div className='container'>
            <h2 className='text-center my-5'>Please Checkout your booking</h2>
            <form onSubmit={handlePlaceOrder} className='d-flex flex-column align-items-center'>
                <input type="text" value={service?.name} name='service' placeholder='Service' style={{'width': '400px'}} className="mb-3 py-2 rounded" readOnly disabled/>
                <input type="text" value={user?.displayName} name='name' placeholder='Name' style={{'width': '400px'}} className="mb-3 py-2 rounded" readOnly disabled/>
                <input type="email" value={user?.email} name='email' placeholder='Email' style={{'width': '400px'}} className="mb-3 py-2 rounded" readOnly disabled/>
                <input type="number" name='phone' placeholder='Phone' style={{'width': '400px'}} className="mb-3 py-2 rounded" />
                <input type="text" name='address' placeholder='Address' style={{'width': '400px'}} className="mb-3 py-2 rounded" />
                <button className='btn btn-primary'> Place Order </button>
            </form>
        </div>
    );
};

export default Checkout;