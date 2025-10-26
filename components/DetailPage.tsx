import React, { useState, useContext } from 'react';
import type { Entity, RatingSubmission } from '../types';
import RatingForm from './RatingForm';
import { submitRating } from '../services/api';
import Alert from './Alert';
import { LanguageContext } from '../contexts/LanguageContext';

interface DetailPageProps {
  entity: Entity;
  onBack: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ entity, onBack }) => {
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const { t } = useContext(LanguageContext);

    const handleRatingSubmit = async (submission: RatingSubmission) => {
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


  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 2.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 relative">
        <button onClick={onBack} className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {t('detail.back')}
        </button>
        
        <div className="text-center pt-8">
            <h2 className="text-3xl font-bold text-gray-800">{entity.name}</h2>
            <p className="text-lg text-blue-600 font-medium mt-1">{entity.type}</p>
            <p className="text-md text-gray-500 mt-2">{entity.address}</p>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-4 my-6">
            <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-semibold">{t('detail.publicRating')}</span>
                <div className={`px-3 py-1 text-white font-bold text-lg rounded-full ${getRatingColor(entity.averageRating)}`}>
                    {entity.averageRating.toFixed(1)}
                </div>
            </div>
             {entity.googleRating && (
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-semibold">{t('detail.googleRating')}</span>
                    <div className={`px-3 py-1 bg-gray-600 text-white font-bold text-lg rounded-full`}>
                       {entity.googleRating.toFixed(1)}
                    </div>
                </div>
            )}
        </div>

        <div className="mt-8 border-t pt-6">
            {submissionStatus === 'success' ? (
                 <Alert type="success" message={t('detail.submitSuccess')} />
            ) : submissionStatus === 'error' ? (
                <Alert type="error" message={t('detail.submitError')} />
            ) : (
                <RatingForm entity={entity} onSubmit={handleRatingSubmit} />
            )}
        </div>
    </div>
  );
};

export default DetailPage;