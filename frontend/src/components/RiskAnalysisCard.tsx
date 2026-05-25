
import React from "react";
import {
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Bot,
  UserSearch,
} from "lucide-react";

export interface RiskAnalysisCardProps {
  risk?: string;
  score?: number;
  syntheticTitle?: string;
  syntheticDescription?: string;
  fraudTitle?: string;
  fraudDescription?: string;
  reason?: string;
  analysisUrl?: string;
}

const defaultProps: Required<RiskAnalysisCardProps> = {
  risk: "RISCO ALTO",
  score: 87,
  syntheticTitle: "GERAÇÃO SINTÉTICA",
  syntheticDescription: "Deepfake conteúdo manipulado",
  fraudTitle: "GOLPE/FRAUDE",
  fraudDescription: "Phishing bancário por SMS",
  reason:
    "Identificamos o uso de link encurtado apontando para domínio suspeito, além de linguagem de urgência típica de golpes de phishing bancário.",
  analysisUrl: "#",
};

const RiskAnalysisCard: React.FC<Partial<RiskAnalysisCardProps>> = ({
  risk = defaultProps.risk,
  score = defaultProps.score,
  syntheticTitle = defaultProps.syntheticTitle,
  syntheticDescription = defaultProps.syntheticDescription,
  fraudTitle = defaultProps.fraudTitle,
  fraudDescription = defaultProps.fraudDescription,
  reason = defaultProps.reason,
  analysisUrl = defaultProps.analysisUrl,
}) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "520px",
        margin: "0 auto",
        background: "#f4f4f4",
        borderRadius: "28px",
        border: "3px solid #ef4444",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            minWidth: "64px",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#ebebeb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AlertTriangle size={36} color="#ef4444" />
        </div>
        <div>
          <div
            style={{
              color: "#6b7280",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            Classificação de Risco
          </div>
          <div
            style={{
              color: "#ff1d1d",
              fontSize: "28px",
              fontWeight: 900,
              lineHeight: 1,
              marginTop: "4px",
            }}
          >
            {risk}
          </div>
        </div>
      </div>

      {/* Risk Bar */}
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            width: "100%",
            height: "18px",
            borderRadius: "999px",
            background: "#d1d5db",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${Math.max(0, Math.min(100, score))}%`,
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, #22c55e 0%, #f59e0b 50%, #ff0000 100%)",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "#6b7280",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Score: {score}/100
        </div>
      </div>

      {/* Synthetic */}
      <div style={{ marginTop: "18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Bot size={28} color="#f4a621" />
          <div
            style={{
              flex: 1,
              background: "#f4a621",
              color: "#fff",
              fontWeight: 800,
              fontSize: "14px",
              borderRadius: "6px",
              textAlign: "center",
              padding: "8px",
            }}
          >
            {syntheticTitle}
          </div>
        </div>
        <div
          style={{
            marginTop: "8px",
            border: "2px solid #f4a621",
            borderRadius: "6px",
            padding: "8px",
            textAlign: "center",
            color: "#c97d00",
            background: "#fff",
            fontSize: "13px",
          }}
        >
          {syntheticDescription}
        </div>
      </div>

      {/* Fraud */}
      <div style={{ marginTop: "14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ShieldAlert size={28} color="#ff1d1d" />
          <div
            style={{
              flex: 1,
              background: "#ff1d1d",
              color: "#fff",
              fontWeight: 800,
              fontSize: "14px",
              borderRadius: "6px",
              textAlign: "center",
              padding: "8px",
            }}
          >
            {fraudTitle}
          </div>
        </div>
        <div
          style={{
            marginTop: "8px",
            border: "2px solid #ff1d1d",
            borderRadius: "6px",
            padding: "8px",
            textAlign: "center",
            color: "#d61c1c",
            background: "#fff",
            fontSize: "13px",
          }}
        >
          {fraudDescription}
        </div>
      </div>

      {/* Human Analysis */}
      <div
        style={{
          marginTop: "16px",
          background: "#d9d9d9",
          borderRadius: "12px",
          padding: "12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#6b7280",
        }}
      >
        <UserSearch size={28} />
        <div
          style={{
            fontSize: "12px",
            lineHeight: 1.3,
            textAlign: "left",
          }}
        >
          Checadores humanos
          <br />
          avaliando...
        </div>
      </div>

      {/* Reason */}
      <div
        style={{
          marginTop: "18px",
          background: "#f8d7da",
          borderRadius: "12px",
          padding: "12px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            color: "#d61c1c",
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          <AlertTriangle size={20} />
          <span>Por que este risco é alto?</span>
        </div>
        <p
          style={{
            marginTop: "10px",
            color: "#c81e1e",
            fontSize: "14px",
            lineHeight: 1.4,
            textAlign: "justify",
            marginBottom: 0,
          }}
        >
          {reason}
        </p>
      </div>

      {/* CTA */}
      <a
        href={analysisUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "16px",
          width: "100%",
          background: "#2cbec4",
          borderRadius: "12px",
          padding: "12px",
          color: "#fff",
          fontWeight: 800,
          fontSize: "14px",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          boxSizing: "border-box",
        }}
      >
        <ExternalLink size={18} />
        VER ANÁLISE COMPLETA
      </a>
    </div>
  );
};

export default RiskAnalysisCard;