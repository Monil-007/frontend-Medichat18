import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/assets/signup.jpg';

const initialState = {
    fullName: '',
    username: '',
    phoneNumber: '',
    avatarURL: '',
    password: '',
    confirmPassword: ''
}


const cookies = new Cookies();

const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        //console.log(form);
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://medichat18-backend.onrender.com';
        //const URL = 'https://medichat18.herokuapp.com/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/auth/${isSignup ? 'signup' : 'signin'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor='fullname'>Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='username'>User name</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phoneNumber'>Phone number</label>
                                <input
                                    name="phoneNumber"
                                    type="number"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (<div className="auth__form-container_fields-content_input">
                            <label htmlFor="confrimPassword">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign up" : "Sign in"}</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup ? "ALready have an account? " : "Dont have an account? "}
                            <span onClick={switchMode}>{isSignup ? 'Sign In' : 'Sign Up'}</span>
                        </p>
                    </div>
                </div>
            </div >
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div >

    )
}

export default Auth;
