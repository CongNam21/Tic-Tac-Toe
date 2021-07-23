import React, { Component } from 'react';
import Square from "./Square"

class Board extends Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
           
        );
    }
    render() {
        return (
            <div>
              <div className="board-row" >
                 {
                        this.props.squares.map((square,i) =>this.renderSquare(i) )
                    }                                                       
              </div>      
              </div>        
                                                   
        );
    }
}



export default Board;