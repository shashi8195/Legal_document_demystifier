import React, { useState } from 'react';
import { Globe, Volume2, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
];

// Complete translations object
const translations: Record<string, Record<string, string>> = {
  en: {
    app_subtitle: "AI-Powered Legal Document Analysis",
    secure_private: "Secure & Private",
    narration_intro: "Welcome to Legal Clarify. I will help you understand your legal documents in simple language.",
    stop_audio: "Stop",
    listen_audio: "Listen",
    upload_document: "Upload Your Legal Document",
    drag_drop_text: "Drag and drop your document here, or click to browse",
    choose_file: "Choose File",
    analyzing: "Analyzing Document...",
    analysis_complete: "Analysis Complete!",
    risk_level: "Risk Level",
    document_summary: "Document Summary",
    key_points: "Key Points",
    risky_clauses: "Risky Clauses",
    your_rights: "Your Rights",
    action_checklist: "Action Checklist",
    understand_documents: "Understand Your Legal Documents",
    upload_description: "Upload any legal document and get instant, clear explanations in plain English. Identify risks, understand your rights, and make informed decisions.",
    smart_reading: "Smart Document Reading",
    smart_reading_desc: "Our AI reads your document like a lawyer would, then explains it in simple words you can understand",
    spot_traps: "Spot the Traps",
    spot_traps_desc: "We highlight sneaky clauses that might cost you money or limit your rights",
    no_jargon: "No More Legal Jargon",
    no_jargon_desc: "We translate lawyer-speak into everyday language that actually makes sense",
    view_document: "View Document",
    download_summary: "Download Summary",
    quick_summary: "Quick Summary",
    risk_analysis: "Risk Analysis",
    key_points_remember: "Key Points to Remember",
    what_next: "What would you like to do next?",
    ask_questions: "Ask Questions About This Document",
    generate_checklist: "Generate Legal Checklist",
    legal_checklist: "Legal Checklist",
    download_checklist: "Download Checklist",
    uploaded_on: "Uploaded on",
    ai_reading: "Our AI is reading and understanding your document",
    redirecting: "Redirecting to your document analysis..."
  },
  hi: {
    app_subtitle: "AI-संचालित कानूनी दस्तावेज़ विश्लेषण",
    secure_private: "सुरक्षित और निजी",
    narration_intro: "लीगल क्लैरिफाई में आपका स्वागत है। मैं आपके कानूनी दस्तावेजों को सरल भाषा में समझाने में आपकी मदद करूंगा।",
    stop_audio: "रोकें",
    listen_audio: "सुनें",
    upload_document: "अपना कानूनी दस्तावेज़ अपलोड करें",
    drag_drop_text: "अपना दस्तावेज़ यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें",
    choose_file: "फ़ाइल चुनें",
    analyzing: "दस्तावेज़ का विश्लेषण कर रहे हैं...",
    analysis_complete: "विश्लेषण पूरा!",
    risk_level: "जोखिम स्तर",
    document_summary: "दस्तावेज़ सारांश",
    key_points: "मुख्य बिंदु",
    risky_clauses: "जोखिम भरी शर्तें",
    your_rights: "आपके अधिकार",
    action_checklist: "कार्य सूची",
    understand_documents: "अपने कानूनी दस्तावेजों को समझें",
    upload_description: "कोई भी कानूनी दस्तावेज़ अपलोड करें और तुरंत स्पष्ट व्याख्या प्राप्त करें। जोखिमों की पहचान करें, अपने अधिकारों को समझें।",
    smart_reading: "स्मार्ट दस्तावेज़ पठन",
    smart_reading_desc: "हमारा AI आपके दस्तावेज़ को वकील की तरह पढ़ता है, फिर सरल शब्दों में समझाता है",
    spot_traps: "जालों को पकड़ें",
    spot_traps_desc: "हम छुपी हुई शर्तों को उजागर करते हैं जो आपका पैसा खर्च कर सकती हैं",
    no_jargon: "कोई कानूनी शब्दजाल नहीं",
    no_jargon_desc: "हम वकील की भाषा को रोजमर्रा की भाषा में बदलते हैं",
    view_document: "दस्तावेज़ देखें",
    download_summary: "सारांश डाउनलोड करें",
    quick_summary: "त्वरित सारांश",
    risk_analysis: "जोखिम विश्लेषण",
    key_points_remember: "याद रखने योग्य मुख्य बिंदु",
    what_next: "आप आगे क्या करना चाहेंगे?",
    ask_questions: "इस दस्तावेज़ के बारे में प्रश्न पूछें",
    generate_checklist: "कानूनी चेकलिस्ट बनाएं",
    legal_checklist: "कानूनी चेकलिस्ट",
    download_checklist: "चेकलिस्ट डाउनलोड करें",
    uploaded_on: "अपलोड किया गया",
    ai_reading: "हमारा AI आपके दस्तावेज़ को पढ़ और समझ रहा है",
    redirecting: "आपके दस्तावेज़ विश्लेषण पर भेजा जा रहा है..."
  },
  ta: {
    app_subtitle: "AI-இயங்கும் சட்ட ஆவண பகுப்பாய்வு",
    secure_private: "பாதுகாப்பான மற்றும் தனிப்பட்ட",
    narration_intro: "லீகல் கிளாரிஃபைக்கு வரவேற்கிறோம். உங்கள் சட்ட ஆவணங்களை எளிய மொழியில் புரிந்துகொள்ள உதவுவேன்.",
    stop_audio: "நிறுத்து",
    listen_audio: "கேளுங்கள்",
    upload_document: "உங்கள் சட்ட ஆவணத்தை பதிவேற்றவும்",
    drag_drop_text: "உங்கள் ஆவணத்தை இங்கே இழுத்து விடவும், அல்லது உலாவ கிளிக் செய்யவும்",
    choose_file: "கோப்பைத் தேர்ந்தெடுக்கவும்",
    analyzing: "ஆவணத்தை பகுப்பாய்வு செய்கிறது...",
    analysis_complete: "பகுப்பாய்வு முடிந்தது!",
    risk_level: "ஆபத்து நிலை",
    document_summary: "ஆவண சுருக்கம்",
    key_points: "முக்கிய புள்ளிகள்",
    risky_clauses: "ஆபத்தான விதிகள்",
    your_rights: "உங்கள் உரிமைகள்",
    action_checklist: "செயல் பட்டியல்",
    understand_documents: "உங்கள் சட்ட ஆவணங்களைப் புரிந்துகொள்ளுங்கள்",
    upload_description: "எந்த சட்ட ஆவணத்தையும் பதிவேற்றி உடனடியாக தெளிவான விளக்கங்களைப் பெறுங்கள்",
    smart_reading: "ஸ்மார்ட் ஆவண வாசிப்பு",
    smart_reading_desc: "எங்கள் AI உங்கள் ஆவணத்தை வழக்கறிஞர் போல படித்து எளிய வார்த்தைகளில் விளக்குகிறது",
    spot_traps: "பொறிகளைக் கண்டறியுங்கள்",
    spot_traps_desc: "உங்கள் பணத்தை செலவழிக்கும் மறைந்த விதிகளை நாங்கள் முன்னிலைப்படுத்துகிறோம்",
    no_jargon: "சட்ட வார்த்தைகள் இல்லை",
    no_jargon_desc: "வழக்கறிஞர் மொழியை அன்றாட மொழியாக மாற்றுகிறோம்",
    view_document: "ஆவணத்தைப் பார்க்கவும்",
    download_summary: "சுருக்கத்தை பதிவிறக்கவும்",
    quick_summary: "விரைவு சுருக்கம்",
    risk_analysis: "ஆபத்து பகுப்பாய்வு",
    key_points_remember: "நினைவில் கொள்ள வேண்டிய முக்கிய புள்ளிகள்",
    what_next: "நீங்கள் அடுத்து என்ன செய்ய விரும்புகிறீர்கள்?",
    ask_questions: "இந்த ஆவணத்தைப் பற்றி கேள்விகள் கேளுங்கள்",
    generate_checklist: "சட்ட சரிபார்ப்பு பட்டியலை உருவாக்கவும்",
    legal_checklist: "சட்ட சரிபார்ப்பு பட்டியல்",
    download_checklist: "சரிபார்ப்பு பட்டியலை பதிவிறக்கவும்",
    uploaded_on: "பதிவேற்றப்பட்டது",
    ai_reading: "எங்கள் AI உங்கள் ஆவணத்தை படித்து புரிந்துகொள்கிறது",
    redirecting: "உங்கள் ஆவண பகுப்பாய்வுக்கு திருப்பி விடப்படுகிறது..."
  },
  te: {
    app_subtitle: "AI-నడిచే చట్టపరమైన పత్ర విశ్లేషణ",
    secure_private: "సురక్షితమైన మరియు ప్రైవేట్",
    narration_intro: "లీగల్ క్లారిఫైకి స్వాగతం. మీ చట్టపరమైన పత్రాలను సరళమైన భాషలో అర్థం చేసుకోవడంలో సహాయం చేస్తాను.",
    stop_audio: "ఆపండి",
    listen_audio: "వినండి",
    upload_document: "మీ చట్టపరమైన పత్రాన్ని అప్‌లోడ్ చేయండి",
    drag_drop_text: "మీ పత్రాన్ని ఇక్కడ లాగి వదలండి, లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి",
    choose_file: "ఫైల్ ఎంచుకోండి",
    analyzing: "పత్రాన్ని విశ్లేషిస్తోంది...",
    analysis_complete: "విశ్లేషణ పూర్తయింది!",
    risk_level: "ప్రమాద స్థాయి",
    document_summary: "పత్ర సారాంశం",
    key_points: "ముఖ్య అంశాలు",
    risky_clauses: "ప్రమాదకర నిబంధనలు",
    your_rights: "మీ హక్కులు",
    action_checklist: "చర్య జాబితా",
    understand_documents: "మీ చట్టపరమైన పత్రాలను అర్థం చేసుకోండి",
    upload_description: "ఏదైనా చట్టపరమైన పత్రాన్ని అప్‌లోడ్ చేసి తక్షణమే స్పష్టమైన వివరణలను పొందండి",
    smart_reading: "స్మార్ట్ పత్ర చదవడం",
    smart_reading_desc: "మా AI మీ పత్రాన్ని న్యాయవాది లాగా చదివి సరళమైన పదాలలో వివరిస్తుంది",
    spot_traps: "ఉచ్చులను గుర్తించండి",
    spot_traps_desc: "మీ డబ్బు ఖర్చు చేసే దాచిన నిబంధనలను మేము హైలైట్ చేస్తాము",
    no_jargon: "చట్టపరమైన పదజాలం లేదు",
    no_jargon_desc: "న్యాయవాది భాషను రోజువారీ భాషగా మార్చుతాము",
    view_document: "పత్రాన్ని చూడండి",
    download_summary: "సారాంశాన్ని డౌన్‌లోడ్ చేయండి",
    quick_summary: "త్వరిత సారాంశం",
    risk_analysis: "ప్రమాద విశ్లేషణ",
    key_points_remember: "గుర్తుంచుకోవాల్సిన ముఖ్య అంశాలు",
    what_next: "మీరు తర్వాత ఏమి చేయాలని అనుకుంటున్నారు?",
    ask_questions: "ఈ పత్రం గురించి ప్రశ్నలు అడగండి",
    generate_checklist: "చట్టపరమైన చెక్‌లిస్ట్ రూపొందించండి",
    legal_checklist: "చట్టపరమైన చెక్‌లిస్ట్",
    download_checklist: "చెక్‌లిస్ట్ డౌన్‌లోడ్ చేయండి",
    uploaded_on: "అప్‌లోడ్ చేయబడింది",
    ai_reading: "మా AI మీ పత్రాన్ని చదువుతూ అర్థం చేసుకుంటోంది",
    redirecting: "మీ పత్ర విశ్లేషణకు దారి మళ్లిస్తోంది..."
  }
};

export const getLocalizedText = (key: string, language: string): string => {
  return translations[language]?.[key] || translations.en[key] || key;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  const handleNarration = () => {
    if (isNarrating) {
      speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      const text = getLocalizedText('narration_intro', selectedLanguage);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language-specific voice settings
      const voices = speechSynthesis.getVoices();
      const langVoice = voices.find(voice => 
        voice.lang.startsWith(selectedLanguage === 'hi' ? 'hi' : 
                              selectedLanguage === 'ta' ? 'ta' : 
                              selectedLanguage === 'te' ? 'te' : 'en')
      );
      
      if (langVoice) utterance.voice = langVoice;
      utterance.rate = 0.8;
      utterance.onend = () => setIsNarrating(false);
      
      speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">{selectedLang.flag} {selectedLang.nativeName}</span>
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{lang.nativeName}</p>
                      <p className="text-xs text-gray-500">{lang.name}</p>
                    </div>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleNarration}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isNarrating 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span className="text-sm font-medium">
            {isNarrating ? getLocalizedText('stop_audio', selectedLanguage) : getLocalizedText('listen_audio', selectedLanguage)}
          </span>
        </button>
      </div>
    </div>
  );
};