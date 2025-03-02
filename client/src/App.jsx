/**
 * Important libraries and shit
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

/**
 * Page components
 */
import LandingPage from "./pages/LandingPage";
import StartGamePage from "./pages/StartGamePage";
import JoinGamePage from "./pages/JoinGamePage";
import PlayGamePage from "./pages/PlayGamePage";
import GameOverPage from "./pages/GameOverPage";

/**
 * Navbar
 */
import Navbar from "./components/nav-components/Navbar";

/**
 * Super stupid background
 */
import MatrixRipoffBackground from "./backgrounds/MatrixRipoffBackground";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Router>
        <MatrixRipoffBackground />
        <Navbar />
        <div className="mt-[15px] mb-[70px] w-[90vw] flex-1 overflow-auto mx-auto">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/start-game/:game-id" element={<StartGamePage/>} />
            <Route path="/join-game/:game-id" element={<JoinGamePage/>} />
            <Route path="/game-play/:game-id" element={<PlayGamePage/>} />
            <Route path="/game-over/:game-id" element={<GameOverPage/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};