// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import {BsSendFill} from 'react-icons/bs'
// import { sendEmail } from '../utils/renders';
// import LoadingBar from 'react-top-loading-bar';
// import { useRef } from 'react';

// function NavBar(props) {

//   const [isPressed,setIsPressed] = useState(false);
//   // eslint-disable-next-line
//   const [userEmail , setUserEmail] = useState('');
//   const ref = useRef(null);

//   // eslint-disable-next-line
//   const userData = props.data;


//   const navigate = useNavigate();
//   const logoutHandle = async ()=>{
//     try {
//       ref.current.staticStart();

//       localStorage.removeItem('User');
//       toast.success("Logout Successfully!!")
//       ref.current.complete();

//       navigate('/login');
//     } catch (error) {
//       console.log(error.message)
//     }
//   }


//   return (
//     <div>
//             <LoadingBar color='orange' ref={ref}  ></LoadingBar>

//          <div className=' flex flex-row  justify-between w-screen h-24 bg-neutral-950' >
//           <div className='left text-red-500 font-bold font-Handjet tracking-wider text-6xl top-5 left-10 relative '>
//             <p className='text-white'><span className='text-yellow-500' >Expense</span> Tracker</p>  
//           </div>
        
//         <div>

//         </div>
//         <div className='flex flex-row justify-end w-1/3'>
            
//         <div className='pl-4 mr-16 pr-4 w-auto  rounded-xl mt-6 mb-6 '>

//               <div className="relative z-50 inline-flex  group" onClick={()=>setIsPressed(!isPressed)} >
//               <div
//                   className="absolute transitiona-all duration-700 opacity-70 inset-16 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:inset-1 group-hover:duration-200 animate-tilt">
//               </div>
//               <div  title=""
//                   className="relative inline-flex items-center justify-center px-8 py-4 text-sm tracking-wider font-bold text-white transition-all duration-200 bg-neutral-950 font-pj rounded-xl focus:outline-none focus:ring-1  focus:ring-offset-1 focus:ring-gray-900"
//                   role="button">Send Email
//               </div>
//             </div>
//             {
//               <>
//               <div className={`flex flex-col  overflow-hidden ${isPressed ? 'opacity-100 mt-8 w-1/4' : 'opacity-0 ml-20 w-0 -mt-10'} justify-between transition-all duration-500  h-50 bg-blue-500  gap-3 absolute  p-3 z-40 -ml-48 rounded-xl`}  >
//               <div className=' text-white absolute -inset-x-2 -inset-y-2 bg-black font-bold rounded-full w-6 pt-0.5 text-center left-0.5 top-1 cursor-pointer h-fit border-2' onClick={()=>setIsPressed(!isPressed)} ><p className='-mt-1' >x</p></div>
//                   <div className='flex flex-row gap-3 justify-between ' >
//                   <input placeholder='Your Email' onChange={(e)=>{
//                     setUserEmail(e.target.value);
//                   }} type='email' className=' outline-none p-2 pl-4 w-full rounded-2xl'></input>
//                   <button onClick={()=>{
//                       sendEmail(userEmail , userData)
//                   }}  className=' rounded-xl w-fit  bg-neutral-800 p-3 text-2xl text-white'  ><BsSendFill></BsSendFill></button>
//               </div>
//                   <p className='text-xs text-center text-white whitespace-nowrap '>**Get your expenses in <b>one month</b>, On Your Email</p>
//               </div>
//               </>
//             }
//         </div>

//             <div>
//                   <a onClick={logoutHandle} href="#_" className=" text-xl mt-5 mb-5 right-10 relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
//                   <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
//                   </span>
//                   <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">LogOut</span>
//                   <span className="relative invisible">LogOut</span>
//                   </a>
//             </div>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default NavBar


import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BsSendFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { sendEmail } from '../utils/renders';
import LoadingBar from 'react-top-loading-bar';

function NavBar({ data }) {
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const ref = useRef(null);
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      ref.current.staticStart();
      localStorage.removeItem('User');
      toast.success("Logged out successfully!");
      ref.current.complete();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  const financialQuotes = [
    "A penny saved is a penny earned",
    "Beware of little expenses - a small leak will sink a great ship",
    "Financial freedom is available to those who learn about it and work for it",
    "It's not how much money you make, but how much you keep"
  ];
  const randomQuote = financialQuotes[Math.floor(Math.random() * financialQuotes.length)];

  return (
    <div>
      <LoadingBar color='orange' ref={ref} />
      
      <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and Quote */}
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <h1 className="text-4xl font-bold text-white">
                <span className="text-yellow-400">Expense</span> Tracker
              </h1>
              <p className="text-gray-300 italic text-sm md:text-base mt-1">
                "{randomQuote}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Email Button */}
              <div className="relative">
                <button
                  onClick={() => setIsEmailOpen(!isEmailOpen)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <BsSendFill className="text-yellow-400" />
                  <span>Send Report</span>
                </button>

                {isEmailOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl z-50 p-4 border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white font-medium">Email Report</h3>
                      <button 
                        onClick={() => setIsEmailOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <button
                        onClick={() => sendEmail(userEmail, data)}
                        className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded transition"
                      >
                        <BsSendFill />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">
                      Get your monthly expense report delivered
                    </p>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={logoutHandle}
                className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg border border-red-500/30 transition-all duration-300"
              >
                <FiLogOut />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBar;