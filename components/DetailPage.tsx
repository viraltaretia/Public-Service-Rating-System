import React, { useState, useContext } from 'react';
import RatingForm from './RatingForm.tsx';
import { submitRating } from '../services/api.ts';
import Alert from './Alert.tsx';
import { LanguageContext } from '../contexts/LanguageContext.tsx';

const DetailPage = ({ entity, onBack }) => {
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    const { t } = useContext(LanguageContext);

    const handleRatingSubmit = async (submission) => {
        try {
            await submitRating(submission);
            setSubmissionStatus('success');
            return true;
        } catch (error) {
            console.error("Failed to submit rating", error);
            setSubmissionStatus('error');
            return false;
        }
    };


  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 2.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    React.createElement("div", { className: "bg-white rounded-lg shadow-lg p-6 md:p-8 relative" },
        React.createElement("button", { onClick: onBack, className: "absolute top-4 left-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center" },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", viewBox: "0 0 20 20", fill: "currentColor" },
                React.createElement("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" })
            ),
            t('detail.back')
        ),
        
        React.createElement("div", { className: "text-center pt-8" },
            React.createElement("h2", { className: "text-3xl font-bold text-gray-800" }, entity.name),
            React.createElement("p", { className: "text-lg text-blue-600 font-medium mt-1" }, entity.type),
            React.createElement("p", { className: "text-md text-gray-500 mt-2" }, entity.address)
        ),

        React.createElement("div", { className: "flex justify-center items-center flex-wrap gap-x-6 gap-y-4 my-6" },
            React.createElement("div", { className: "flex items-center space-x-2" },
                React.createElement("span", { className: "text-gray-600 font-semibold" }, t('detail.publicRating')),
                React.createElement("div", { className: `px-3 py-1 text-white font-bold text-lg rounded-full ${getRatingColor(entity.averageRating)}` },
                    entity.averageRating.toFixed(1)
                )
            ),
             entity.googleRating && (
                React.createElement("div", { className: "flex items-center space-x-2" },
                    React.createElement("span", { className: "text-gray-600 font-semibold" }, t('detail.googleRating')),
                    React.createElement("div", { className: "px-3 py-1 bg-gray-600 text-white font-bold text-lg rounded-full" },
                       entity.googleRating.toFixed(1)
                    )
                )
            )
        ),

        React.createElement("div", { className: "mt-8 border-t pt-6" },
            submissionStatus === 'success' ? (
                 React.createElement(Alert, { type: "success", message: t('detail.submitSuccess') })
            ) : submissionStatus === 'error' ? (
                React.createElement(Alert, { type: "error", message: t('detail.submitError') })
            ) : (
                React.createElement(RatingForm, { entity: entity, onSubmit: handleRatingSubmit })
            )
        )
    )
  );
};

export default DetailPage;