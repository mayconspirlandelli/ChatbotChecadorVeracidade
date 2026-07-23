import { MessageSquare, Headphones, Link2, Image } from 'lucide-react'

const categories = [
  {
    icon: MessageSquare,
    title: 'SMS e Mensagens',
    description: 'Mensagens suspeitas de golpe recebidas por SMS, WhatsApp ou outros aplicativos de mensagem.',
  },
  {
    icon: Headphones,
    title: 'Áudios e Ligações',
    description: 'Gravações de ligações fraudulentas, áudios com informações falsas ou tentativas de golpe.',
  },
  {
    icon: Link2,
    title: 'Links e URLs',
    description: 'Links suspeitos de phishing, sites falsos ou páginas que tentam roubar dados pessoais.',
  },
  {
    icon: Image,
    title: 'Imagens e Vídeos',
    description: 'Conteúdo visual manipulado, deepfakes ou imagens descontextualizadas para enganar.',
  },
]

export default function ReportarCategorias() {
  return (
    <section className="bg-cinza-claro py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <h2 className="text-3xl lg:text-[36px] font-bold text-cinza-escuro text-center mb-16">
          O que você pode reportar?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white rounded-lg p-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-shadow"
            >
              <div className="w-14 h-14 rounded-lg bg-laranja/10 flex items-center justify-center mb-4">
                <cat.icon className="w-7 h-7 text-laranja" />
              </div>
              <h3 className="text-cinza-escuro font-bold text-lg mb-3">{cat.title}</h3>
              <p className="text-cinza-medio text-sm leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
