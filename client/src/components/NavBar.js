import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import Cookies from 'js-cookie';
import {  BsChat } from 'react-icons/bs'; // Import chat icon
import { FaUserCircle, FaChevronDown } from 'react-icons/fa'; // Import profile and dropdown icons
import Chat from './Chat';

function NavBar(props) {
  const [isPressed, setIsPressed] = useState(false);
  // const [userEmail, setUserEmail] = useState('');
  const ref = useRef(null);
  const [isChatVisible, setIsChatVisible] = useState(false); // State for chat visibility
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for profile dropdown
  // const userData = props.data;

  const navigate = useNavigate();
  const logoutHandle = async () => {
    try {
      ref.current.staticStart();

      Cookies.remove('User');
      Cookies.remove('token');
      toast.success('Logout Successfully!!');
      ref.current.complete();

      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <LoadingBar color="orange" ref={ref}></LoadingBar>

      <div className="flex flex-row justify-between w-screen h-24 bg-neutral-950">
        <div className="left text-red-500 font-bold font-sans tracking-wider text-6xl top-5 left-10 relative">
          <p className="text-white">
            <span className="text-yellow-500">Expense</span> Tracker
          </p>
        </div>

        <div className="flex flex-row justify-end w-1/3 items-center gap-6 pr-10">
          <div>
            <a
              onClick={logoutHandle}
              href="#_"
              className="text-xl mt-5 mb-5 relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                LogOut
              </span>
              <span className="relative invisible">LogOut</span>
            </a>
          </div>

          {/* Chat Icon with Label */}
          <div className="flex flex-col items-center text-white">
            <button
              onClick={() => setIsChatVisible(!isChatVisible)}
              className="p-2 rounded-lg"
            >
              <BsChat size={24} />
            </button>
            <span className="text-sm mt-1">Chat</span> {/* Label for Chat */}
          </div>

          {/* Profile Icon with Label */}
          <div className="relative flex flex-col items-center text-white">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="p-2 rounded-lg flex items-center gap-2"
            >
              <FaUserCircle size={28} />
              <span className="text-sm mt-1">Profile</span> {/* Label for Profile */}
              <span
                className={`transition-transform duration-300 ${
                  isProfileMenuOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <FaChevronDown size={16} />
              </span>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li
                    onClick={() => {
                      console.log('Navigate to Settings');
                      setIsProfileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-white hover:bg-gray-700 hover:text-yellow-300 cursor-pointer"
                  >
                    Settings
                  </li>
                  <li
                    onClick={() => {
                      console.log('Navigate to Record');
                      setIsProfileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-white hover:bg-gray-700 hover:text-yellow-300 cursor-pointer"
                  >
                    Record
                  </li>
                  <li
                    onClick={() => {
                      console.log('Change Language');
                      setIsProfileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-white hover:bg-gray-700 hover:text-yellow-300 cursor-pointer"
                  >
                    Language
                  </li>
                  <li
                    onClick={() => {
                      console.log('Navigate to Change Password');
                      setIsProfileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-white hover:bg-gray-700 hover:text-yellow-300 cursor-pointer"
                  >
                    Change Password
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {isChatVisible && <Chat onClose={() => setIsChatVisible(false)} />} {/* Render Chat component conditionally */}
    </div>
  );
}

export default NavBar;
