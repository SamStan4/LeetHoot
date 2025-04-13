/**
 * Important libraries and shit
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

/**
 * Page components
 */
import LandingPage from "@pages/LandingPage";
import StartGamePage from "@pages/StartGamePage";
import JoinGamePage from "@pages/JoinGamePage";
import PlayGamePage from "@pages/PlayGamePage";
import EnterPlayerNamePage from "@pages/EnterPlayerNamePage";
import NotFoundPage from "@pages/NotFoundPage";
import RunGamePage from "@pages/RunGamePage";
import AdminPage from "@pages/AdminPage";
/**
 * Navbar
 */
import Navbar from "@components/nav-components/Navbar";

/**
 * Super stupid background
 */
import MatrixRipoffBackground from "@backgrounds/MatrixRipoffBackground";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Router>
        <MatrixRipoffBackground />
        <Navbar />
        <div className="mt-[15px] mb-[70px] w-[90vw] flex-1 overflow-auto mx-auto">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/start-game" element={<StartGamePage/>} />
            <Route path="/join-game" element={<JoinGamePage/>} />
            <Route path="/play-game/:game-id/:player-name" element={<PlayGamePage/>} />
            <Route path="/enter-player-name/:game-id" element={<EnterPlayerNamePage/>} />
            <Route path="run-game/:game-id" element={<RunGamePage/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};