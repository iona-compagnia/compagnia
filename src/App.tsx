import type { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Director from './pages/Director';
import Events from './pages/Events';
import Musicians from './pages/Musicians';
import Bio from './pages/Bio';
import Contact from './pages/Contact';
import './App.css';

const App: FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/director" element={<Director />} />
            <Route path="/events" element={<Events />} />
            <Route path="/musicians" element={<Musicians />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:musicianId" element={<Bio />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
