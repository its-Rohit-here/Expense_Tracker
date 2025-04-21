import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';

function Login() {
  document.title = 'Login';
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/home", { replace: true }); 
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axiosClient.post('/auth/login', { email, password });

      if (response.data.statusCode !== 201) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Successfully Logged In!!");
      localStorage.setItem('User', JSON.stringify(response.data.message));
      ref.current.complete();
      // navigate('/');
       navigate('/home', { replace: true }); 
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <LoadingBar color="orange" ref={ref} />

      <div className="text-center mb-10">
        <h1 className="text-white font-bold text-6xl">
          <span className="text-yellow-500">SmartSpend</span><br />
          <span className="text-white text-3xl font-light">Log In and Take Control</span>
        </h1>
      </div>

      <form
        onSubmit={submitForm}
        className="flex flex-col items-center gap-6 bg-white/10 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/20 w-96"
      >
        <h2 className="text-white text-3xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 pl-6 rounded-xl outline-none focus:outline-white bg-white/90 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 pl-6 rounded-xl outline-none focus:outline-white bg-white/90 text-black"
        />
        <button
          type="submit"
          className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition"
        >
          Submit
        </button>
        <p className="text-white text-sm">
          New user?{' '}
          <a href="/signup" className="underline text-yellow-400 hover:text-yellow-300">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
