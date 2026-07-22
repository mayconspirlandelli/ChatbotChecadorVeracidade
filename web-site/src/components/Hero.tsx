import { ArrowRight } from 'lucide-react'

function RiskGauge() {
  return (
    <div className="relative w-48 h-28">
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
    <section className="bg-turquesa text-white">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-24 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl lg:text-[48px] font-bold leading-tight mb-6">
            Proteja-se contra <span className="text-laranja">desinformação</span> e fraudes digitais
          </h1>
          <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Plataforma inteligente de análise e combate a fake news, golpes e ilícitos digitais. 
            Denuncie, verifique e proteja-se com tecnologia de ponta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="flex items-center justify-center gap-2 bg-laranja hover:bg-laranja-dark text-white font-semibold px-6 py-3 rounded transition-colors">
              Reportar Postagem Suspeita
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-turquesa transition-colors">
              Acompanhar Relato
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <RiskGauge />
          <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Indicador de Confiança</span>
        </div>
      </div>
    </section>
  )
}
