import React, { useState } from "react";
import ChatDFrui from "#components/ChatDFrui";
import paginaImg from "../assets/pagina_denodare.png";
import icone_chat from "../assets/icone_chatbot.svg";

const IframePage: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat(!showChat);

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Iframe container */}
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <img src={paginaImg} alt="Denodare design" style={{ maxWidth: "100%", height: "auto" }} />
      </div>

      {/* Floating chatbot button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
          zIndex: 1000,
        }}
        onClick={toggleChat}
        aria-label="Abrir chatbot"
      >
        <img src={icone_chat} alt="Chatbot" style={{ width: "150px", height: "150px" }} />
      </div>

      {/* Chatbot modal */}
      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: "60px",
            right: "20px",
            width: "400px",
            maxHeight: "80vh",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            backgroundColor: "#fff",
            zIndex: 1000,
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={toggleChat}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                margin: "5px",
              }}
              aria-label="Fechar chatbot"
            >
              ✖️
            </button>
          </div>
          <ChatDFrui />
        </div>
      )}
    </div>
  );
};

export default IframePage;
