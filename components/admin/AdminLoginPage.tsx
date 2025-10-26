import React, { useState } from 'react';
import { adminLogin } from '../../services/api.ts';
import Spinner from '../Spinner.tsx';

const AdminLoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { success } = await adminLogin(username, password);
      if (success) {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    React.createElement("div", { className: "min-h-screen flex items-center justify-center bg-gray-100" },
      React.createElement("div", { className: "max-w-md w-full bg-white rounded-lg shadow-lg p-8 m-4" },
        React.createElement("div", { className: "text-center mb-8" },
            React.createElement("h1", { className: "text-3xl font-bold text-gray-800" }, "Admin Portal"),
            React.createElement("p", { className: "text-gray-500" }, "Please sign in to continue")
        ),
        React.createElement("form", { onSubmit: handleSubmit },
          React.createElement("div", { className: "mb-4" },
            React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "username" },
              "Username"
            ),
            React.createElement("input",
              {
                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                id: "username",
                type: "text",
                placeholder: "Username",
                value: username,
                onChange: (e) => setUsername(e.target.value)
              }
            )
          ),
          React.createElement("div", { className: "mb-6" },
            React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "password" },
              "Password"
            ),
            React.createElement("input",
              {
                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
                id: "password",
                type: "password",
                placeholder: "******************",
                value: password,
                onChange: (e) => setPassword(e.target.value)
              }
            )
          ),
          error && React.createElement("p", { className: "text-red-500 text-center text-sm mb-4" }, error),
          React.createElement("div", { className: "flex items-center justify-center" },
            React.createElement("button",
              {
                className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-blue-300 flex justify-center items-center",
                type: "submit",
                disabled: isLoading
              },
              isLoading ? React.createElement(Spinner, null) : 'Sign In'
            )
          )
        )
      )
    )
  );
};

export default AdminLoginPage;