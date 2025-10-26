import React from 'react';

const Spinner = ({ isPageSpinner = false }) => {
  if (isPageSpinner) {
    return (
        React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" })
    );
  }
  
  return (
    React.createElement("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-white" })
  );
};

export default Spinner;