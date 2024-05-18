  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import Spinner from '../components/Spinner';
  import Header from '../components/Header';
  import { Link } from 'react-router-dom';
  import { AiOutlineEdit } from 'react-icons/ai';
  import { BsInfoCircle } from 'react-icons/bs';
  import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

  const Home = () => {
    const [loading, setLoading] = useState(false);
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


    // Total cashflow
    const cashflow = transactions.reduce((i, transaction) => i + transaction.amount, 0);

    // Monthly cashflow
    const currentDate = new Date();
    const monthlyCashflow = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate.getMonth() === currentDate.getMonth() && transactionDate.getFullYear() === currentDate.getFullYear();
    }).reduce((total, transaction) => {return total + transaction.amount;}, 0);

    return (
      <div className='p-4'>
        <Header atHome="yes" username="Clement"/>
        
        {loading ? (<Spinner />) : 
        (<div className='flex justify-center items-center gap-x-4'>
          <h2 className='text-2xl my-8'>Your {`${currentDate.toLocaleDateString('en-US',{month: 'long'})}`} cashflow: ${`${monthlyCashflow.toString()}`}</h2>
        </div>)}
        
        {/* TOTAL CASHFLOW {loading ? (<Spinner />) : 
        (<div className='flex justify-center items-center gap-x-4'>
          <h3 className='text-1xl my-2'>Total cashflow: {`${cashflow.toString()}`}</h3>
        </div>)}*/}
        
        <div className='flex justify-center items-center gap-x-4'>
          <h1 className='text-1xl my-2'> Add a new transaction </h1>
          <Link to='/transactions/create'>
            <MdOutlineAddBox className='text-sky-800 text-2xl' />
          </Link>
        </div>
        
        {loading ? (<Spinner />) : 
        (<table className='w-full border-separate border-spacing-2'>
          <thead>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Date</th>
            <th className='border border-slate-600 rounded-md'>Description</th>
            <th className='border border-slate-600 rounded-md'>Category</th>
            <th className='border border-slate-600 rounded-md'>Amount</th>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (<tr key={transaction._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{new Date(transaction.createdAt).toLocaleDateString('en-UK', { day: '2-digit', month: 'short' })}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{transaction.description}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{transaction.category}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{transaction.amount}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                <Link to={`/transactions/details/${transaction._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/transactions/edit/${transaction._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/transactions/delete/${transaction._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </td>
            </tr>))}
          </tbody>
        </table>)}
      </div>
    );
  };

  export default Home;