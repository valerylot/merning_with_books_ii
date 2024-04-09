import React from 'react'
import {useEffect, useState} from 'react' ;
import axios from 'axios' ;
import { useParams, Link, useNavigate } from 'react-router-dom' ;

const ShowOne = () => {

    const navigate = useNavigate();
	const { id } = useParams();
	console.log(id);
	//check the console to make sure you're getting what you want in your console
	const [oneBook, setOneBook] = useState(null);

	useEffect(() => {
		//make the api call to our server and don't forge AXIOS PUTS EVERYTHING IN .DATA
		axios.get("http://localhost:8000/api/books/" + id)
			.then((res) => {
				console.log(res.data)
				setOneBook(res.data)
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

    const deleteMe = (deleteId) => {
        console.log("delete", deleteId);
        axios.delete("http://localhost:8000/api/books/" + deleteId)
        .then((res) => {
            console.log(res.data)
            // const filteredBooks = books.filter((oneBook) => {
            //     return oneBook._id !== deleteId;
            // });
            //console.log(filteredAnimals);
            // setBooks(filteredBooks)
            navigate("/books");
        })
        .catch((err) => {
            console.log(err);
        })
    };

	return (
		<div>
			{/* {JSON.stringify(oneBook)} */}
			{
				oneBook !== null ? (
					<div>
						<h3>{oneBook.title}</h3>
						{/* <Link to="/">Home</Link><br/> */}
						<p>Title: {oneBook.title}</p>
						<p>Author: {oneBook.author}</p>
						<p>Pages: {oneBook.pages}</p>
						{/* <p>Available: {oneBook.isAvailable ? "YES" : "NO"}</p>  */}
						{/* <button onClick={()=> deleteMe(oneBook._id)}>BORROW</button> */}
						{oneBook.isAvailable ? <div> <p style={{ color: "green"}}>Available to borrow</p> <button onClick={()=> deleteMe(oneBook._id)}>BORROW</button></div> : <p style={{ color: "red" }}>Not available to borrow</p> }
					</div>
				) : <div>loading...</div>
			}
		</div>
)
}

export default ShowOne