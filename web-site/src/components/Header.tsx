import { Search, Globe, Mail, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-24 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-laranja font-bold text-2xl">d</span>
          <span className="font-bold text-cinza-escuro text-lg">Aurora</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cinza-medio">
          <a href="#" className="hover:text-laranja transition-colors">O dAurora</a>
          <a href="#" className="hover:text-laranja transition-colors">Esclarecer Fatos e Ilícitos</a>
          <a href="#" className="hover:text-laranja transition-colors">Faça parte da nossa rede</a>
          <a href="#" className="hover:text-laranja transition-colors">Notícias</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Search className="w-5 h-5 text-cinza-medio cursor-pointer hover:text-laranja transition-colors" />
          <a href="#" className="text-cinza-medio hover:text-laranja transition-colors">
            <Globe className="w-5 h-5" />
          </a>
          <a href="#" className="text-cinza-medio hover:text-laranja transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <button
          className="md:hidden text-cinza-escuro"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-cinza-borda px-5 py-4 flex flex-col gap-4">
          <a href="#" className="text-sm font-medium text-cinza-medio hover:text-laranja">O dAurora</a>
          <a href="#" className="text-sm font-medium text-cinza-medio hover:text-laranja">Esclarecer Fatos e Ilícitos</a>
          <a href="#" className="text-sm font-medium text-cinza-medio hover:text-laranja">Faça parte da nossa rede</a>
          <a href="#" className="text-sm font-medium text-cinza-medio hover:text-laranja">Notícias</a>
          <div className="flex items-center gap-4 pt-2 border-t border-cinza-borda">
            <Globe className="w-5 h-5 text-cinza-medio" />
            <Mail className="w-5 h-5 text-cinza-medio" />
          </div>
        </div>
      )}
    </header>
  )
}
