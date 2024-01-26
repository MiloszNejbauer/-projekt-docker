import React, { useState, useEffect } from 'react';
import { Container } from '../Utils/Container';
import { Board } from '../GameComponents/Board';

export const GamePage = () => {
    const rows = 40;
    const columns = 30;
    const [snakeCoordinates, setSnakeCoordinates] = useState({ row: 10, column: 15 });
    const [prevSnakeCoordinates, setPrevSnakeCoordinates] = useState([{ row: null, column: null }]);
    const [foodCoordinates, setFoodCoordinates] = useState({ row: 20, column: 1 });
    const [isSnakeOutOfBoard, setIsSnakeOutOfBoard] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [lastPressedKey, setLastPressedKey] = useState(null);
    const [snakeSize, setSnakeSize] = useState(1);
    const [checkable, setCheckable] = useState(true)
    const [score, setScore] = useState(0);

    useEffect(() => {
        let intervalId;

        const handleGameLoop = () => {
            setSnakeCoordinates((prevCoordinates) => {
                switch (lastPressedKey) {
                    case 'ArrowLeft':
                        return { ...prevCoordinates, row: prevCoordinates.row - 1 };
                    case 'ArrowRight':
                        return { ...prevCoordinates, row: prevCoordinates.row + 1 };
                    case 'ArrowUp':
                        return { ...prevCoordinates, column: prevCoordinates.column - 1 };
                    case 'ArrowDown':
                        return { ...prevCoordinates, column: prevCoordinates.column + 1 };
                    default:
                        return prevCoordinates;
                }
            });
        };

        intervalId = setInterval(handleGameLoop, 200);

        return () => {
            clearInterval(intervalId);
        };
    }, [lastPressedKey]);

    const checkSelfCollision = () => {
        if (snakeSize > 3 && !checkable) {
            const head = { row: snakeCoordinates.row, column: snakeCoordinates.column };
            let collisionCount = 0;
          
            prevSnakeCoordinates.forEach((segment) => {
                if (segment.row === head.row && segment.column === head.column) {
                    collisionCount++;
                }
            });
    
            return collisionCount > 1; 
        } else if (snakeSize > 3 && checkable) {
            const head = { row: snakeCoordinates.row, column: snakeCoordinates.column };
            let foundCollision = false;
    
            prevSnakeCoordinates.forEach((segment) => {
                if (segment.row === head.row && segment.column === head.column) {
                    foundCollision = true;

                }
            });
    
            return foundCollision;
        }
        return false;
    };

    useEffect(() => {
       const handleKeyDown = (event) => {
    const validDirections = {
        ArrowLeft: 'ArrowRight',
        ArrowRight: 'ArrowLeft',
        ArrowUp: 'ArrowDown',
        ArrowDown: 'ArrowUp',
    };

    if (validDirections[event.key] !== lastPressedKey) {
        setLastPressedKey(event.key);
    }
};

        const checkSnakeOutOfBoard = () => {
            setIsSnakeOutOfBoard(
                snakeCoordinates.row === rows||
                snakeCoordinates.column === columns||
                snakeCoordinates.row === -1 ||
                snakeCoordinates.column === -1
            );
        };

        const checkFoodCollision = () => {
            if (snakeCoordinates.row === foodCoordinates.row && snakeCoordinates.column === foodCoordinates.column) {
                generateNewFoodCoordinates();
                setCheckable(false)
                setScore(score + 100); // Dodaj 100 do wyniku po zjedzeniu jedzenia
                setSnakeSize((prevSize) => prevSize + 1);
                setTimeout(() => {
                    setCheckable(true)
                }, (1000 * snakeSize) / 2)
            }
        };


        const generateNewFoodCoordinates = () => {
            const newFoodCoordinates = {
                row: Math.floor(Math.random() * rows),
                column: Math.floor(Math.random() * columns),
            };
            setFoodCoordinates(newFoodCoordinates);
        };

        checkSnakeOutOfBoard();
        checkFoodCollision();

        if (isSnakeOutOfBoard || checkSelfCollision()) {
            setGameOver(true);
            console.log("gameover")
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [snakeCoordinates, isSnakeOutOfBoard, foodCoordinates]);

   

    useEffect(() => {
        setPrevSnakeCoordinates((prevCoordinates) => {
            const newCoordinates = [...prevCoordinates];
            newCoordinates.push({ row: snakeCoordinates.row, column: snakeCoordinates.column });

            if (newCoordinates.length > snakeSize) {
                newCoordinates.shift();
            }

            return newCoordinates;
        });

        console.log("CORD",snakeCoordinates);
        console.log("PREV",prevSnakeCoordinates);
    }, [snakeCoordinates, snakeSize]);


    return (
        <>
          <div style={{ textAlign: 'center', margin: '2vh' }}><h1>SCORE</h1>: {score} </div>
            <Container>
                {gameOver ? <p>Game Over</p> : <Board rows={rows} columns={columns} snakeCoordinates={snakeCoordinates} foodCoordinates={foodCoordinates} snakeSize={snakeSize} prevSnakeCoordinates={prevSnakeCoordinates} />}
            </Container>
        </>
    );
};