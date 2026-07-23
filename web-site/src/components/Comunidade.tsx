import { ArrowRight, Users } from 'lucide-react'

export default function Comunidade() {
  return (
    <section className="bg-laranja py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl lg:text-[36px] font-bold text-white mb-6 uppercase tracking-wide">
            Faça parte da nossa rede!
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
            Junte-se a milhares de colaboradores que já estão ajudando a combater a desinformação. 
            Colabore, ganhe recompensas e faça a diferença.
          </p>
          <button className="flex items-center justify-center gap-2 bg-white text-laranja font-semibold px-6 py-3 rounded hover:bg-white/90 transition-colors mx-auto lg:mx-0">
            Quero colaborar e ganhar recompensas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-shrink-0">
          <div className="w-56 h-56 rounded-full bg-white/20 flex items-center justify-center">
            <Users className="w-24 h-24 text-white" />
          </div>
        </div>
      </div>
    </section>
  )
}
