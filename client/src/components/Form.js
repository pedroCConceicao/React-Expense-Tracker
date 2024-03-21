import React from 'react';
import { useForm } from 'react-hook-form';
import List from './List';

export default function Form() {

    const {register, handleSubmit, resetField} = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='form max-w-sm mx-auto w-96'>
            <h1 className='font-bold pb-4 text-xl'>Transação</h1>

            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-4'>
                    <div className='input-group'>
                        <input type='text' {...register('name')} placeholder='Nome' className='form-input' />
                    </div>
                    <select className='form-input' {...register('type')}>
                        <option value="Investimento" defaultValue>Investimento</option>
                        <option value="Gasto" defaultValue>Gasto</option>
                        <option value="Saque" defaultValue>Saque</option>
                    </select>
                    <div className='input-group'>
                        <input type='text' placeholder='Quantia' className='form-input' {...register('amount')} />
                    </div>
                    <div className='submit-btn'>
                        <button className='border py-2 text-white bg-indigo-500 w-full'>Pronto</button>
                    </div>
                </div>
            </form>

            <List></List>
        </div>
    )
}
