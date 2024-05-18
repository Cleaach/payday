import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowTransaction = () => {

  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams()

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/transactions/${id}`)
      .then((response) => {
        setTransaction(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'> 
      <Header/>
      <h1 className='text-3xl my-4'> Transaction details </h1>
      { loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Transaction ID</span>
            <span> {transaction._id} </span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Amount</span>
            <span> {transaction.amount} </span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Category</span>
            <span> {transaction.category} </span> {/* TODO: add functionality for no category/desc later on */}
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description</span>
            <span> {transaction.description} </span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Date created</span>
            <span> {new Date(transaction.createdAt).toString()} </span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Date modified</span>
            <span> {new Date(transaction.updatedAt).toString()} </span>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default ShowTransaction;