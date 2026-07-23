import { ArrowRight } from 'lucide-react'
import logoDenodare from '../assets/logo_denodare.svg'

function RiskGauge() {
  return (
    <div className="relative w-64 h-40">
      <svg viewBox="0 0 200 110" className="w-full h-full">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#E74C3C" strokeWidth="16" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 73 30" fill="none" stroke="#FFD700" strokeWidth="16" strokeLinecap="round" />
        <path d="M 73 30 A 80 80 0 0 1 127 30" fill="none" stroke="#4CAF50" strokeWidth="16" strokeLinecap="round" />
        <path d="M 127 30 A 80 80 0 0 1 180 100" fill="none" stroke="#FFD700" strokeWidth="16" strokeLinecap="round" />
        <line x1="100" y1="100" x2="60" y2="50" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="100" r="6" fill="#3D3D3D" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-semibold px-2">
        <span className="text-vermelho">Alto</span>
        <span className="text-amarelo">Médio</span>
        <span className="text-verde">Baixo</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="bg-fundo-hero text-fonte-titulo">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 flex flex-col lg:flex-row items-center gap-32">
        <div className=" text-left  flex flex-col sm:flex-row gap-4 justify-start py-8">
          <div>
            <h1 className="text-4xl lg:text-[56px] font-bold leading-tight py-4 mb-8 w-[200px] lg:w-[500px]">
              Proteja-se contra <span className="text-laranja">desinformação e fraudes digitais</span>
            </h1>
            <p className="text-fonte-titulo text-base lg:text-lg leading-relaxed py-4 mb-8 w-[300px] lg:w-[500px]">
              Recebeu uma mensagem, ligação ou link suspeito? Envie para o dEnodare. Nossa inteligência artificial analisa postagens e informa o nível de risco em menos de 1 minuto.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <img src={logoDenodare} alt="Logo dEnodare" className="w-48 h-auto" />
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <RiskGauge />
            <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Indicador de Confiança</span>
          </div>         
        </div>
      </div>
      <div className="bg-fundo-botao flex flex-col sm:flex-row gap-4 justify-start py-8">
          <button className="flex items-center justify-center gap-2 bg-cor-botao hover:bg-laranja-dark text-white font-semibold px-8 py-4 rounded transition-colors">
            Reportar Postagem Suspeita
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded hover:bg-white hover:text-turquesa transition-colors">
            Acompanhar Relato
          </button>
        </div>
    </section>
  )
}
