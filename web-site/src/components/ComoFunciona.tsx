import { Send, Brain, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: Send,
    title: 'Envie a postagem',
    description: 'Cole o texto, link, imagem ou áudio suspeito que deseja verificar na plataforma.',
  },
  {
    icon: Brain,
    title: 'Nossa IA analisa',
    description: 'Nossa inteligência artificial verifica a autenticidade e identifica padrões de desinformação.',
  },
  {
    icon: ShieldCheck,
    title: 'Receba orientação',
    description: 'Obtenha um relatório detalhado com o nível de risco e orientações de como proceder.',
  },
]

export default function ComoFunciona() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <h2 className="text-3xl lg:text-[36px] font-bold text-cinza-escuro text-center mb-16">
          Como funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-turquesa/10 flex items-center justify-center mb-6">
                <step.icon className="w-12 h-12 text-turquesa" />
              </div>
              <div className="text-turquesa font-bold text-sm mb-3">Passo {i + 1}</div>
              <h3 className="text-cinza-escuro font-bold text-lg mb-4">{step.title}</h3>
              <p className="text-cinza-medio text-sm leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
