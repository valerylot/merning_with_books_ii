import React from 'react'
import { useState, useEffect } from 'react' ;
import { Link, useParams, useNavigate } from 'react-router-dom' ;
import axios from 'axios' ;


    const Home = (props) => {
        const navigate = useNavigate();
        const { id } = useParams();
        const [books, setBooks] = useState([]);
    
        useEffect(() => {
            axios.get("http://localhost:8000/api/books")
                .then((res) => {
                    console.log(res.data)
                    setBooks(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }, []);

        // const goToShowOne =() => {
        //     console.log("show one");
        //     navigate(`/books/${books._id}`);
        // }
    
    
    
        return (
            <>
                {/* <div>{JSON.stringify(animals)}</div> */}
{/* we comment out the above line ONCE we know the following {animal.name} etc is working in JS land */}
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Pages</th>
                            <th>Available</th>
                            <th>Book Page</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book) =>{
                                return <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.pages}</td>
                                    <td>{book.isAvailable ? "YES" : "NO"} | <Link to={"/books/" + book._id + "/update"}>Edit</Link></td>
                                    <td><Link to={"/books/" + book._id}><button>Book Details</button></Link></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </>
)}
export default Home