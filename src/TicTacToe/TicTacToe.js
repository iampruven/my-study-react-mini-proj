import React from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className="square"
        style={squareStyle}>
        <p>{this.props.children}</p>
      </div>
    );
  }
}

class Board extends React.Component {
  state={
    board:[
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    player:'X',
    winner:''
  }
  
  onClickReset=()=>{
    this.setState({winner:null, board:[[null, null, null],
      [null, null, null],
      [null, null, null]]})
  }

  checkWon=(board)=>{
    // let playerToken = board[row][col]; 
    //check row
    for(let row = 0; row <= 2;row++){
    let won = true;
      let item = board[row][0]
      for(let col = 1; col <=2;col++){
          if(item !== board[row][col]){
            won = false;
            break;
          }
      }
      if(won){
        return item;
      }
      
    }
    
  //check column
    for(let col = 0; col <= 2;col++){
      let won = true;
      let item = board[0][col]
      for(let row = 1; row <=2;row++){
          if(item !== board[row][col]){
            won = false;
            break;
          }
      }
      if(won){
        return item;
      }
      
    }
    
  //check diagonal start from left 

  let won = (board[0][0]!==null) && board[0][0] ===board[1][1] &&board[0][0]===board[2][2]
if(won){

  return board[0][0]
}
//check diagonal start from right
 won = (board[0][2]!==null) && board[0][2] ===board[1][1] &&board[0][2]===board[2][0]
if(won){

  return board[0][2]
}
  }

  onClickBox=(row, column)=>{
    console.log(row, column)
    if(this.state.board[row][column]){ return }
    let changePlayer = this.state.player==='X'? 'O':'X';
    let boardCP = [
      this.state.board[0].slice(),
      this.state.board[1].slice(),
     this.state.board[2].slice()
      ];
      console.log(boardCP)
  boardCP[row][column]= this.state.player

  if(this.checkWon(boardCP, column, row)){this.setState({winner:this.state.player})}
  

    this.setState({player:changePlayer, board:boardCP})
  }

  render() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>Next player: {this.state.player}</div>
        <div className="winner" style={instructionsStyle}>Winner: {this.state.winner}</div>
        <button style={buttonStyle} onClick={this.onClickReset}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
           {this.state.board[0].map((box,id)=><Square key={id} onClick={()=>this.onClickBox(0,id)}>{box}</Square>)}
          </div>
          <div className="board-row" style={rowStyle}>
           {this.state.board[1].map((box,id)=><Square key={id} onClick={()=>this.onClickBox(1,id)}>{box}</Square>)}
          </div>
          <div className="board-row" style={rowStyle}>
           {this.state.board[2].map((box,id)=><Square key={id} onClick={()=>this.onClickBox(2,id)}>{box}</Square>)}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);