//worked with Simon and Mixie
import './App.css'
import { Route, Routes, Link, Navigate } from 'react-router-dom' ;
import Home from './views/Home' ;
import ShowOne from'./views/ShowOne' ;
import Create from './views/Create' ;
import Edit from './views/Edit' ;

function App() {

  return (
    <>
      <h1>Book Catalog</h1>
      <p>
        <Link to="/books/">Catalog</Link>
      </p>
      <p>
        <Link to="/books/create">Add Book</Link>
      </p>

      <hr />
  
      {/* set up routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
      {/* HOME */}
        <Route path="/books" element={<Home />} />
  
      {/* CREATE PAGE */}
        <Route path="/books/create" element={<Create />} />
  
      {/* SHOW ONE PAGE */}
        <Route path="/books/:id" element={<ShowOne />} />
  
      {/* EDIT PAGE */}
        <Route path="/books/:id/update" element={<Edit />} />
      </Routes>
    </>
  )
}

export default App




