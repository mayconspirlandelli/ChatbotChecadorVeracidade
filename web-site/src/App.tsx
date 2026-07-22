import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import ComoFunciona from './components/ComoFunciona'
import ReportarCategorias from './components/ReportarCategorias'
import Privacidade from './components/Privacidade'
import Comunidade from './components/Comunidade'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <ComoFunciona />
      <ReportarCategorias />
      <Privacidade />
      <Comunidade />
      <Footer />
    </div>
  )
}
