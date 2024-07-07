import { useEffect, useRef } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Resume from './Components/Resume';
import MiniProject from './Components/MiniProject';
import Snake from './mini-games/snake/Snake';
import WhackAMole from './mini-games/WhackAMole/WhackAMole';
import TicTacToe from './mini-games/Tic-Tak-Toe/TicTakToe';
import Contact from './Components/Contact';

function ScrollToComponent() {
  const location = useLocation();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const resumeRef = useRef(null);
  const miniProjectRef = useRef(null);
  const contactRef =useRef(null)

  useEffect(() => {
    switch (location.pathname) {
      case '/about':
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case '/resume':
        resumeRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case '/mini-project':
        miniProjectRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case '/contact':
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        homeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div>
      <div ref={homeRef}>
        <Home />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={resumeRef}>
        <Resume />
      </div>
      <div ref={miniProjectRef}>
        <MiniProject />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ScrollToComponent />} />
          <Route path="/about" element={<ScrollToComponent />} />
          <Route path="/resume" element={<ScrollToComponent />} />
          <Route path="/mini-project" element={<ScrollToComponent />} />
          <Route path="/contact" element={<ScrollToComponent />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/whackamole" element={<WhackAMole />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
