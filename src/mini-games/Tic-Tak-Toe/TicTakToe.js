import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import x from './../../image/X.png';
import o from './../../image/o.png';

const TicTacToe = () => {
  const navigate = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const [aiTurn, setAiTurn] = useState(false);
  const [winnerCard, setWinnerCard] = useState(null);
  const [singlePlayer, setSinglePlayer] = useState(true);
  const [grids, setGrids] = useState(new Array(9).fill(''));
  const [currentValueX, setCurrentValueX] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0 });
  const resultMap = { 'o': -1, 'x': 1, 'tie': 0 };

  useEffect(() => {
    const winner = checkWinner(grids);
    if (winner !== null) {
      setGameOver(true);
      setWinnerCard(winner);
      if (winner !== 'tie') {
        setScores(prevScores => ({
          ...prevScores,
          [winner]: prevScores[winner] + 1,
        }));
      }
    }
  }, [grids]);

  const handleClick = (idx) => {
    if (gameOver || aiTurn) return;
    const newGrids = [...grids];
    if (newGrids[idx] === '') {
      newGrids[idx] = currentValueX ? 'x' : 'o';
      setGrids(newGrids);
      if (!singlePlayer) {
        setCurrentValueX(prev => !prev);
      } else {
        setAiTurn(true);
        setTimeout(() => {
          bestMove(newGrids);
          setAiTurn(false);
        }, 250);
      }
    }
  };

  const bestMove = (newGrids) => {
    let bestScore = Infinity;
    let move;
    for (let i = 0; i < newGrids.length; i++) {
      if (newGrids[i] === '') {
        newGrids[i] = 'o';
        let score = minimax(newGrids, 0, true);
        newGrids[i] = '';
        if (score < bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    if (move !== undefined) {
      newGrids[move] = 'o';
      setGrids([...newGrids]);
      setCurrentValueX(true);
    }
  };

  const minimax = (newGrids, depth, isMaximizing) => {
    let result = checkWinner(newGrids);
    if (result !== null) {
      return resultMap[result] / (depth + 1);
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newGrids.length; i++) {
        if (newGrids[i] === '') {
          newGrids[i] = 'x';
          let score = minimax(newGrids, depth + 1, false);
          newGrids[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newGrids.length; i++) {
        if (newGrids[i] === '') {
          newGrids[i] = 'o';
          let score = minimax(newGrids, depth + 1, true);
          newGrids[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const checkWinner = (newGrids) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newGrids[a] && newGrids[a] === newGrids[b] && newGrids[a] === newGrids[c]) {
        return newGrids[a];
      }
    }

    if (newGrids.every(grid => grid !== '')) {
      return 'tie';
    }

    return null;
  };

  return (
    <>
      <HomeIcon 
        fontSize="large" 
        sx={{ color: 'white' }} 
        aria-label="home" 
        onClick={() => navigate(`/`)} 
        style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }} 
      />
      <div className="tictaktoe-container">
        <h1 className="game-title">Tic Tac Toe</h1>
        <div className="score-board">
          <p>Player X: {scores.x}</p>
          <p>Player O: {scores.o}</p>
        </div>
        <div className="tictaktoe">
          <div className="board">
            {grids.map((grid, idx) => (
              <div key={idx} className="cell" onClick={() => handleClick(idx)}>
                {grid === 'x' ? <img src={x} alt="X" /> : grid === 'o' ? <img src={o} alt="O" /> : ''}
              </div>
            ))}
          </div>
          {gameOver && (winnerCard === 'tie' ? <h3>The match is a draw!</h3> : <h3>The {winnerCard} won the match!!!</h3>)}
          <div className="controls">
            <Button 
              id="restartButton" 
              onClick={() => {
                setGrids(new Array(9).fill(''));
                setGameOver(false);
                setWinnerCard(null);
              }}
            >
              Restart
            </Button>
            <Button 
              id="setPlayerMode" 
              onClick={() => {
                setGrids(new Array(9).fill(''));
                setGameOver(false);
                setWinnerCard(null);
                setSinglePlayer(prev => {
                  if (!prev) setCurrentValueX(true);
                  return !prev;
                });
              }}
            >
              {singlePlayer ? `1P` : `2P`}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
