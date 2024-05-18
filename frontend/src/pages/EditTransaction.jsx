import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTransaction = () => {

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
      setLoading(true);
      axios
        .get(`http://localhost:5555/transactions/${id}`)
        .then((response) => {
          setAmount(response.data.amount);
          setCategory(response.data.category);
          setDescription(response.data.description);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert(`Error occurred:\n${error}`);
          console.log(error);
        });
    }, []);

    // For categories field
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
      setLoading(true);
      axios
        .get('http://localhost:5555/transactions')
        .then((response) => {
          setTransactions(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);
    const distinctCategories = transactions.reduce((acc, obj) => {
      if (!acc.includes(obj.category)) {
        acc.push(obj.category);
      }
      return acc;
    }, []);
    

    const handleEditTransaction = () => {
        const data = {
            amount,
            category: category === 'createCategory' ? newCategoryName : category,
            description,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/transactions/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert(`An error has occurred. Please raise to an admin.\n${error}`);
                console.log(error);
            });
    };

    return (
    <div className='p-4'>
        <Header/>
        <h1 className='text-3xl my-4'>Edit transaction</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Amount (required)</label>
                <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'>
                    <option value=''>Select a category</option>
                    {distinctCategories.map((cat) => (
                    <option value={cat}> {cat} </option>))}
                    <option value='createCategory'>Other</option>
                </select>
            </div>
            { category === 'createCategory' ?  
            (<div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Enter category name</label>
                <input type='text' value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>) : "" }
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Description</label>
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditTransaction}> Save </button>
        </div>
    </div>
    )
}

export default EditTransaction;