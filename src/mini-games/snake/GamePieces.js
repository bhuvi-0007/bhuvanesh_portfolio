import React, { useEffect, useRef, useState } from "react";

const GamePieces = (props) => {

    const canvasRef = useRef();
    const [snake_speed, setSnakeSpeed] = useState(12);
    const max_speed =24
    const [apple, setApple] = useState({ x: 180, y: 96 })
    const [snake, setSnake] = useState([{ x: 24, y: 12 }, { x: 12, y: 12 }])
    const [direction, setDirection] = useState("")
    console.log(direction)
    useEffect(() => {
        const canvas = canvasRef.current;
        const cts = canvas.getContext('2d')
        
        const drawSnake = () => {
            snake.forEach((snakePart,idx) => {
                cts.beginPath();
                cts.arc(snakePart.x, snakePart.y, 6, 0,2 * Math.PI)
                idx===0?cts.fillStyle = '#6CBB3C':cts.fillStyle = '#90EE90';
                cts.fill()
                cts.stroke()
                cts.closePath()
            })
        }
        const drawApple = () => {

            cts.beginPath();
            cts.arc(apple.x, apple.y, 6, 0, 2 * Math.PI)
            cts.fillStyle = 'red';
            cts.fill()
            cts.closePath()

        }
        const moveSnake = () => {
            if (direction) {
                setSnake((preSnake) => {
                    const newSnake = [...preSnake];
                    const newHead = { x: newSnake[0].x, y: newSnake[0].y }

                    for (let i = newSnake.length - 1; i > 0; i--) {
                        newSnake[i].x = newSnake[i - 1].x;
                        newSnake[i].y = newSnake[i - 1].y;
                    }

                    switch (direction) {
                        case 'right':
                            newHead.x += snake_speed
                            break
                        case 'left':
                            newHead.x -= snake_speed
                            break
                        case 'up':
                            newHead.y -= snake_speed
                            break
                        case 'down':
                            newHead.y += snake_speed
                            break;
                        default:
                            break
                    }
                    newSnake[0] = newHead
                    handleAppleCollision(newSnake)
                    handleWallCollision(newHead)
                    handleSelfcollision(newSnake)
                    return newSnake
                })
            }
        }
        const handleSelfcollision = ((newSnake) => {
            const snakeHead = newSnake[0]
            for (let i = 1; i < newSnake.length; i++) {
                if (snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y) {
                    props.onGameOver('self')
                }
            }
        })
        const handleWallCollision = ((newHead) => {
            if (newHead.x + snake_speed > canvas.width || newHead.x - snake_speed < 0 || newHead.y + snake_speed > canvas.height || newHead.y - snake_speed < 0) {
                props.onGameOver('wall')
            }
        })
        const handleAppleCollision = ((newSnake) => {
            const newHead = newSnake[0]
            if (newHead.x === apple.x && newHead.y === apple.y) {
                let newScore = props.score + 1
                props.setScore(newScore)
                 let newSnakeSpeed=snake_speed;
                // if(newScore%2===0 && snake_speed!==max_speed){
                //     newSnakeSpeed=snake_speed*2;
                //     setSnakeSpeed(snake_speed*2)
                //     console.log(newSnake)
                // }
                setApple(()=>{
                    let sd={
                        x: Math.floor(Math.random() * canvas.width / newSnakeSpeed) * newSnakeSpeed,
                        y: Math.floor(Math.random() * canvas.height / newSnakeSpeed) * newSnakeSpeed
                    }
                    if(newHead.x%newSnakeSpeed!==0 ){
                        console.log(JSON.stringify(sd),newSnakeSpeed)
                        sd.x += newHead.x%newSnakeSpeed
                        console.log(sd,newSnakeSpeed)
                    }
                    if(newHead.y%newSnakeSpeed!==0 ){
                        sd.y +=newHead.y%newSnakeSpeed
                        console.log(sd,newSnakeSpeed)
                    }
                    if(sd.x<newSnakeSpeed){
                        sd.x +=newSnakeSpeed
                    }
                    if(sd.x>(canvas.width -newSnakeSpeed)){
                        sd.x -=newSnakeSpeed
                    }
                    if(sd.y<newSnakeSpeed){
                        sd.y+=newSnakeSpeed
                    }
                    if(sd.y>(canvas.height -newSnakeSpeed)){
                        sd.y -=newSnakeSpeed
                    }
                    return sd
                    })

                newSnake.push({
                    x: newSnake[newSnake.length - 1].x,
                    y: newSnake[newSnake.length - 1].y
                })
                

            }
        })
        
        const interval = setInterval(() => {
            cts.clearRect(0, 0, canvas.width, canvas.height);
            drawSnake()
            drawApple()
            moveSnake()
        }, 100)

        return () => {
            clearInterval(interval);
        }
    }, [snake,direction])

    useEffect(() => {
        const handleKeypress = (e) => {
            if ((direction === "right" && e.key === "ArrowLeft") || (direction === 'left' && e.key === 'ArrowRight') || (direction === 'up' && e.key === 'ArrowDown') || (direction === 'down' && e.key === 'ArrowUp')) {
                return;
            }

            switch (e.key) {
                case "ArrowRight":
                    setDirection('right');
                    break;
                case "ArrowLeft":
                    setDirection('left');
                    break;
                case "ArrowUp":
                    setDirection('up');
                    break;
                case "ArrowDown":
                    setDirection('down');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeypress);
        return () => {
            window.removeEventListener("keydown", handleKeypress);
        };
    }, [direction]);

    return (
        <div>
            <canvas className="snake-console" ref={canvasRef} width={780} height={480}></canvas>
        </div>
    )
}

export default GamePieces;