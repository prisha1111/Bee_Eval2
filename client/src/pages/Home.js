import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Items from "../components/Items";
import { Chartss } from "../components/Charts";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from "react-top-loading-bar";
import { createExpense, getUserExpenses } from "../utils/renders";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState(null); // Using null for better compatibility with DatePicker
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(() => JSON.parse(Cookies.get("User"))); // Lazy initialization for efficiency
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  // Set document title
  useEffect(() => {
    document.title = "Home";
  }, []);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!Cookies.get("User")) {
      navigate("/login");
    } else {
      // Fetch user expenses
      getUserExpenses(userdata.id)
        .then((data) => setUserexp(data || [])) // Fallback to an empty array if data is null/undefined
        .catch((error) => {
          // console.error("Error fetching user expenses:", error);
          setUserexp([]); // Ensure userexp is always an array
        });
    }
  }, [userdata.id, navigate]);

  // Calculate total expense
  const getTotal = () =>
    userexp.reduce((sum, expense) => sum + expense.amount, 0);
  // Define styles for the chat container
const chatContainerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '300px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '400px',
  overflowY: 'auto',
  
};
  // Handle new expense creation
  const handleCreateExpense = () => {
    const expInfo = {
      usersid: userdata.id,
      category,
      date: selectDate,
      amount: parseFloat(amount), // Ensure the amount is a number
    };

    ref.current.staticStart(); // Start loading bar
    createExpense(expInfo)
      .then(() => {
        ref.current.complete(); // Complete loading bar
        // Refresh expenses after successful creation
        return getUserExpenses(userdata._id);
      })
      .then((data) => setUserexp(data || []))
      .catch((error) => {
        console.error("Error creating expense:", error);
        ref.current.complete(); // Ensure loading bar completes
      });
  };

  return (
    <div className="h-screen font-mont w-full bg-zinc-900">
      <LoadingBar color="orange" ref={ref} />
      <NavBar data={userexp} />
      <div className="Feed w-4/5 left-[calc(100%-90%)] relative h-[calc(100%-6rem)] flex">
        {/* Left Section: Chart */}
        <div className="leftbox w-1/2 h-full">
          <div className="p-6 h-full w-full">
            <Chartss exdata={userexp} />
          </div>
        </div>

        {/* Right Section: Create Transaction and Expense List */}
        <div className="rightbox flex flex-col gap-10 items-center w-1/2">
          {/* Create Transaction Form */}
          <div className="createnew bg-gray-800 w-auto rounded-3xl p-10 pb-6 pt-6 flex flex-col justify-center items-center gap-2 relative top-5">
            <div className="font-bold text-3xl text-white font-mont">
              Create Transaction
            </div>
            <div className="flex flex-row gap-4">
              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="h-12 w-auto text-base placeholder-black p-4 rounded-xl outline-none focus:focus-animation"
              />
              <select
                id="countries"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue=""
                className="bg-white w-auto outline-none border placeholder-black border-gray-300 text-gray-900 text-sm rounded-xl block p-2.5 focus:focus-animation"
              >
                <option value="">--Select--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fun">Fun</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-flow-col w-full">
              <div className="w-full">
                <DatePicker
                  selected={selectDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="p-3 placeholder-black w-full rounded-xl outline-none bg-jp-black px-4 placeholder-rp-yellow h-fit text-jp-white focus:focus-animation"
                  placeholderText="Date"
                  showYearDropdown
                />
              </div>

              <button
                onClick={handleCreateExpense}
                className="relative h-fit text-center w-full rounded-xl px-5 py-2 overflow-hidden group bg-gray-800 border-2 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-600 text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-600 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-10 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-bold text-2xl">+</span>
              </button>
            </div>
          </div>

          {/* Expense List */}
          <div className="w-5/6 p-7 relative rounded-xl h-auto border-white border-2 grid gap-7 overflow-y-scroll">
            <div className="text-3xl text-white font-bold font-mont">
              Total Expense: ₹ {getTotal()}
            </div>
            <div className="grid grid-cols-2 listrr gap-7">
              {userexp.length > 0 ? (
                userexp.map((item) => (
                  <Items key={item.id} data={item} />
                ))
              ) : (
                <div className="text-white text-center col-span-2">
                  No expenses found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
