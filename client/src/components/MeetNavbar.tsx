import React from 'react';
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  title: string;
  btnText: string;
}

const MeetNavbar: React.FC<NavbarProps> = ({ title, btnText }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm px-4 py-3 rounded-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        <div className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white text-center md:text-left">
          {title}
        </div>

        <button
          onClick={() => navigate("/meetingAdd")}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 whitespace-nowrap border-none"
        >
          {btnText}
        </button>
      </div>
    </nav>
  );
};

export default MeetNavbar;
