import ChatBot from "react-chatbotify";
import "@/styles/chatbot.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef } from "react";

const ChatArgos = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const modelName = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

    // Estado para armazenar dados da checagem atual
    const checkData = useRef({
        content: "",
        context: "",
        rating: ""
    });

    const SYSTEM_MESSAGE = `Você é o Argos, um assistente especializado em checagem de fatos (fact-checking) do projeto dAurora.
Sua missão é analisar informações e determinar sua veracidade de forma objetiva e confiável.

Ao receber um conteúdo e seu contexto, você deve:
1. Avaliar se há evidências oficiais ou científicas.
2. Identificar se a informação está fora de contexto ou é manipulada.
3. Fornecer um veredito claro (VERÍDICO, INVERÍDICO, FORA DE CONTEXTO ou NÃO VERIFICÁVEL).
4. Gerar um link fictício no padrão https://daurora.com.br/checagem/[id] para a "análise completa".

Responda sempre em Português do Brasil, mantendo um tom profissional e prestativo.`;

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

Por favor, analise e formate a resposta conforme o padrão:
✅ Resultado da Checagem
[Sua análise aqui, destacando se há evidências oficiais e se há manipulação/descontextualização]

🔎 Confira a análise completa:
https://daurora.com.br/checagem/${Math.floor(Math.random() * 100000)}
`;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            await params.injectMessage(responseText);
        } catch (error: any) {
            console.error("Erro na checagem:", error);
            await params.injectMessage("Desculpe, tive um problema técnico ao analisar essa informação. Por favor, tente novamente em instantes.");
        }
    };

    const flow = {
        start: {
            message: "Olá! 👋\n\nEu sou o **Argos**, assistente inteligente de checagem de veracidade de informações.\n\nEstou aqui para ajudar você a verificar conteúdos suspeitos de forma simples, rápida e confiável.\n\n🔒 Este atendimento segue as diretrizes da LGPD (Lei Geral de Proteção de Dados). Seus dados serão utilizados apenas para fins de análise e melhoria do serviço, respeitando sua privacidade e segurança.\n\nPosso ajudar na checagem de:\n\n• Textos\n• Áudios\n• Vídeos\n• Imagens\n\nPor favor, envie o conteúdo que deseja verificar.",
            path: "content_submission"
        },
        content_submission: {
            transition: { duration: 0 },
            path: (params: any) => {
                if (!params.userInput.trim()) {
                    return "start";
                }
                checkData.current.content = params.userInput;
                return "ask_origin";
            }
        },
        ask_origin: {
            message: "Entendi! Para uma análise precisa, onde você recebeu essa informação? 📍",
            options: ["WhatsApp", "Instagram", "TikTok", "Facebook", "Portal de Notícias", "Outro"],
            path: (params: any) => {
                checkData.current.context = `Origem: ${params.userInput}. `;
                return "ask_source";
            }
        },
        ask_source: {
            message: "A mensagem cita alguma fonte ou órgão oficial? (Ex: Ministério da Saúde, G1, etc.) 🏛️",
            options: ["Sim", "Não", "Não sei informar"],
            path: (params: any) => {
                checkData.current.context += `Fonte citada: ${params.userInput}. `;
                return "ask_goal";
            }
        },
        ask_goal: {
            message: "O que você deseja verificar especificamente? 🎯",
            options: ["Veracidade (É verdade?)", "Contexto (Está fora de contexto?)", "Manipulação (Foi editado?)"],
            path: (params: any) => {
                checkData.current.context += `Objetivo: ${params.userInput}.`;
                return "processing_message";
            }
        },
        processing_message: {
            message: "Perfeito 👍\n\nEstou analisando o conteúdo enviado e verificando fontes confiáveis.\n\nIsso pode levar alguns instantes.",
            transition: { duration: 1000 },
            path: async (params: any) => {
                await handleGeminiCheck(params);
                return "validate_experience";
            }
        },
        validate_experience: {
            message: "A resposta atendeu sua expectativa sobre a checagem? 😊",
            options: ["Sim", "Não"],
            path: "new_request_check"
        },
        new_request_check: {
            message: "Fico feliz em ajudar 🙌\n\nVocê deseja verificar mais algum conteúdo?",
            options: ["Sim", "Não"],
            path: (params: any) => {
                if (params.userInput === "Sim") {
                    checkData.current = { content: "", context: "", rating: "" };
                    return "start";
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
            options: ["Instagram", "LinkedIn", "Site"],
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
                return "closing_message";
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
            primaryColor: "#3FB8AF",
            secondaryColor: "#FF7C33",
            showFooter: false
        },
        header: {
            title: "Argos - Checador dAurora",
            showAvatar: true,
            avatar: "https://daurora.com.br/wp-content/uploads/2024/03/cropped-favicon-daurora-192x192.png"
        },
        botBubble: {
            simulateStream: true
        }
    };

    const themes = [
        { id: "chatbot_daurora", version: "0.1.0" }
    ];

    return (
        <ChatBot
            settings={settings}
            flow={flow}
            themes={themes}
        />
    );
};

export default ChatArgos;
