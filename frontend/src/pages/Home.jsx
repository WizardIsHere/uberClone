import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className='h-screen bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1602773040364-522556233e30?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] pt-8 flex justify-between flex-col w-full '>
            <img className="w-16 ml-8" src="" />
            <div className='bg-white pb-7 px-4 py-4'>
                <h2 className='text-3xl font-bold'>Get started with Uber</h2>
                <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 mt-5 rounded">Continue</Link>
            </div>
        </div>
    );
};

export default Home;