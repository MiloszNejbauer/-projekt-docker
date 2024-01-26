import { Square } from "./Square";
import { Snake } from "./Snake"
import React, { useState, useEffect } from 'react';
import { Food } from "./Food"

export const Board = ({ rows, columns, snakeCoordinates, foodCoordinates, snakeSize, prevSnakeCoordinates }) => {
    const generateEmptyArray = () => {
        const emptyArray = [];
        

        const checkForSnake = (i, j) => {
        //  return snakeCoordinates.row - (snakeSize - 1) === i
        return snakeCoordinates.row === i 
        && snakeCoordinates.column === j
        }

        const checkForBody = (i, j) => {
          if (snakeSize > 1) {
              for (let k = 0; k < prevSnakeCoordinates.length; k++) {
                  if (prevSnakeCoordinates[k].row === i && prevSnakeCoordinates[k].column === j) {
                      return true; // Jeśli znaleziono segment ciała, zwróć true
                  }
              }
          }
          return false; // Jeśli nie znaleziono segmentu ciała, zwróć false
      };

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                const isSnakeSegment = checkForSnake(i, j)
                const isFoodSegment = foodCoordinates.row === i && foodCoordinates.column === j;

                const isBodySegment = checkForBody(i , j)
                if (isFoodSegment) {
                    // Renderuj komponent Snake w miejscu segmentu węża
                    row.push(<Food key={`${i}-${j}`} />);
                }
                 else if (isSnakeSegment || isBodySegment) {
                    // Renderuj komponent Snake w miejscu segmentu węża
                    row.push(<Snake key={`${i}-${j}`} />);
                } else {
                    // Renderuj zwykły kwadrat
                    row.push(<Square key={`${i}-${j}`} />);
                }
            }
            emptyArray.push(row);
        }

        return emptyArray;
    };



    return (
        <div className="empty-array">
          {generateEmptyArray().map((row, rowIndex) => (
            <div key={rowIndex} className="empty-array-row">
              {row}
            </div>
          ))}
        </div>
      );
    };
  
  
  
