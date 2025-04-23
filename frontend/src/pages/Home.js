import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    document.title = 'Home';
    
    if (!localStorage.getItem('User')) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchExpenses = async () => {
      try {
        const data = await getUserExpenses(userdata._id);
        setUserexp(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, [userdata._id, navigate]);

  const getTotal = () => {
    return userexp.reduce((sum, item) => sum + (item?.amount || 0), 0);
  };

  const handleCreateExpense = async () => {
    if (!amount || !category || !selectDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      ref.current.staticStart();
      await createExpense({
        usersid: userdata._id,
        category,
        date: selectDate,
        amount: Number(amount)
      });
      
      // Refresh expenses
      const updatedExpenses = await getUserExpenses(userdata._id);
      setUserexp(updatedExpenses);
      
      // Reset form
      setAmount(0);
      setCategory("");
      setSelectedDate(null);
    } catch (error) {
      console.error("Failed to create expense:", error);
    } finally {
      ref.current.complete();
    }
  };

  return (
    <div className="min-h-screen font-mont bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
      <LoadingBar color="orange" ref={ref} />
      
      <NavBar data={userexp} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-yellow-500">Smart</span>
            <span className="text-white">Spend</span>
          </h1>
          <p className="text-xl text-white/80">Track and manage your expenses</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Chart */}
          <div className="lg:w-1/2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Expense Analytics</h2>
            <Chartss exdata={userexp} />
          </div>

          {/* Right Column - Form and List */}
          <div className="lg:w-1/2 space-y-8">
            {/* Create Transaction Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Create Transaction</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="flex-1 h-12 px-4 rounded-xl bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 h-12 px-4 rounded-xl bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">-- Select Category --</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Fun">Fun</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DatePicker
                    selected={selectDate}
                    onChange={setSelectedDate}
                    placeholderText="Select Date"
                    className="w-full h-12 px-4 rounded-xl bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    showYearDropdown
                  />
                  
                  <button
                    onClick={handleCreateExpense}
                    className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <span className="text-2xl">+</span> Add Expense
                  </button>
                </div>
              </div>
            </div>

            {/* Expenses List */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Expenses</h2>
                <div className="text-xl font-bold text-yellow-500">
                  Total: ₹ {getTotal()}
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {userexp.length > 0 ? (
                  userexp.map((expense) => (
                    <Items key={expense._id} data={expense} />
                  ))
                ) : (
                  <p className="text-center py-8 text-white/70">No expenses recorded yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

