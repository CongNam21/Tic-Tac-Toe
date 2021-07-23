import React, { Component } from 'react';
import Board from "./Board"

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber: 0,
            xIsNext: true, 
        };
    }    
    makeMove(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        
          }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),          
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,        
        });
        
    }
    async handleClick(i) {
      
        await this.makeMove(i);
        
       
        const squares = this.state.history[this.state.stepNumber].squares.slice();
        const bestSquare = findBestSquare(squares, this.state.xIsNext ? "X" : "O");
        if (bestSquare !== -1) {
          await this.makeMove(bestSquare); 
        }
      }
    

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const description = move
                ? "Go to move #" + move
                : "Go to game start";
            return (
                <li key={move}>
                    <button className="time-btn" onClick={() => this.jumpTo(move)}>
                        {description}
                    </button>
                </li>
            );
        });
        

        let status;
        if (winner) {
            status = winner === "Draw" ? winner : "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                <div className="status">{ status }</div>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>Time Travel</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }

    let checkNull = squares.some(function (item) {
        return item === null;
    });

    return checkNull ? null : 'Draw';
}
function isBoardFilled(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return false;
      }
    }
    return true;
  }

function findBestSquare(squares, player) {
  
  const opponent = player === 'X' ? 'O' : 'X';
  
  const minimax = (squares, isMax) => {
    const winner = calculateWinner(squares);
    
    
    if (winner === player) return { square: -1, score: 1 };
    
 
    if (winner === opponent) return { square: -1, score: -1 };
    
    
    if (isBoardFilled(squares)) return { square: -1, score: 0 };
    
 
    const best = { square: -1, score: isMax ? -100 : 100 };
    
    
    for (let i = 0; i < squares.length; i++) {
      
      if (squares[i]) {
        continue;
      }
      
      
      squares[i] = isMax ? player : opponent;
   
      const score = minimax(squares, !isMax).score;
   
      squares[i] = null;

      if (isMax) {
     
        if (score > best.score) {
          best.score = score;
          best.square = i;
        }
      } else {
     
        if (score < best.score) {
          best.score = score;
          best.square = i;
        }
      }
    }
    
  
    return best;
  };
  
  
  return minimax(squares, true).square;
}

export default Game;