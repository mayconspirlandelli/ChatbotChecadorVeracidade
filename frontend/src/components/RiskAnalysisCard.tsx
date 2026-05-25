
export interface RiskAnalysisCardProps {
  risk: string;
  score: number;
  category: string[];
  subcategory: string[];
  reason: string;
}
const defaultRiskAnalysisCardProps: RiskAnalysisCardProps = {
  risk: "RISCO ALTO",
  score: 87,
  category: ["GERAÇÃO SINTÉTICA", "GOLPE/FRAUDE"],
  subcategory: ["Deepfake conteúdo manipulado", "Phishing bancário por SMS"],
  reason: "Identificamos o uso de link encurtado apontando para domínio suspeito, além de linguagem de urgência típica de golpes de phishing bancário.",
};
const RiskAnalysisCard = ({
  risk = defaultRiskAnalysisCardProps.risk,
  score = defaultRiskAnalysisCardProps.score,
  category = defaultRiskAnalysisCardProps.category,
  subcategory = defaultRiskAnalysisCardProps.subcategory,
  reason = defaultRiskAnalysisCardProps.reason,
}: Partial<RiskAnalysisCardProps>) => {
  return (
    <div
      style={{
        border: "4px solid #ef4444",
        borderRadius: "20px",
        padding: "18px",
        background: "#f8f8f8",
        width: "100%",
        maxWidth: "760px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Risk */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#ef4444",
            }}
          >
            ⚠️
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "14px",
                fontWeight: 300,
              }}
            >
              Classificação de Risco
            </p>
            <h1
              style={{
                margin: 0,
                color: "#ef4444",
                fontSize: "32px",
                fontWeight: 600,
              }}
            >
              {risk}
            </h1>
          </div>
        </div>
        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {category.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  background:
                    index === 0 ? "#f59e0b" : "#ef4444",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {item}
              </div>
              <div
                style={{
                  marginTop: "6px",
                  border: `2px solid ${
                    index === 0 ? "#f59e0b" : "#ef4444"
                  }`,
                  color:
                    index === 0 ? "#b45309" : "#b91c1c",
                  borderRadius: "10px",
                  padding: "5px 8px",
                  fontSize: "10px",
                  background: "#fff",
                  textAlign: "center",
                }}
              >
                {subcategory[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Risk Bar */}
      <div style={{ marginTop: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            color: "#6b7280",
            fontWeight: 400,
            fontSize: "14px",
          }}
        >
          <span>Baixo</span>
          <span>Médio</span>
          <span style={{ color: "#ef4444" }}>Alto</span>
          <span>Crítico</span>
        </div>
        <div
          style={{
            width: "100%",
            height: "16px",
            borderRadius: "999px",
            overflow: "hidden",
            display: "flex",
            background: "#e5e7eb",
          }}
        >
          <div style={{ width: "35%", background: "#22c55e" }} />
          <div style={{ width: "25%", background: "#f59e0b" }} />
          <div style={{ width: "25%", background: "#ef4444" }} />
          <div style={{ width: "15%", background: "#d1d5db" }} />
        </div>
        <div
          style={{
            textAlign: "right",
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          Score: {score}/100
        </div>
      </div>
      {/* Explanation */}
      <div
        style={{
          marginTop: "40px",
          background: "#fee2e2",
          borderRadius: "20px",
          padding: "28px",
          border: "2px solid #fecaca",
        }}
      >
        <h2
          style={{
            color: "#dc2626",
            marginTop: 0,
            fontSize: "20px",
          }}
        >
          ⓘ Por que este risco é alto?
        </h2>
        <p
          style={{
            color: "#b91c1c",
            fontSize: "14px",
            lineHeight: 1.6,
            marginBottom: 0,
          }}
        >
          {reason}
        </p>
      </div>
    </div>
  );
};
export default RiskAnalysisCard;