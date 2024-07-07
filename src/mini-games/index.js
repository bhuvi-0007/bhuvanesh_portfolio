import whackamole from "./WhackAMole/WhackAMole";
import snake from "./snake/Snake";
import tictaktoe from "./Tic-Tak-Toe/TicTakToe";

const controls={
    whackamole,
    snake,
    tictaktoe
}

export const games =[
    {
        "name":'whackamole',
        "description":"A Fun filled Whack A Mole game",
        "route":"whackamole"
    },{
        "name":'snake',
        "description":"A Classic Snake game",
        "route":"snake"
    },{
        "name":'tictaktoe',
        "description":"Tic Tac Toe game with both single player with computer and 2 player",
        "route":"tictactoe"
    }
]

export default controls;