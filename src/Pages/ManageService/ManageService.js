import React from 'react';
import useServices from '../../hooks/useServices';

const ManageService = () => {
    const [services, setServices] = useServices();

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete!');
        if (proceed) {
            const url = `https://sleepy-lowlands-70836.herokuapp.com/manage/delete/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                const remaining = services.filter(service => service._id !== id);
                setServices(remaining);
            });
        }
    }
    
    return (
        <div className='container mx-auto'>
            <h1 className='text-uppercase my-5 text-center'>Service List</h1>
            {
                services.map(service => <div key={service._id} className="text-center">
                        <h1>{service.name}
                            <button onClick={() => handleDelete(service._id)}>X</button>
                        </h1>
                    </div>)
            }
        </div>
    );
};

export default ManageService;