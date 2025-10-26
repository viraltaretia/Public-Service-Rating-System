
import React from 'react';

const Alert = ({ type, message }) => {
  const baseClasses = "p-4 rounded-lg text-center font-semibold";
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    React.createElement("div", { className: `${baseClasses} ${typeClasses[type]}`, role: "alert" },
      message
    )
  );
};

export default Alert;