import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [pages, setPages] = useState(0)
    const [isAvailable, setIsAvailable] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        //make the api call to our server and don't forge AXIOS PUTS EVERYTHING IN .DATA
        axios.get("http://localhost:8000/api/books/" + id)
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setPages(res.data.pages);
                setIsAvailable(res.data.isAvailable)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("edit submit")

        const tempObject = {
            title,
            author,
            pages,
            isAvailable
        };

        axios.put(`http://localhost:8000/api/books/${id}`, tempObject)
		.then((res) => {
            console.log("CHECKMARK SUCCESS", res.data);
            //the below line is how to redirect
            // navigate("/books" + res.data._id);
            navigate("/books");
        })
    .catch((err) => {
        console.log("X ERROR", err.response.data.errors)
        setErrors(err.response.data.errors);
    });
	}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Title:
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
    {/* the above line is a short circuit, meaning if that statement is truthy, immediately render that p tag message */}
                </div>
                <div>
                    Author:
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} />
                    {errors.author && <p style={{ color: "red" }}>{errors.author.message}</p>}
                </div>
                <div>
                    Pages:
                    <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} />
                    {errors.pages && <p style={{ color: "red" }}>{errors.pages.message}</p>}
                </div>
                <div>
                    Is it Available?
                    <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
                </div>
                <input type="submit" value="Update!" />
            </form>
        </div>
    );
    }

export default Edit