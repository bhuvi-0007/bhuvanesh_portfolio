import React from 'react';
import controls, { games } from '../mini-games';
import { useNavigate } from "react-router-dom";
import snake from '../image/Snake.png';
import whackamole from '../image/WhackAMole.png';
import tictactoe from '../image/TicTacToe.png';

const MiniProject = () => {
    const navigate = useNavigate();

    return (
        <section id='miniproject'>
            <div>
                <h5>PORTFOLIO</h5>
                <h2>Check out some of my Mini Projects</h2>
            </div>
            <div className="image-grid">
                {
                    games.map((game, idx) => (
                        <div key={idx} className={`image-container ${games.length % 2 !== 0 && idx === games.length - 1 ? 'single' : ''}`}  onClick={()=>{navigate(`/${game.route}`)}}>
                            <div className="image-wrapper">
                                <img className='game-image' src={game.name === 'snake' ? snake : game.name === 'whackamole' ? whackamole : tictactoe} />
                                <div className="overlay">
                                    <div className="text">{game.description}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default MiniProject;
