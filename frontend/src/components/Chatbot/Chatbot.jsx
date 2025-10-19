import React, { useState, useRef, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000/ai/ask";

const Chatbot = () => {
  const initialMessage = { sender: "ai", text: "Hello! How can I help you with our events today?" };
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessages(prev => [...prev, { sender: "ai", text: "Authentication error. Please log in." }]);
        setIsLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: userMessage }),
      });

      // --- TOKEN EXPIRATION LOGIC ADDED HERE ---
      if (!response.ok) {
        // Specifically check for authentication errors
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token"); // Clear invalid token
          setMessages([{ sender: "ai", text: "Your session has expired. Please log in again." }]);
          setIsOpen(false); // Close the chat window
          setIsLoading(false);
          return; // Stop further execution
        }
        // Handle other non-auth errors
        const errData = await response.json();
        throw new Error(errData.detail || "An API error occurred");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { sender: "ai", text: data.answer }]);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setMessages(prev => [...prev, { sender: "ai", text: `❌ ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div className={`w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 font-bold flex justify-between items-center rounded-t-2xl">
          <span>Event Assistant</span>
          <button onClick={() => setIsOpen(false)} className="text-2xl hover:opacity-75">&times;</button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-slate-50">
          <div className="flex flex-col space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`py-2 px-4 rounded-xl max-w-[80%] break-words ${msg.sender === "user" ? "bg-purple-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-sm"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-xl rounded-bl-none py-2 px-4 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <form className="flex p-3 border-t border-slate-200 bg-white rounded-b-2xl" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-grow border border-slate-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" disabled={!inputValue.trim() || isLoading} className="bg-purple-600 text-white rounded-full w-10 h-10 ml-2 flex items-center justify-center disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors">
            <svg className="w-5 h-5 -mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.544l4.288-1.224a.25.25 0 01.287.287l-1.224 4.288a.75.75 0 00.544.95l4.95 1.414a.75.75 0 00.95-.826l-2.289-8a.75.75 0 00-.95-.544l-4.288 1.224a.25.25 0 01-.287-.287l1.224-4.288a.75.75 0 00-.544-.95l-8-2.289z"></path></svg>
          </button>
        </form>
      </div>

      {/* Chat Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:scale-110 transition-transform mt-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
      </button>
    </div>
  );
};

export default Chatbot;