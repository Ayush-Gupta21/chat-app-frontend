import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { currentUserRoute, loginRoute } from '../utils/APIRoutes'

function Login(props) {

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark" 
    }

    useEffect(() => {
        (
            async () => {
                const res = await axios.get(currentUserRoute, {withCredentials: true})
                if(res.status === 200) {
                    navigate("/")
                }
            }
        )()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()) {
            const {username, password} = values
            try {
                const {data} = await axios.post(loginRoute, {
                    username,
                    password
                }, {withCredentials: true})
                if(data.status === false) {
                    toast.error(data.message, toastOptions) 
                }
                if(data.status === true) {
                    toast.success(data.message, toastOptions)
                    navigate("/")
                }
            } catch (err) {
                navigate("/login")
            }
        }
    }

    const handleValidation = () => {
        const {username, password} = values
        if (username === "" || password === "") {
            toast.error(
                "Username and Password are required!", 
                toastOptions
            )
            return false
        }
        return true
    }

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Chat App</h1>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        name='username' 
                        min="3"
                        onChange={e=>handleChange(e)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name='password' 
                        onChange={e=>handleChange(e)}
                    />
                    <button type='submit'>Login</button>
                    <span>
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </span>
                </form>
            </FormContainer>
        </>
    );

}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: rgb(38, 38, 38);
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 4rem;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: rgb(114, 212, 183);
        border-radius: 2rem;
        padding: 3rem 7rem;
        input {
            background-color: rgb(38, 38, 38);
            padding: 1rem;
            border: 0.1rem solid rgb(38, 38, 38);
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid black;
                outline: none;
            }
        }
        button {
            background-color: black;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            &:hover {
                color: black;
                background-color: rgb(237, 112, 107);
                transition: 0.5s ease-in-out;
            }
        }
        span {
            a {
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`

export default Login