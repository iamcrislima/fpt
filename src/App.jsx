import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import { SportProvider, useSport } from './context/SportContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SportSelection from './pages/SportSelection/SportSelection'
import Login from './pages/Login/Login'
import Painel from './pages/Painel/Painel'
import Perfil from './pages/Perfil/Perfil'
import Pagamentos from './pages/Pagamentos/Pagamentos'
import MeusTorneios from './pages/MeusTorneios/MeusTorneios'
import Home from './pages/Home'
import FacaParte from './pages/FacaParte'
import Torneios from './pages/Torneios'
import TorneioDetalhe from './pages/TorneioDetalhe'
import TorneioInscrever from './pages/TorneioInscrever'
import Ranking from './pages/Ranking'
import Regras from './pages/Regras/Regras'
import Transparencia from './pages/Transparencia/Transparencia'
import FaleConosco from './pages/FaleConosco/FaleConosco'
import Historia from './pages/Historia/Historia'
import Artigo from './pages/Artigo/Artigo'
import DemonstrativoFinanceiro from './pages/DemonstrativoFinanceiro/DemonstrativoFinanceiro'
import AtasReuniao from './pages/AtasReuniao/AtasReuniao'
import Regulamento from './pages/Regulamento/Regulamento'
import Calendario from './pages/Calendario/Calendario'
import FAQ from './pages/FAQ/FAQ'
import AFederacao from './pages/AFederacao/AFederacao'
import Filiados from './pages/Filiados/Filiados'
import ClubesFiliados from './pages/ClubesFiliados/ClubesFiliados'
import Noticias from './pages/Noticias/Noticias'

// Redirects to sport home if already chosen, otherwise shows selection screen
function SportGate() {
  const saved = localStorage.getItem('fpt_sport')
  if (saved === 'bt' || saved === 'tennis') {
    return <Navigate to={`/${saved}`} replace />
  }
  return <SportSelection />
}

// Wrapper rendered for /:sport/* — validates sport, syncs context, renders layout
function SportLayout() {
  const { sport: urlSport } = useParams()
  const { setSport } = useSport()

  const isValid = urlSport === 'bt' || urlSport === 'tennis'

  // URL is source of truth — sync to context + localStorage on mount/change
  // Must be called unconditionally (Rules of Hooks)
  useEffect(() => {
    if (isValid) setSport(urlSport)
  }, [urlSport, isValid]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isValid) return <Navigate to="/" replace />

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="faca-parte" element={<FacaParte />} />
        <Route path="torneios" element={<Torneios />} />
        <Route path="torneios/:id" element={<TorneioDetalhe />} />
        <Route path="torneios/:id/inscrever" element={<TorneioInscrever />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="regras" element={<Regras />} />
        <Route path="transparencia" element={<Transparencia />} />
        <Route path="fale-conosco" element={<FaleConosco />} />
        <Route path="historia" element={<Historia />} />
        <Route path="artigos/:slug" element={<Artigo />} />
        <Route path="demonstrativo-financeiro" element={<DemonstrativoFinanceiro />} />
        <Route path="atas-reuniao" element={<AtasReuniao />} />
        <Route path="regulamento" element={<Regulamento />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="a-federacao" element={<AFederacao />} />
        <Route path="filiados" element={<Filiados />} />
        <Route path="clubes-filiados" element={<ClubesFiliados />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="painel" element={<Painel />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="pagamentos" element={<Pagamentos />} />
        <Route path="meus-torneios" element={<MeusTorneios />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SportProvider>
        <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Landing: show selection or redirect to saved sport */}
            <Route path="/" element={<SportGate />} />
            {/* Login — outside sport prefix, no navbar/footer */}
            <Route path="/login" element={<Login />} />
            {/* All sport-prefixed routes */}
            <Route path="/:sport/*" element={<SportLayout />} />
            {/* Anything else → selection */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
        </ThemeProvider>
      </SportProvider>
    </BrowserRouter>
  )
}
