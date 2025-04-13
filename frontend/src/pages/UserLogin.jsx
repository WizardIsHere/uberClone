import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        setUserData({
            email: email,
            password: password,
        })
        console.log(userData)
        setEmail('');
        setPassword('');
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
                    <h3 className="text-lg font-medium mb-2">What's your email?</h3>
                    <input
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
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
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
                        required
                        type="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        placeholder="password"
                    />

                    <button
                        className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
                        type="submit"
                    >
                        Login
                    </button>
                    <p className='text-center'>New Here?<Link className='mb-3 text-blue-600' to="/signup">Create new account</Link></p>
                </form>
            </div>

            <div>
                <Link
                    to="/captain-login"
                    className="flex items-center justify-center  bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg inline-block text-center"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
