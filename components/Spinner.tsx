import React from 'react';

interface SpinnerProps {
    isPageSpinner?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isPageSpinner = false }) => {
  if (isPageSpinner) {
    return (
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    );
  }
  
  return (
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
  );
};

export default Spinner;