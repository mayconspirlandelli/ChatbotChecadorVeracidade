import ChatBot from "react-chatbotify";
import "@/styles/chatbot.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef } from "react";
import RiskAnalysisCard, { type RiskAnalysisCardProps } from "./RiskAnalysisCard";
import { fetchReportById, summarizeReport } from "./endpoints";


interface CheckData {
    content: string;
    context: string;
    rating: string;
}

type RiskAnalysisData = RiskAnalysisCardProps;

const ChatDFrui = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const modelName = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";
    const analysisResultRef = useRef<RiskAnalysisData | null>(null);

    // Estado para armazenar dados da checagem atual
    const checkData = useRef<CheckData>({
        content: "",
        context: "",
        rating: "",
    });

    const SYSTEM_MESSAGE = `Você é o dFRui, um assistente especializado em checagem de fatos (fact-checking) do projeto dAurora.
Sua missão é analisar informações e determinar sua veracidade de forma objetiva e confiável.

Ao receber um conteúdo e seu contexto, você deve:
1. Avaliar se há evidências oficiais ou científicas.
2. Identificar se a informação está fora de contexto ou é manipulada.
3. Fornecer um veredito claro (VERÍDICO, INVERÍDICO, FORA DE CONTEXTO ou NÃO VERIFICÁVEL).
4. Gerar um link fictício no padrão https://daurora.com.br/checagem/[id] para a "análise completa".

Responda sempre em Português do Brasil, mantendo um tom profissional e prestativo.`;

    const formatMessageText = (text: string) => {
        if (!text) return "";
        const parts = text.split("**");
        return (
            <span style={{ whiteSpace: "pre-wrap" }}>
                {parts.map((part, index) => {
                    if (index % 2 !== 0) {
                        return <strong key={index}>{part}</strong>;
                    }
                    return part;
                })}
            </span>
        );
    };

    const parseAnalysisResult = (text: string): RiskAnalysisData => {
        const fallback: RiskAnalysisData = {
            risk: ["RISCO ALTO", "risco medio", "risco baixo"].includes(text.toLowerCase()) ? text.toUpperCase() : "NÃO VERIFICÁVEL",
            score: 87,
            reason: text,   
        };

        const cleanedText = text
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        try {
            const parsed = JSON.parse(cleanedText);

            return {
                risk: typeof parsed.risk === "string" ? parsed.risk : fallback.risk,
                score: Number.isFinite(Number(parsed.score)) ? Number(parsed.score) : fallback.score,
                reason: typeof parsed.reason === "string" ? parsed.reason : fallback.reason,
            };
        } catch {
            return fallback;
        }
    };

    const handleGeminiCheck = async (params: any) => {
        try {
            if (!apiKey) {
                await params.injectMessage("Erro: Chave de API não configurada no ambiente.");
                return;
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: SYSTEM_MESSAGE
            });

            const prompt = `
                CONTEÚDO PARA CHECAGEM:
                "${checkData.current.content}"

                CONTEXTO ADICIONAL:
                "${checkData.current.context}"

                Responda estritamente em JSON válido, sem markdown e sem texto fora do objeto, usando este formato:
                {
                  "risk": "RISCO ALTO", "RISCO MÉDIO" ou "RISCO BAIXO",
                  "score": 87,
                  "reason": "Explique em uma ou duas frases por que o conteúdo foi classificado assim."
                }
                `;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            const parsedAnalysis = parseAnalysisResult(responseText);

            analysisResultRef.current = parsedAnalysis;

            await params.injectMessage(
                //formatMessageText(responseText)
                formatMessageText("Análise concluída.")
            );
        } catch (error: any) {
            console.error("Erro na checagem:", error);
            await params.injectMessage("Desculpe, tive um problema técnico ao analisar essa informação. Por favor, tente novamente em instantes.");
        }
    };

    const flow = {

        start: {
            message: "Olá! 👋\n\nEu sou o dFuri, assistente inteligente de apoio à checagem de conteúdos suspeitos e combate à desinformação.\n\n🔒 Este atendimento segue as diretrizes da LGPD. Sua privacidade é garantida com atendimento 100% anônimo. Você não precisa se identificar para enviar um relato.\n\nComo posso ajudar hoje?",
            options: ["Reportar um novo conteúdo suspeito", "Acompanhar um relato já enviado"],
            chatDisabled: true,
            path: (params: any) => {
                if (params.userInput === "Reportar um novo conteúdo suspeito") {
                    return "content_submission";
                }
                return "code_submission";
            },
        },
        code_submission: {
            message: "Por favor, informe o código do relato para acompanhar o resultado da análise.",
            chatDisabled: false,
            path: async (params: any) => {
                const reportId = params.userInput?.trim();
                checkData.current.context = `Código do relato: ${reportId}. `;

                if (reportId) {
                    try {
                        const report = await fetchReportById(reportId);
                        const summary = summarizeReport(report);
                        checkData.current.context += `Dados do relato: ${summary} `;
                        // Exibe o resumo diretamente no chat para o usuário
                        await params.injectMessage(formatMessageText(`Resumo do relato:\n${summary}`));
                    } catch (error) {
                        console.error("Erro ao consultar relato:", error);
                        checkData.current.context += `Dados do relato: (erro ao consultar). `;
                        await params.injectMessage("Erro ao consultar o relato. Por favor, tente novamente mais tarde.");
                    }
                }

                return "result_step";
            },
        },

        content_submission: {
            message: "O que você recebeu de conteúdo?",
            chatDisabled: true,
            options: ["SMS/Mensagem", "Áudio/Ligação", "Link/URL", "Imagens e Vídeos"],
            path: (params: any) => {
                checkData.current.context = `Tipo de conteúdo: ${params.userInput}. `;
                return "ask_content";
            },
        },

        ask_content: {
            message: (params: any) => {
                const tipo = params.userInput;
                if (tipo === "SMS/Mensagem") {
                    return "✉️ Por favor, cole o texto da mensagem recebida abaixo:";
                }
                if (tipo === "Áudio/Ligação") {
                    return "🎤 Descreva o conteúdo do áudio ou ligação recebida:";
                }
                if (tipo === "Link/URL") {
                    return "🔗 Cole o link/URL que deseja verificar:";
                }
                return "🖼️ Descreva o conteúdo das imagens ou vídeos recebidos:";
            },
            path: (params: any) => {
                checkData.current.content = params.userInput;
                return "ask_origin";
            },
        },

        ask_origin: {
            message: "Qual a sua pergunta em relação a esse conteúdo? Escreva sua dúvida ou alegação sobre o conteúdo.",
            path: (params: any) => {
                checkData.current.context += `Pergunta do usuário: ${params.userInput}. `;
                return "ask_extra_info";
            },
        },
        ask_extra_info: {
            message: "Entendido.\n\nExiste alguma informação extra que possa ajudar na análise?\n\nPor exemplo:\n• Como você recebeu a mensagem;\n• Se houve pedido de senha ou Pix;\n• Se havia urgência ou ameaça;\n• Nome da instituição mencionada.",
            path: (params: any) => {
                if (params.userInput.trim()) {
                    checkData.current.context += `Informação extra: ${params.userInput}. `;
                }
                return "ask_email";
            },
        },
        ask_email: {
            message: "Deseja receber o resultado da checagem por e‑mail?\nSeu e‑mail será usado apenas para envio da devolutiva e não será vinculado ao relato.",
            chatDisabled: true,
            options: ["Sim", "Não"],
            path: (params: any) => {
                if (params.userInput === "Sim") {
                    // flag to collect email later
                    checkData.current.context += "Solicita e‑mail: true. ";
                    return "collect_email";
                }
                return "processing_message";
            },
        },
        collect_email: {
            message: "Por favor, informe o endereço de e‑mail onde deseja receber o resultado:",
            path: (params: any) => {
                checkData.current.context += `E‑mail: ${params.userInput}. `;
                return "processing_message";
            },
        },
        processing_message: {
            message: "🔎 Estamos analisando o conteúdo enviado.\nIsso pode levar alguns instantes...",
            chatDisabled: true,
            transition: { duration: 1500 },
            path: async (params: any) => {
                await handleGeminiCheck(params);
                return "result_analysis_ia";
            },
        },
        result_step: { //Este trecho de codigo é fixo para simular o codigo enviado pelo usuario.
            message: "✅ Resultado da Checagem\n\nClassificação: POSSÍVEL GOLPE / PHISHING\n\nO link enviado apresenta características comuns de fraude digital, incluindo:\n• senso de urgência;\n• ameaça de bloqueio de conta;\n• domínio suspeito;\n• solicitação indireta de dados bancários.\n\n⚠️ Código do Relato:\nDAU-2026-004581\n\n📄 Relatório completo:\nhttps://daurora.com.br/relatorio/DAU-2026-004581",
            chatDisabled: true,
            options: ["Ir para relatório completo", "Desejo verificar outro conteúdo", "Desejo encerrar o chat"],
            path: (params: any) => {
                const input = params.userInput;
                if (input === "Ir para relatório completo") {
                    window.open("/relatorio", "_blank");
                }
                if (input === "Desejo verificar outro conteúdo") {
                    return "content_submission";
                }
                if (input === "Desejo encerrar o chat") {
                    return "closing_message";
                }
                return "result_step";
            }
        },

        result_analysis_ia: {
                message: "Veja o resumo da análise abaixo.",
                chatDisabled: true,
                component: () => {
                    const currentAnalysis = analysisResultRef.current;

                    return currentAnalysis ? (
                        <RiskAnalysisCard
                            risk={currentAnalysis.risk}
                            score={currentAnalysis.score}
                            reason={currentAnalysis.reason}
                        />
                    ) : null;
                },
                options: ["Ver análise completa", "Continuar"],
                path: (params: any) => {
                    const input = params.userInput;
                    if (input === "Ver análise completa") {
                         window.open("/relatorio", "_blank");
                    }
                    if (input === "Continuar") {
                        return "guidance_step";
                    }
                    return "result_analysis_ia";
                }
                
        },

        guidance_step: {
            message: "🛡️ O que você deve fazer agora:\n• Não clique no link;\n• Bloqueie o número imediatamente;\n• Não forneça senhas ou códigos;\n• Caso já tenha enviado informações bancárias, entre em contato imediatamente com seu banco utilizando o número oficial presente no verso do cartão.",
            transition: { duration: 1000 },
            path: "resources_step",
        },
        resources_step: {
            message: "📌 Caso precise de mais informações, aqui estão alguns recursos úteis que podem lhe ajudar:",
            chatDisabled: true,
            options: ["Registrar Boletim de Ocorrência", "Mecanismo Especial de Devolução(Pix)", "Cartilha de Segurança(CERT.br)", "Continuar"],
            path: (params: any) => {
                const input = params.userInput;
                if (input === "Registrar Boletim de Ocorrência") {
                    window.open("https://raivirtual.ssp.go.gov.br/#/", "_blank");
                }
                if (input === "Mecanismo Especial de Devolução(Pix)") {
                    window.open("https://www.bcb.gov.br/meubc/faqs/p/o-que-e-e-como-funciona-o-mecanismo-especial-de-devolucao-med", "_blank");
                }
                if (input === "Cartilha de Segurança(CERT.br)") {
                    window.open("https://cartilha.cert.br/", "_blank");
                }
                if (input === "Continuar") {
                    return "new_request_check";
                }
                return "resources_step";
            }
        },

        // validate_experience: original validation after processing (not used)
        //   message: "A resposta atendeu sua expectativa sobre a checagem? 😊",
        //   options: ["Não", "Sim"],
        //   path: (params: any) => {
        //       if (params.userInput === "Sim") {
        //           return "new_request_check";
        //       } else {
        //           return "ask_clarification";
        //       }
        //   },
        // ask_clarification: removed
        //   message: "Lamento que a resposta não tenha sido suficiente. 😔 O que não ficou claro para você ou que informação adicional você gostaria de saber?",
        //   path: (params: any) => {
        //       checkData.current.context += `\nDúvida do usuário: ${params.userInput}`;
        //       return "reprocessing_message";
        //   },
        // reprocessing_message: removed
        //   message: "Entendi! Vou reanalisar o conteúdo com base na sua dúvida. Só um momento...",
        //   transition: { duration: 1500 },
        //   path: async (params: any) => {
        //       await handleGeminiCheck(params);
        //       return "validate_experience";
        //   },

        new_request_check: {
            message: "Você deseja verificar mais algum conteúdo?",
            options: ["Sim", "Não"],
            path: (params: any) => {
                if (params.userInput === "Sim") {
                    checkData.current = { content: "", context: "", rating: "" };
                    analysisResultRef.current = null;
                    return "content_submission";
                }
                return "rating_prompt";
            }
        },
        rating_prompt: {
            message: "Tudo bem 😊\n\nAntes de encerrar, você poderia avaliar meu atendimento de 0 a 5?",
            options: ["0", "1", "2", "3", "4", "5"],
            path: "rating_submission"
        },
        rating_submission: {
            transition: { duration: 0 },
            path: (params: any) => {
                checkData.current.rating = params.userInput;
                return "final_thanks";
            }
        },
        final_thanks: {
            message: "Muito obrigado pela sua avaliação ⭐\n\nSua participação ajuda a melhorar continuamente o serviço de checagem e combate à desinformação.",
            transition: { duration: 1000 },
            path: "social_invite"
        },
        social_invite: {
            message: "📲 Quer acompanhar mais conteúdos sobre combate à desinformação, educação midiática e checagem de fatos?\n\nSiga o projeto dAurora nas redes sociais:",
            options: ["Instagram", "LinkedIn", "Site", "Não, obrigado(a)"],
            path: (params: any) => {
                const input = params.userInput;
                if (input === "Instagram") {
                    window.open("https://www.instagram.com/daurora_ufg", "_blank");
                }
                if (input === "LinkedIn") {
                    window.open("https://www.linkedin.com/in/d-aurora-0208a1354/", "_blank");
                }
                if (input === "Site") {
                    window.open("https://www.daurora.inf.ufg.br/", "_blank");
                }
                if (input === "Não, obrigado(a)") {
                    return "closing_message";
                }
                return "social_invite";
            }
        },
        closing_message: {
            message: "Sempre que precisar, estarei disponível para ajudar 😊\n\nAté logo!",
            options: ["Reiniciar Atendimento"],
            path: "start"
        }
    };

    const settings = {
        general: {
            embedded: true,
            primaryColor: "#30B8BF",
            secondaryColor: "#FF6801",
            showFooter: false
        },
        header: {
            title: "dFrui",
            showAvatar: true,
        },
        botBubble: {
            simulateStream: false
        },
        notification: {
            disabled: true
        },
        chatInput: {
            enabledPlaceholderText: "Escreva aqui..."
        }
    };


    // styles here
    const styles = {
        headerStyle: {
            background: '#FF6801',
            color: '#ffffff',
            padding: '10px',
        },
        chatWindowStyle: {
            backgroundColor: '#f2f2f2',
        },
    };

    const themes = [
        { id: "chatbot_daurora", version: "0.1.0" }
    ];

    return (
        <ChatBot
            settings={settings}
            styles={styles}
            flow={flow}
            themes={themes}
        />
    );
};

export default ChatDFrui;
