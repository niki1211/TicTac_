import React, {Component} from 'react';
import './Board.css';
import Square from '../Square/Square';

class Board extends Component {

    renderSquare = (i) => {
        return <Square value = {this.props.squares[i]} 
                    onClick = {() => this.props.onClick(i)} line = {this.props.line && this.props.line.includes(i)}/>
    }

    render() {
      let k = 0, boardSize = 3;
      let row =[];
      let squares = [];
      while( k < boardSize ) {
        row = []
        for( let i = 0; i < boardSize; i++ ) {
          row.push(this.renderSquare(k * boardSize + i));
        }
        squares.push(<div key = {k} className='board-row'>{row}</div>);
        k++;
      }

      return (
        <div>
          {squares}
        </div>
      );
      }
}

export default Board;