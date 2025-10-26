import React, { useState, useContext } from 'react';
import type { Entity, RatingSubmission } from '../types';
import { RATING_PARAMETERS } from '../constants';
import ImageUploader from './ImageUploader';
import Spinner from './Spinner';
import LoginModal from './LoginModal';
import { LanguageContext } from '../contexts/LanguageContext';

interface RatingFormProps {
  entity: Entity;
  onSubmit: (submission: RatingSubmission) => Promise<boolean>;
}

const RatingForm: React.FC<RatingFormProps> = ({ entity, onSubmit }) => {
  const ratingParams = RATING_PARAMETERS[entity.type];
  const initialRatings = ratingParams.reduce((acc, param) => ({ ...acc, [param.key]: 3 }), {});

  const [ratings, setRatings] = useState<{ [key: string]: number }>(initialRatings);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState<RatingSubmission | null>(null);
  const { t } = useContext(LanguageContext);

  const handleRatingChange = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleInitiateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: RatingSubmission = {
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
  
  const getStarColor = (value: number) => {
      if(value >= 4) return "text-yellow-400";
      if(value >= 2) return "text-yellow-300";
      return "text-gray-300";
  }

  return (
    <>
      <form onSubmit={handleInitiateSubmission} className="space-y-6">
        <h3 className="text-2xl font-bold text-center">{t('form.submitTitle')}</h3>
        <p className="text-center text-gray-600 -mt-4">{t('form.submitSubtitle')}</p>
        <div className="space-y-4">
          {ratingParams.map(param => (
            <div key={param.key} className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-md font-semibold text-gray-700">{param.label}</label>
              <p className="text-sm text-gray-500 mb-2">{param.description}</p>
              <div className="flex items-center space-x-2">
                   <div className="flex text-3xl">
                      {[1, 2, 3, 4, 5].map((star) => (
                          <button
                              type="button"
                              key={star}
                              onClick={() => handleRatingChange(param.key, star)}
                              className={`transition-colors ${star <= ratings[param.key] ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                              &#9733;
                          </button>
                      ))}
                   </div>
                   <span className="font-bold text-lg w-10 text-center">{ratings[param.key]}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="comment" className="block text-md font-semibold text-gray-700 mb-1">{t('form.commentsLabel')}</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={t('form.commentsPlaceholder')}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">{t('form.photosLabel')}</label>
          <p className="text-sm text-gray-500 mb-2">{t('form.photosSubtitle')}</p>
          <ImageUploader photos={photos} setPhotos={setPhotos} />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md flex justify-center items-center disabled:bg-green-300"
        >
          {isLoading ? <Spinner /> : t('form.submitButton')}
        </button>
      </form>
      {isVerificationModalOpen && (
        <LoginModal 
            onClose={() => setVerificationModalOpen(false)}
            onVerified={handleVerificationSuccess}
        />
      )}
    </>
  );
};

export default RatingForm;