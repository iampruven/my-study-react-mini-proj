import React from "react";

export default class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toggle:true, count:0};
    this.onToggle = this.onToggle.bind(this);
    this.increaseCount=this.increaseCount.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
    this.resetCount = this.resetCount.bind(this)
  }
    onToggle=()=>{
        this.setState({toggle: !this.state.toggle})
    }
    increaseCount(){
        this.setState({count: this.state.count +1})
    }
    decreaseCount(){
        this.setState({count: this.state.count-1})
    }
    resetCount(){
        this.setState({count:0})
    }
  render() {
    return (
      <div>
        <button onClick={this.onToggle}>{this.state.toggle?'On':'Off'}</button>
        <button onClick={this.increaseCount}>Increase</button>
        <button onClick={this.decreaseCount} >Decrease</button>
        <button onClick={this.resetCount}>Reset</button>
        <p>This is the count: {this.state.count}</p>
      </div>
    );
  }
}
