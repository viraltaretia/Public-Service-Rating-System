import React, { useState, useContext } from 'react';
import Spinner from './Spinner.tsx';
import { LanguageContext } from '../contexts/LanguageContext.tsx';

const WHATSAPP_NUMBER = '919876543210'; // A placeholder number
const WHATSAPP_MESSAGE = "Please send me an OTP for Public Service Rater";

const LoginModal = ({ onClose, onVerified }) => {
  const [step, setStep] = useState(1); // 1 for WhatsApp prompt, 2 for OTP
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useContext(LanguageContext);

  const handleProceedToOtp = () => {
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '123456') { // Mock OTP
      setError(t('loginModal.error.invalidOtp'));
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onVerified();
    }, 1000);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" },
      React.createElement("div", { className: "bg-white rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full relative" },
        React.createElement("button", { onClick: onClose, className: "absolute top-2 right-2 text-gray-400 hover:text-gray-600" },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" })
            )
        ),
        React.createElement("h2", { className: "text-2xl font-bold text-center mb-2" }, t('loginModal.title')),
        React.createElement("p", { className: "text-center text-gray-500 mb-6" }, t('loginModal.subtitle')),
        
        step === 1 && (
          React.createElement("div", { className: "text-center" },
             React.createElement("p", { className: "text-gray-600 mb-4" }, t('loginModal.whatsappInstruction')),
            React.createElement("a",
              {
                href: whatsappLink,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 inline-flex justify-center items-center font-bold"
              },
              React.createElement("svg", { viewBox: "0 0 32 32", className: "h-6 w-6 mr-2", fill: "currentColor" },
                React.createElement("path", { d: "M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm7.53 20.35c-.24.7-.85 1.2-1.55 1.34-.6.13-1.4-.04-2.89-.53-1.8-.6-3.4-1.6-4.9-3.2-1.7-1.7-2.8-3.5-3.4-5.2-.5-1.7-.5-2.8.2-3.7.6-.8 1.3-1 1.7-1 .3 0 .6.0.8.0.3 0 .5.1.7.5.3.4.9 2.1 1 2.3.2.2.2.4.1.6l-.3.6c-.1.2-.2.3-.1.5.2.5.7 1.2 1.4 1.8.8.8 1.5 1.1 2 1.3.2.1.3.1.5-.1l.6-.5c.2-.1.3-.1.6-.1s1.8 1 2.2 1.2c.3.2.5.3.5.5a1 1 0 0 1-.1.8z" })
              ),
              t('loginModal.whatsappButton')
            ),
            React.createElement("button",
              {
                onClick: handleProceedToOtp,
                className: "mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              },
              t('loginModal.proceedButton')
            )
          )
        ),

        step === 2 && (
          React.createElement("form", { onSubmit: handleVerifyOtp },
            React.createElement("p", { className: "text-center text-sm text-gray-600 mb-4" }, t('loginModal.otpSentMessage')),
            React.createElement("div", { className: "mb-4" },
              React.createElement("label", { htmlFor: "otp", className: "block text-sm font-medium text-gray-700 mb-1" }, t('loginModal.otpLabel')),
              React.createElement("input",
                {
                  id: "otp",
                  type: "text",
                  value: otp,
                  onChange: (e) => setOtp(e.target.value.replace(/\D/g, '')),
                  maxLength: 6,
                  placeholder: t('loginModal.otpPlaceholder'),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                  required: true
                }
              )
            ),
            error && React.createElement("p", { className: "text-red-500 text-sm mb-4" }, error),
            React.createElement("button",
              {
                type: "submit",
                disabled: isLoading,
                className: "w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 flex justify-center items-center"
              },
              isLoading ? React.createElement(Spinner, null) : t('loginModal.verifyButton')
            )
          )
        )
      )
    )
  );
};

export default LoginModal;