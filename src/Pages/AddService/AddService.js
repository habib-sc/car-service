import React from 'react';
import { useForm } from 'react-hook-form';

const AddService = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        const url = `https://sleepy-lowlands-70836.herokuapp.com/service/add`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        });
    };

    return (
        <div>
            <h1 className='text-center'>Add A Service Here...</h1>

            <form className='d-flex flex-column mx-auto mt-3' style={{'width': '400px'}} onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-3' placeholder='Service Name' {...register("name")} />
                <textarea className='mb-3' placeholder='description' {...register("description")} />
                <input className='mb-3' placeholder='Price' {...register("price")} />
                <input className='mb-3' placeholder='Image URL' {...register("img")} />
                <input className='mb-3' placeholder='' type="submit" value="Add Service" />
            </form>
        </div>
    );
};

export default AddService;