import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Create = (props) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [pages, setPages] = useState(0)
    const [isAvailable, setIsAvailable] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log((title, author, pages, isAvailable));
        const tempObject = {
            title,
            author,
            pages,
            isAvailable
        }
        axios.post("http://localhost:8000/api/books", tempObject)
        .then((res) => {
            console.log("CHECKMARK SUCCESS", res.data);
            //the below line is how to redirect
            navigate("/books");
        })
        .catch((err) => {
            console.log("X ERROR", err.response.data.errors)
            setErrors(err.response.data.errors);
        });
    }


        //const doStuff = () => console.log("hi");

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    Title:
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
                </div>
                <div>
                    Author:
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} />
                    {errors.author && <p style={{ color: "red" }}>{errors.author.message}</p>}
                </div>
                <div>
                    Pages:
                    <input value={pages} onChange={(e) => setPages(e.target.value)} />
                    {errors.pages && <p style={{ color: "red" }}>{errors.pages.message}</p>}

                </div>
                <div>
                    Is it Available?:
                    <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
                </div>
                <input type="submit" value="Add Book!" />
            </form>
        </>
    )
    }
export default Create
