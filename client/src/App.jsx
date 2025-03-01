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

import CoolHackerBackground from "./backgrounds/MatrixRipoffBackground";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoolHackerBackground/>} />
        <Route path="/start-game/:game-id" element={<StartGamePage/>} />
        <Route path="/join-game/:game-id" element={<JoinGamePage/>} />
        <Route path="/game-play/:game-id" element={<PlayGamePage/>} />
        <Route path="/game-over/:game-id" element={<GameOverPage/>} />
      </Routes>
    </Router>
  );
};