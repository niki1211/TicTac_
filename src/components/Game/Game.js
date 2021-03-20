import React from 'react';
import './Game.css';
import Board from '../Board/Board';
import calculateWinner from '../calculateWinner';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history : [{squares : Array(9).fill(null)},],
      stepNumber : 0,
      xIsNext : true,
    }
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history : history.concat([{squares : squares,}]),
      stepNumber : history.length,
      xIsNext : !this.state.xIsNext,
    })
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber : step,
      xIsNext : (step % 2) === 0,
    })
  }

  // toggleMoves = () => {
  //   if (calculateWinner(squares)) {
      
  //   }
  // }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      let winner;
      let line;
      if(calculateWinner(current.squares))
      {
        line = calculateWinner(current.squares).slice();
        winner = current.squares[line.slice(0,1)];
      }
      else 
      {
        winner = null;
        line = null;
      }

      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick = {() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      })

      let tStatus;
      if(winner)
        tStatus = 'Winner: ' + winner;
      else
      if(this.state.stepNumber === 9)
        tStatus = 'It is a Draw Match!!';
      else
      if(this.state.stepNumber !== 9)
        tStatus = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');


      return (
        <div className="game">
          <div className="game-board">
            <Board squares = {current.squares} onClick = {(i) => this.handleClick(i)} line = {this.line}/>
          </div>
          <div className="game-info">
            <div>{tStatus}</div>
            <ol>{moves}</ol>
            <button onClick = {() => this.toggleMoves}>To reverse the order of moves</button>
          </div>
        </div>
      );
    }
  }

  export default Game;