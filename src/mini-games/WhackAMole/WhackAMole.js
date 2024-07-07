import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import hole from './hole.png';
import mole from './mole.png';
import bomb from './bomb.png';

const WhackAMole = (props) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('whackamolehighscore')) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [moles, setMoles] = useState(new Array(9).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      const randombombIndex = Math.floor(Math.random() * moles.length);
      if (randombombIndex !== randomIndex) {
        updateMoles(randombombIndex, 2);
      }
      updateMoles(randomIndex, 1);
      setTimeout(() => {
        updateMoles(randomIndex, 0);
        updateMoles(randombombIndex, 0);
      }, 1000);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

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

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
  };

  const wackMole = (index, isMole) => {
    if (isMole === 0) return;
    if (isMole === 2) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('whackamolehighscore', score.toString());
      }
      return;
    }
    updateMoles(index, 0);
    setScore((prescore) => prescore + 1);
  };

  const updateMoles = (index, value) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = value;
      return newMoles;
    });
  };

  return (
    <div className="whackamole-container">
      <HomeIcon
        fontSize="large"
        aria-label="home"
        onClick={() => { navigate(`/`); }}
        style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}
      />
      <h1 className="game-title">Whack-A-Mole</h1>
      <h2>Score: {score}</h2>
      <h3>High Score: {highScore}</h3>
      {gameOver && (
        <div className="game-over">
          <p>Game Over!</p>
          <p>Please press Enter to reset the game</p>
        </div>
      )}
      {!gameOver && (
        <div className="grid">
          {moles.map((isMole, idx) => (
            <img key={idx} className="mole" src={isMole === 0 ? hole : isMole === 1 ? mole : bomb} onClick={() => wackMole(idx, isMole)} alt="grid element" />
          ))}
        </div>
      )}
    </div>
  );
};

export default WhackAMole;
