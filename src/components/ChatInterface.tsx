import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb } from 'lucide-react';
import { getLocalizedText } from './LanguageSelector';

interface ChatInterfaceProps {
  docData: any;
  language: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ docData, language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I've read through your document "${docData.name}" and I'm here to help you understand it. Think of me as your friendly legal translator - I can explain confusing parts, tell you about your rights, or help you spot anything that might be unfair. What questions do you have?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Generate contextual AI response based on user question
    setTimeout(() => {
      const aiResponse = generateContextualResponse(inputText, docData, language);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    getLocalizedText('suggested_q1', language) || "Can my landlord kick me out without much warning?",
    getLocalizedText('suggested_q2', language) || "What happens if I need to move out early?",
    getLocalizedText('suggested_q3', language) || "Can my landlord raise the rent whenever they want?",
    getLocalizedText('suggested_q4', language) || "What if something expensive breaks - who pays?",
    getLocalizedText('suggested_q5', language) || "Is this security deposit amount normal?",
    getLocalizedText('suggested_q6', language) || "What are my rights if the landlord doesn't fix things?"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-6">
          <h2 className="text-xl font-bold flex items-center">
            <Bot className="w-6 h-6 mr-3" />
            {getLocalizedText('ask_anything', language) || 'Ask Me Anything About Your Document'}
          </h2>
          <p className="text-blue-100 mt-2">
            {getLocalizedText('explain_simple', language) || "I'll explain everything in simple words and help you understand what it really means"}
          </p>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-gray-200' 
                  : 'bg-blue-100'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-gray-600" />
                ) : (
                  <Bot className="w-4 h-4 text-blue-600" />
                )}
              </div>
              
