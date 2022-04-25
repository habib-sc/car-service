import { useEffect, useState } from 'react';

const useServiceDetail = (serviceId) => {
    const [service, setService] = useState({});
    const url = `http://localhost:5000/service/${serviceId}`;

    useEffect( () => {
        fetch(url)
        .then(res => res.json())
        .then(data => setService(data));
    }, [serviceId]);

    return [service];
};

export default useServiceDetail;