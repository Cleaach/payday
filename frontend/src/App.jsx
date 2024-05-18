import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import ShowTransaction from './pages/ShowTransaction';
import CreateTransaction from './pages/CreateTransaction';
import EditTransaction from './pages/EditTransaction';
import DeleteTransaction from './pages/DeleteTransaction';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/transactions/create' element={<CreateTransaction />} />
      <Route path='/transactions/details/:id' element={<ShowTransaction />} />
      <Route path='/transactions/edit/:id' element={<EditTransaction />} />
      <Route path='/transactions/delete/:id' element={<DeleteTransaction />} />
    </Routes>
  )
}

export default App