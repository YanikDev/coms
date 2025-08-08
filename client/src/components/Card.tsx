import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div
      className="flex flex-col items-center text-center p-6 bg-white  rounded-2xl shadow-md
                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                 hover:bg-gray-50  cursor-pointer w-full h-full min-h-[250px]"
    >
      <div className="text-5xl text-indigo-500 mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800  mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 ">
        {description}
      </p>
    </div>
  );
};

export default Card;
