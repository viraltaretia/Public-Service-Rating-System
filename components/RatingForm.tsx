
import React, { useState, useContext } from 'react';
import { RATING_PARAMETERS } from '../constants.ts';
import ImageUploader from './ImageUploader.tsx';
import Spinner from './Spinner.tsx';
import LoginModal from './LoginModal.tsx';
import { LanguageContext } from '../contexts/LanguageContext.tsx';

const RatingForm = ({ entity, onSubmit }) => {
  const ratingParams = RATING_PARAMETERS[entity.type];
  const initialRatings = ratingParams.reduce((acc, param) => ({ ...acc, [param.key]: 3 }), {});

  const [ratings, setRatings] = useState(initialRatings);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState(null);
  const { t } = useContext(LanguageContext);

  const handleRatingChange = (key, value) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleInitiateSubmission = (e) => {
    e.preventDefault();
    const submission = {
      entityId: entity.id,
      ratings,
      comment,
      photos,
    };
    setPendingSubmission(submission);
    setVerificationModalOpen(true);
  };

  const handleVerificationSuccess = async () => {
    if (!pendingSubmission) return;

    setVerificationModalOpen(false);
    setIsLoading(true);
    
    const success = await onSubmit(pendingSubmission);
    
    if (!success) {
      setIsLoading(false);
    }
    setPendingSubmission(null);
  };
  
  const getStarColor = (value) => {
      if(value >= 4) return "text-yellow-400";
      if(value >= 2) return "text-yellow-300";
      return "text-gray-300";
  }

  return (
    React.createElement(React.Fragment, null,
      React.createElement("form", { onSubmit: handleInitiateSubmission, className: "space-y-6" },
        React.createElement("h3", { className: "text-2xl font-bold text-center" }, t('form.submitTitle')),
        React.createElement("p", { className: "text-center text-gray-600 -mt-4" }, t('form.submitSubtitle')),
        React.createElement("div", { className: "space-y-4" },
          ratingParams.map(param => (
            React.createElement("div", { key: param.key, className: "bg-gray-50 p-4 rounded-lg" },
              React.createElement("label", { className: "block text-md font-semibold text-gray-700" }, param.label),
              React.createElement("p", { className: "text-sm text-gray-500 mb-2" }, param.description),
              React.createElement("div", { className: "flex items-center space-x-2" },
                   React.createElement("div", { className: "flex text-3xl" },
                      [1, 2, 3, 4, 5].map((star) => (
                          React.createElement("button",
                              {
                                  type: "button",
                                  key: star,
                                  onClick: () => handleRatingChange(param.key, star),
                                  className: `transition-colors ${star <= ratings[param.key] ? 'text-yellow-400' : 'text-gray-300'}`
                              },
                              '★'
                          )
                      ))
                   ),
                   React.createElement("span", { className: "font-bold text-lg w-10 text-center" }, ratings[param.key])
              )
            )
          ))
        ),
        React.createElement("div", null,
          React.createElement("label", { htmlFor: "comment", className: "block text-md font-semibold text-gray-700 mb-1" }, t('form.commentsLabel')),
          React.createElement("textarea",
            {
              id: "comment",
              rows: 4,
              value: comment,
              // Fix: Add explicit event type to help TS infer element type
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value),
              placeholder: t('form.commentsPlaceholder'),
              className: "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ),
        React.createElement("div", null,
          React.createElement("label", { className: "block text-md font-semibold text-gray-700 mb-1" }, t('form.photosLabel')),
          React.createElement("p", { className: "text-sm text-gray-500 mb-2" }, t('form.photosSubtitle')),
          React.createElement(ImageUploader, { photos: photos, setPhotos: setPhotos })
        ),
        React.createElement("button",
          {
            type: "submit",
            disabled: isLoading,
            className: "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md flex justify-center items-center disabled:bg-green-300"
          },
          isLoading ? React.createElement(Spinner, null) : t('form.submitButton')
        )
      ),
      isVerificationModalOpen && (
        React.createElement(LoginModal, 
            {
                onClose: () => setVerificationModalOpen(false),
                onVerified: handleVerificationSuccess
            }
        )
      )
    )
  );
};

export default RatingForm;