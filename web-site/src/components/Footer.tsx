export default function Footer() {
  return (
    <footer className="bg-cinza-footer text-white py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-bold text-base mb-4">Sobre a plataforma</h4>
          <p className="text-white/60 text-sm leading-relaxed">
            O dAurora é uma plataforma de elucidação de fatos e ilícitos digitais, 
            utilizada para proteção contra desinformação e fraudes online.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-base mb-4">Links úteis</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><a href="#" className="hover:text-laranja transition-colors">Termos de uso</a></li>
            <li><a href="#" className="hover:text-laranja transition-colors">Política de privacidade</a></li>
            <li><a href="#" className="hover:text-laranja transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-laranja transition-colors">Contato</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-4">Transparência</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><a href="#" className="hover:text-laranja transition-colors">Relatórios de impacto</a></li>
            <li><a href="#" className="hover:text-laranja transition-colors">Código de conduta</a></li>
            <li><a href="#" className="hover:text-laranja transition-colors">Dados abertos</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-laranja font-bold text-xl">d</span>
          <span className="font-bold text-base">Aurora</span>
        </div>
        <p className="text-white/40 text-xs">
          &copy; 2026 dAurora. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