              <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                <div className={`inline-block p-4 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="leading-relaxed">{message.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">Common Questions People Ask</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(question)}
                  className="text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={getLocalizedText('ask_placeholder', language) || "Ask a question about your document..."}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows={2}
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            {getLocalizedText('press_enter', language) || "Press Enter to send, Shift+Enter for new line"}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
      <div className="grid md:grid-cols-3 gap-4">
        <button 
          onClick={() => setInputText("What should I check before signing this document?")}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
        >
          <h3 className="font-semibold text-gray-900 mb-2">📋 {getLocalizedText('what_check', language) || 'What Should I Check?'}</h3>
          <p className="text-sm text-gray-600">
            {getLocalizedText('checklist_desc', language) || 'Get a simple checklist of things to verify before signing'}
          </p>
        </button>
        
        <button 
          onClick={() => setInputText("What are my rights according to this document?")}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
        >
          <h3 className="font-semibold text-gray-900 mb-2">⚖️ {getLocalizedText('what_rights', language) || 'What Are My Rights?'}</h3>
          <p className="text-sm text-gray-600">
            {getLocalizedText('rights_desc', language) || 'Learn what protections you have under the law'}
          </p>
        </button>
        
        <button 
          onClick={() => setInputText("Are these terms normal for this type of document?")}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
        >
          <h3 className="font-semibold text-gray-900 mb-2">🔍 {getLocalizedText('is_normal', language) || 'Is This Normal?'}</h3>
          <p className="text-sm text-gray-600">
            {getLocalizedText('normal_desc', language) || 'Find out if these terms are typical or unusual'}
          </p>
        </button>
      </div>
      </div>
    </div>
  );
};

// Generate contextual AI responses based on user questions
const generateContextualResponse = (question: string, docData: any, language: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Security deposit related questions
  if (lowerQuestion.includes('security') || lowerQuestion.includes('deposit')) {
    return getLocalizedResponse('security_deposit', language);
  }
  
  // Rent increase questions
  if (lowerQuestion.includes('rent') && (lowerQuestion.includes('increase') || lowerQuestion.includes('raise'))) {
    return getLocalizedResponse('rent_increase', language);
  }
  
  // Maintenance and repair questions
  if (lowerQuestion.includes('repair') || lowerQuestion.includes('maintenance') || lowerQuestion.includes('fix')) {
    return getLocalizedResponse('maintenance', language);
  }
  
  // Eviction and termination questions
  if (lowerQuestion.includes('evict') || lowerQuestion.includes('kick out') || lowerQuestion.includes('terminate')) {
    return getLocalizedResponse('eviction', language);
  }
  
  // Rights related questions
  if (lowerQuestion.includes('rights') || lowerQuestion.includes('protect')) {
    return getLocalizedResponse('rights', language);
  }
  
  // Early termination questions
  if (lowerQuestion.includes('early') && lowerQuestion.includes('move')) {
    return getLocalizedResponse('early_termination', language);
  }
  
  // Default response for general questions
  return getLocalizedResponse('general', language);
};
// Helper function for localized AI responses
const getLocalizedResponse = (key: string, language: string): string => {
  const responses: Record<string, Record<string, string>> = {
    en: {
      security_deposit: "Looking at your document, you need to pay ₹90,000 as security deposit (2 months rent). This is higher than the typical 1 month rent that most places ask for. Make sure to document the property condition with photos when you move in to protect your deposit when you move out.",
      rent_increase: "Your landlord can increase rent with only 30 days notice. This is less time than many places give (usually 60 days). That's not much time to plan if you can't afford the increase. You might want to negotiate for a longer notice period.",
      maintenance: "According to your contract, you're responsible for repairs over ₹100. This means if the AC breaks or there's a plumbing issue costing more than ₹100, you have to pay. This is unusual - normally landlords handle expensive repairs. Try to negotiate this to a higher amount.",
      eviction: "Your contract allows termination with 60 days notice from either party. This is actually reasonable and gives you time to find a new place. However, there's an early termination fee of one month's rent if you leave before the lease ends.",
      rights: "You have the right to live in a safe, habitable property. Your landlord must handle structural repairs and can't enter without reasonable notice. Under Indian tenant laws, you're also protected from arbitrary eviction as long as you follow the lease terms.",
      early_termination: "If you need to move out early, you'll have to pay one month's rent as an early termination fee (₹45,000). You also need to give 60 days written notice. Make sure to get your security deposit back by documenting the property condition.",
      general: "I'm here to help you understand your document! Could you be more specific about what you'd like to know? I can explain any clause, tell you about your rights, or help you understand what certain terms mean in simple language."
    },
    hi: {
      security_deposit: "आपके दस्तावेज़ के अनुसार, आपको ₹90,000 सिक्यूरिटी डिपॉजिट देना होगा (2 महीने का किराया)। यह सामान्य 1 महीने के किराए से ज्यादा है। जब आप अंदर जाएं तो संपत्ति की स्थिति की तस्वीरें लें ताकि बाहर जाते समय आपकी जमा राशि वापस मिल सके।",
      rent_increase: "आपका मकान मालिक केवल 30 दिन के नोटिस से किराया बढ़ा सकता है। यह कई जगहों से कम समय है (आमतौर पर 60 दिन)। अगर आप वृद्धि का खर्च नहीं उठा सकते तो योजना बनाने के लिए यह पर्याप्त समय नहीं है।",
      maintenance: "आपके अनुबंध के अनुसार, आप ₹100 से अधिक की मरम्मत के लिए जिम्मेदार हैं। इसका मतलब है कि अगर AC टूटता है या ₹100 से अधिक की प्लंबिंग समस्या है, तो आपको भुगतान करना होगा। यह असामान्य है।",
      eviction: "आपका अनुबंध दोनों पक्षों से 60 दिन के नोटिस के साथ समाप्ति की अनुमति देता है। यह वास्तव में उचित है। हालांकि, अगर आप लीज समाप्त होने से पहले छोड़ते हैं तो एक महीने के किराए का जुर्माना है।",
      rights: "आपको सुरक्षित, रहने योग्य संपत्ति में रहने का अधिकार है। आपका मकान मालिक संरचनात्मक मरम्मत संभालना चाहिए और बिना उचित सूचना के प्रवेश नहीं कर सकता।",
      early_termination: "अगर आपको जल्दी बाहर जाना है, तो आपको एक महीने का किराया जुर्माना देना होगा (₹45,000)। आपको 60 दिन का लिखित नोटिस भी देना होगा।",
      general: "मैं आपके दस्तावेज़ को समझने में आपकी मदद के लिए यहाँ हूँ! क्या आप अधिक विशिष्ट हो सकते हैं कि आप क्या जानना चाहते हैं?"
    },
    ta: {
      security_deposit: "உங்கள் ஆவணத்தின் படி, நீங்கள் ₹90,000 பாதுகாப்பு வைப்பு செலுத்த வேண்டும் (2 மாத வாடகை). இது வழக்கமான 1 மாத வாடகையை விட அதிகம். உள்ளே செல்லும்போது சொத்தின் நிலையின் புகைப்படங்களை எடுங்கள்.",
      rent_increase: "உங்கள் வீட்டு உரிமையாளர் வெறும் 30 நாட்கள் அறிவிப்புடன் வாடகையை அதிகரிக்க முடியும். இது பல இடங்களை விட குறைவான நேரம் (பொதுவாக 60 நாட்கள்).",
      maintenance: "உங்கள் ஒப்பந்தத்தின் படி, நீங்கள் ₹100க்கு மேல் பழுதுபார்ப்புக்கு பொறுப்பு. இதன் அர்த்தம் AC உடைந்தால் அல்லது ₹100க்கு மேல் பிளம்பிங் பிரச்சினை இருந்தால், நீங்கள் செலுத்த வேண்டும்.",
      eviction: "உங்கள் ஒப்பந்தம் இரு தரப்பிலிருந்தும் 60 நாட்கள் அறிவிப்புடன் முடிவுக்கு அனுமதிக்கிறது. இது உண்மையில் நியாயமானது. இருப்பினும், குத்தகை முடிவதற்கு முன் நீங்கள் வெளியேறினால் ஒரு மாத வாடகை அபராதம் உள்ளது.",
      rights: "நீங்கள் பாதுகாப்பான, வாழக்கூடிய சொத்தில் வாழ உரிமை உண்டு. உங்கள் வீட்டு உரிமையாளர் கட்டமைப்பு பழுதுபார்ப்புகளை கையாள வேண்டும்.",
      early_termination: "நீங்கள் சீக்கிரம் வெளியேற வேண்டுமானால், ஒரு மாத வாடகையை அபராதமாக செலுத்த வேண்டும் (₹45,000). நீங்கள் 60 நாட்கள் எழுத்துப்பூர்வ அறிவிப்பும் கொடுக்க வேண்டும்.",
      general: "உங்கள் ஆவணத்தை புரிந்துகொள்ள உதவ நான் இங்கே இருக்கிறேன்! நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள் என்பதில் இன்னும் குறிப்பிட்டு சொல்ல முடியுமா?"
    },
    te: {
      security_deposit: "మీ పత్రం ప్రకారం, మీరు ₹90,000 సెక్యూరిటీ డిపాజిట్ చెల్లించాలి (2 నెలల అద్దె). ఇది సాధారణ 1 నెల అద్దె కంటే ఎక్కువ. లోపలికి వెళ్లేటప్పుడు ఆస్తి స్థితి యొక్క ఫోటోలు తీయండి.",
      rent_increase: "మీ ఇంటి యజమాని కేవలం 30 రోజుల నోటీసుతో అద్దె పెంచవచ్చు. ఇది చాలా చోట్ల కంటే తక్కువ సమయం (సాధారణంగా 60 రోజులు).",
      maintenance: "మీ ఒప్పందం ప్రకారం, మీరు ₹100 కంటే ఎక్కువ మరమ్మతులకు బాధ్యత వహిస్తారు. దీని అర్థం AC విరిగితే లేదా ₹100 కంటే ఎక్కువ ప్లంబింగ్ సమస్య ఉంటే, మీరు చెల్లించాలి.",
      eviction: "మీ ఒప్పందం రెండు పక్షాల నుండి 60 రోజుల నోటీసుతో ముగింపును అనుమతిస్తుంది. ఇది నిజంగా సహేతుకమైనది. అయితే, లీజు ముగిసేలోపు మీరు వెళ్లిపోతే ఒక నెల అద్దె జరిమానా ఉంది.",
      rights: "మీరు సురక్షితమైన, నివాసయోగ్యమైన ఆస్తిలో నివసించే హక్కు ఉంది. మీ ఇంటి యజమాని నిర్మాణాత్మక మరమ్మతులను నిర్వహించాలి.",
      early_termination: "మీరు త్వరగా బయటకు వెళ్లాలంటే, ఒక నెల అద్దెను జరిమానాగా చెల్లించాలి (₹45,000). మీరు 60 రోజుల వ్రాతపూర్వక నోటీసు కూడా ఇవ్వాలి.",
      general: "మీ పత్రాన్ని అర్థం చేసుకోవడంలో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను! మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారో మరింత నిర్దిష్టంగా చెప్పగలరా?"
    }
  };

  return responses[language]?.[key] || responses.en[key] || key;
};