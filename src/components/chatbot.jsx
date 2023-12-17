import React, { useState } from 'react';

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="fixed bottom-10 right-10 z-10">
      <button
        onClick={toggleChatbot}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white focus:outline-none"
      >
        Chat
      </button>
      {showChatbot && (
        <div className="w-96 h-96 bg-white shadow-lg rounded-xl overflow-hidden absolute bottom-16 right-0">
          <iframe
            className="w-full h-full"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/16d4ea44-dcb1-4fec-b19b-0335a2e8b33a"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
