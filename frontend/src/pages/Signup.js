import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function Signup() {
  document.title = 'SignUp';
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      await axiosClient.post('/auth/signup', {
        username,
        email,
        password
      });
      toast.success("Registered Successfully!!");
      ref.current.complete();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <LoadingBar color="orange" ref={ref} />

      <div className="text-center mb-10">
        <h1 className="text-white font-bold text-6xl">
          <span className="text-yellow-500">SmartSpend</span> <br />
          <span className="text-white text-3xl font-light">Track Smarter. Save Better.</span>
        </h1>
      </div>

      <form
        onSubmit={submitForm}
        className="flex flex-col items-center gap-6 bg-white/10 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/20 w-96"
      >
        <h2 className="text-white text-3xl font-bold">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-12 pl-6 rounded-xl outline-none focus:outline-white bg-white/90 text-black"
        />
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
        <p className="text-white">
          Already Registered?{' '}
          <a href="/login" className="underline text-yellow-400 hover:text-yellow-300">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
