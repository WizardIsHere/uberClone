import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        setUserData({
            email: email,
            password: password,
            fullName:{
                firstName:firstName,
                lastName:lastName,
            },
        })
        console.log("User Data: ", userData)
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }

    return (
        <div className="p-7 flex flex-col h-screen justify-between items-center bg-white rounded-lg">
            <div>
                <img
                    className="w-16 mb-10"
                    src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
                    alt="Uber Logo"
                />
                <form onSubmit={(e)=>{
                    submitHandler(e)
                }}>
                    <h3 className="text-lg font-medium mb-2">What's your name?</h3>
                    <div className="flex gap-4 mb-5" >
                        <input
                            className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base"
                            required
                            value={firstName}
                            onChange={(e)=>{
                                setFirstName(e.target.value)
                            }}
                            placeholder="First Name"
                        />
                        <input
                            className="bg-[#eeeeee] rounded w-1/2 px-4 py-2  border text-lg placeholder:text-base"
                            required
                            value={lastName}
                            onChange={(e)=>{
                                setLastName(e.target.value)
                            }}
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>

                    <h3 className="text-lg font-medium mb-2">What's your email?</h3>
                    <input
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full  border text-lg placeholder:text-base"
                        required
                        type="email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        placeholder="email@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
                        required
                        type="password"
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        placeholder="Password"
                    />

                    <button
                        className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <p className='text-center'>Already have an account? <Link className='mb-3 text-blue-600' to="/captain-login">Login here</Link></p>
                </form>
            </div>

            <div>
                <p>
                    <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
