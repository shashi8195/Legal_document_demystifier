import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb } from 'lucide-react';

interface ChatInterfaceProps {
  document: any;
  language: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ document, language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I've read through your document "${document.name}" and I'm here to help you understand it. Think of me as your friendly legal translator - I can explain confusing parts, tell you about your rights, or help you spot anything that might be unfair. What questions do you have?`,
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

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        getLocalizedResponse('response_1', language),
        getLocalizedResponse('response_2', language),
        getLocalizedResponse('response_3', language),
        getLocalizedResponse('response_4', language),
        getLocalizedResponse('response_5', language),
        getLocalizedResponse('response_6', language)
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Can my landlord kick me out without much warning?",
    "What happens if I need to move out early?",
    "Can my landlord raise the rent whenever they want?",
    "What if something expensive breaks - who pays?",
    "Is this security deposit amount normal?",
    "What are my rights if the landlord doesn't fix things?"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-6">
          <h2 className="text-xl font-bold flex items-center">
            <Bot className="w-6 h-6 mr-3" />
            Ask Me Anything About Your Document
          </h2>
          <p className="text-blue-100 mt-2">
            I'll explain everything in simple words and help you understand what it really means
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
                placeholder="Ask a question about your document..."
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
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <button className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">📋 What Should I Check?</h3>
          <p className="text-sm text-gray-600">
            Get a simple checklist of things to verify before signing
          </p>
        </button>
        
        <button className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">⚖️ What Are My Rights?</h3>
          <p className="text-sm text-gray-600">
            Learn what protections you have under the law
          </p>
        </button>
        
        <button className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">🔍 Is This Normal?</h3>
          <p className="text-sm text-gray-600">
            Find out if these terms are typical or unusual
          </p>
        </button>
      </div>
    </div>
  );
};

// Helper function for localized AI responses
const getLocalizedResponse = (key: string, language: string): string => {
  const responses: Record<string, Record<string, string>> = {
    en: {
      response_1: "Looking at your document, this means you need to tell your landlord in writing at least 30 days before you want to move out, or you might lose your security deposit. This is pretty normal, but make sure to set a reminder!",
      response_2: "This part is actually not great for you. Most places give tenants 60 days notice before raising rent, but yours only gives 30 days. That's not much time to plan if you can't afford the increase.",
      response_3: "Good news! You have the right to ask for reasonable changes to make the place work for you. Your landlord can't just ignore requests to fix things that make the place unsafe or unlivable.",
      response_4: "This clause basically says you have to pay for expensive repairs. That's unusual - normally landlords pay for big stuff like broken heaters or plumbing. You might want to negotiate this to a higher amount, like $200 instead of $100.",
      response_5: "According to the Model Tenancy Act 2021, landlords usually need to give 30 days notice for eviction, but your contract says only 7 days. That's really short and might not even be legal in your state.",
      response_6: "This is actually a red flag. Most tenant protection laws require longer notice periods. In Maharashtra, for example, landlords typically need to give 15-30 days notice depending on the reason for eviction."
    },
    hi: {
      response_1: "आपके दस्तावेज़ को देखते हुए, इसका मतलब है कि आपको अपने मकान मालिक को कम से कम 30 दिन पहले लिखित में बताना होगा कि आप बाहर जाना चाहते हैं, नहीं तो आप अपनी सिक्यूरिटी डिपॉजिट खो सकते हैं।",
      response_2: "यह हिस्सा वास्तव में आपके लिए अच्छा नहीं है। अधिकांश जगहों पर किरायेदारों को किराया बढ़ाने से पहले 60 दिन का नोटिस मिलता है, लेकिन आपको केवल 30 दिन मिलते हैं।",
      response_3: "अच्छी खबर! आपको उचित बदलाव मांगने का अधिकार है। आपका मकान मालिक सुरक्षा संबंधी समस्याओं को ठीक करने के अनुरोधों को नजरअंदाज नहीं कर सकता।",
      response_4: "इस खंड का मतलब है कि आपको महंगी मरम्मत के लिए भुगतान करना होगा। यह असामान्य है - आमतौर पर मकान मालिक बड़ी चीजों के लिए भुगतान करते हैं।",
      response_5: "मॉडल टेनेंसी एक्ट 2021 के अनुसार, मकान मालिकों को आमतौर पर बेदखली के लिए 30 दिन का नोटिस देना होता है, लेकिन आपके अनुबंध में केवल 7 दिन कहा गया है।",
      response_6: "यह वास्तव में एक चेतावनी संकेत है। अधिकांश किरायेदार सुरक्षा कानूनों में लंबी नोटिस अवधि की आवश्यकता होती है।"
    },
    ta: {
      response_1: "உங்கள் ஆவணத்தைப் பார்க்கும்போது, நீங்கள் வெளியேற விரும்பினால் குறைந்தது 30 நாட்களுக்கு முன்பு உங்கள் வீட்டு உரிமையாளரிடம் எழுத்துப்பூர்வமாக தெரிவிக்க வேண்டும்.",
      response_2: "இந்த பகுதி உங்களுக்கு நல்லதல்ல. பெரும்பாலான இடங்களில் வாடகை அதிகரிப்பதற்கு முன் 60 நாட்கள் அறிவிப்பு கொடுக்கப்படும், ஆனால் உங்களுக்கு 30 நாட்கள் மட்டுமே.",
      response_3: "நல்ல செய்தி! நியாயமான மாற்றங்களைக் கேட்க உங்களுக்கு உரிமை உண்டு. உங்கள் வீட்டு உரிமையாளர் பாதுகாப்பு பிரச்சினைகளை சரிசெய்யும் கோரிக்கைகளை புறக்கணிக்க முடியாது.",
      response_4: "இந்த விதி அடிப்படையில் நீங்கள் விலையுயர்ந்த பழுதுபார்ப்புகளுக்கு பணம் செலுத்த வேண்டும் என்று கூறுகிறது. இது அசாதாரணமானது.",
      response_5: "மாதிரி குத்தகை சட்டம் 2021 படி, வீட்டு உரிமையாளர்கள் பொதுவாக வெளியேற்றுவதற்கு 30 நாட்கள் அறிவிப்பு கொடுக்க வேண்டும், ஆனால் உங்கள் ஒப்பந்தத்தில் 7 நாட்கள் மட்டுமே.",
      response_6: "இது உண்மையில் ஒரு எச்சரிக்கை அடையாளம். பெரும்பாலான குத்தகைதாரர் பாதுகாப்பு சட்டங்களுக்கு நீண்ட அறிவிப்பு காலங்கள் தேவை."
    },
    te: {
      response_1: "మీ పత్రాన్ని చూస్తే, మీరు బయటకు వెళ్లాలని అనుకుంటే కనీసం 30 దినాల ముందు మీ ఇంటి యజమానికి వ్రాతపూర్వకంగా తెలియజేయాలి.",
      response_2: "ఈ భాగం మీకు మంచిది కాదు. చాలా చోట్ల అద్దె పెంచడానికి ముందు 60 రోజుల నోటీసు ఇస్తారు, కానీ మీకు 30 రోజులు మాత్రమే.",
      response_3: "మంచి వార్త! సహేతుకమైన మార్పులను అడగడానికి మీకు హక్కు ఉంది. మీ ఇంటి యజమాని భద్రతా సమస్యలను పరిష్కరించే అభ్యర్థనలను విస్మరించలేరు.",
      response_4: "ఈ నిబంధన ప్రాథమికంగా మీరు ఖరీదైన మరమ్మతులకు డబ్బు చెల్లించాలని చెబుతుంది. ఇది అసాధారణం.",
      response_5: "మోడల్ టెనెన్సీ యాక్ట్ 2021 ప్రకారం, ఇంటి యజమానులు సాధారణంగా తొలగింపుకు 30 రోజుల నోటీసు ఇవ్వాలి, కానీ మీ ఒప్పందంలో 7 రోజులు మాత్రమే.",
      response_6: "ఇది నిజంగా ఒక హెచ్చరిక సంకేతం. చాలా అద్దెదారుల రక్షణ చట్టాలకు ఎక్కువ నోటీసు కాలాలు అవసరం."
    }
  };

  return responses[language]?.[key] || responses.en[key] || key;
};