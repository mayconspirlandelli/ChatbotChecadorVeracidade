import './App.css';
import IframePage from "#components/IframePage";
import RelatorioPage from "#components/RelatorioPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IframePage />} />
        <Route path="/relatorio" element={<RelatorioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
