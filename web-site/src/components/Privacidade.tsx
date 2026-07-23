import { Shield, Lock, Zap } from 'lucide-react'

const guarantees = [
  {
    icon: Shield,
    title: '100% Anônimo',
    description: 'Suas denúncias são totalmente anônimas. Nenhuma informação pessoal é compartilhada.',
  },
  {
    icon: Lock,
    title: 'Dados Protegidos',
    description: 'Utilizamos criptografia de ponta para garantir a segurança dos seus dados.',
  },
  {
    icon: Zap,
    title: 'Ação Rápida',
    description: 'Análise instantânea por IA com resultados em menos de 1 minuto.',
  },
]

export default function Privacidade() {
  return (
    <section className="bg-turquesa py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 text-center">
        <h2 className="text-3xl lg:text-[36px] font-bold text-white mb-20">
          Sua privacidade é garantida
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guarantees.map((item) => (
            <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-4">{item.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
