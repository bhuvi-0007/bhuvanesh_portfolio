import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import GamePieces from "./GamePieces";

const Snake = (props) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snakehighscore')) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollisionType] = useState('');

  const handleGameOver = (type) => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakehighscore', score.toString());
    }
    setCollisionType(type);
  };

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeypress = (e) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame();
      }
    };
    window.addEventListener('keydown', handleKeypress);
    return () => {
      window.removeEventListener('keydown', handleKeypress);
    };
  }, [gameOver]);

  return (
    <div className="snake-container">
      <HomeIcon
        fontSize="large"
        aria-label="home"
        onClick={() => { navigate(`/`) }}
        style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}
      />
      <h1 className="game-title">Snake Game</h1>
      <h2>Score: {score}</h2>
      <h3>High Score: {highScore}</h3>
      {
        gameOver && (
          <div className="game-over">
            <p>Game Over! {collision === 'wall' ? "You bumped the wall" : "You ate yourself"}</p>
            <p>Please press Enter to reset the game</p>
          </div>
        )
      }
      {
        !gameOver && (
          <GamePieces
            score={score}
            setScore={setScore}
            highScore={highScore}
            setHighScore={setHighScore}
            onGameOver={(type) => handleGameOver(type)}
          />
        )
      }
    </div>
  );
};

export default Snake;
