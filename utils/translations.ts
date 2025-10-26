const translations: { [key: string]: any } = {
  en: {
    header: {
      title: 'Public Service Rater',
      admin: 'Admin',
    },
    home: {
      findPlaces: 'Find Nearby Public Places',
      searchPlaceholder: 'Search by name or address...',
      allTypes: 'ALL',
      loading: 'Getting Your Location...',
      loadingMessage: "We're trying to determine your location to show you nearby places.",
      locationError: 'Location Error',
      locationErrorMessage: 'Please enable location services in your browser to find nearby places.',
      apiError: 'Could Not Fetch Data',
      apiErrorMessage: 'Could not load places. Please try again later.',
      noResults: 'No places found matching your criteria.',
    },
    card: {
      viewAndRate: 'View & Rate →',
      publicRating: 'Public',
      googleRating: 'Google',
    },
    detail: {
      back: 'Back',
      publicRating: 'Public Rating:',
      googleRating: 'Google Rating:',
      submitSuccess: 'Thank you! Your rating has been submitted successfully.',
      submitError: 'Something went wrong. Please try submitting your rating again.',
    },
    form: {
      submitTitle: 'Submit Your Rating',
      submitSubtitle: 'Your feedback is anonymous and helps improve public services.',
      commentsLabel: 'Description & Comments',
      commentsPlaceholder: 'Share more details about your experience...',
      photosLabel: 'Upload Photos',
      photosSubtitle: 'Attach photos as evidence (e.g., potholes, uncleanliness).',
      addPhoto: 'Add Photo',
      submitButton: 'Verify & Submit Rating',
    },
    loginModal: {
      title: 'Verify Submission',
      subtitle: 'To prevent spam, please get an OTP via WhatsApp.',
      whatsappInstruction: 'Click the button below to open WhatsApp and send a pre-filled message to get your OTP.',
      whatsappButton: 'Get OTP via WhatsApp',
      proceedButton: "I've sent the message, Next",
      otpSentMessage: "Enter the OTP you received via WhatsApp. (Hint: Use 123456)",
      otpLabel: 'Enter OTP',
      otpPlaceholder: '6-digit code',
      verifyButton: 'Verify & Submit Rating',
      error: {
          invalidOtp: 'Invalid OTP. Please try again.',
      }
    },
  },
  hi: {
    header: {
      title: 'लोक सेवा रेटर',
      admin: 'एडमिन',
    },
    home: {
      findPlaces: 'आस-पास के सार्वजनिक स्थान खोजें',
      searchPlaceholder: 'नाम या पते से खोजें...',
      allTypes: 'सभी',
      loading: 'आपका स्थान प्राप्त हो रहा है...',
      loadingMessage: 'हम आपको आस-पास के स्थान दिखाने के लिए आपका स्थान निर्धारित करने का प्रयास कर रहे हैं।',
      locationError: 'स्थान त्रुटि',
      locationErrorMessage: 'आस-पास के स्थानों को खोजने के लिए कृपया अपने ब्राउज़र में स्थान सेवाएं सक्षम करें।',
      apiError: 'डेटा प्राप्त नहीं किया जा सका',
      apiErrorMessage: 'स्थान लोड नहीं हो सके। कृपया बाद में दोबारा प्रयास करें।',
      noResults: 'आपके मानदंडों से मेल खाने वाला कोई स्थान नहीं मिला।',
    },
    card: {
      viewAndRate: 'देखें और रेट करें →',
      publicRating: 'सार्वजनिक',
      googleRating: 'गूगल',
    },
    detail: {
      back: 'वापस',
      publicRating: 'सार्वजनिक रेटिंग:',
      googleRating: 'गूगल रेटिंग:',
      submitSuccess: 'धन्यवाद! आपकी रेटिंग सफलतापूर्वक सबमिट कर दी गई है।',
      submitError: 'कुछ गलत हो गया। कृपया अपनी रेटिंग फिर से सबमिट करने का प्रयास करें।',
    },
    form: {
      submitTitle: 'अपनी रेटिंग सबमिट करें',
      submitSubtitle: 'आपकी प्रतिक्रिया गुमनाम है और सार्वजनिक सेवाओं को बेहतर बनाने में मदद करती है।',
      commentsLabel: 'विवरण और टिप्पणियाँ',
      commentsPlaceholder: 'अपने अनुभव के बारे में अधिक विवरण साझा करें...',
      photosLabel: 'तस्वीरें अपलोड करें',
      photosSubtitle: 'सबूत के तौर पर तस्वीरें संलग्न करें (जैसे, गड्ढे, अस्वच्छता)।',
      addPhoto: 'तस्वीर जोड़ें',
      submitButton: 'सत्यापित करें और रेटिंग सबमिट करें',
    },
    loginModal: {
      title: 'सबमिशन सत्यापित करें',
      subtitle: 'स्पैम को रोकने के लिए, कृपया व्हाट्सएप के माध्यम से एक ओटीपी प्राप्त करें।',
      whatsappInstruction: 'अपना ओटीपी प्राप्त करने के लिए व्हाट्सएप खोलने और एक पूर्व-भरे हुए संदेश भेजने के लिए नीचे दिए गए बटन पर क्लिक करें।',
      whatsappButton: 'व्हाट्सएप पर ओटीपी प्राप्त करें',
      proceedButton: 'मैंने संदेश भेज दिया है, अगला',
      otpSentMessage: "व्हाट्सएप के माध्यम से प्राप्त ओटीपी दर्ज करें। (संकेत: 123456 का प्रयोग करें)",
      otpLabel: 'ओटीपी दर्ज करें',
      otpPlaceholder: '6-अंकीय कोड',
      verifyButton: 'सत्यापित करें और रेटिंग सबमिट करें',
      error: {
        invalidOtp: 'अमान्य ओटीपी। कृपया पुन: प्रयास करें।',
      }
    },
  },
};

const getLanguage = (): string => {
  return localStorage.getItem('language') || 'en';
};

const setLanguage = (lang: string): void => {
  localStorage.setItem('language', lang);
};

export { translations, getLanguage, setLanguage };