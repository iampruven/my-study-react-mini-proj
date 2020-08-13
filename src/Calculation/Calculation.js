import React from "react";
import "./Calculation.css";
export default class Calculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstNum: null, secNum: null, type: "add" };
    this.updateFirstNum = this.updateFirstNum.bind(this);
    this.updateSecondNum = this.updateSecondNum.bind(this);
    this.updateCalcType = this.updateCalcType.bind(this);
  }
  updateFirstNum = (num1) => {
    this.setState({ firstNum: num1 });
  };
  updateSecondNum = (num2) => {
    this.setState({ secNum: num2 });
  };
  updateCalcType = (type) => {
    this.setState({ type: type });
  };

  doMath = () => {
    const firNum = this.state.firstNum;
    const secNum = this.state.secNum;
    
    if (firNum !== null && secNum !== null) {
      if (this.state.type === "add") {
        return firNum + secNum;
      } else if (this.state.type === "sub") {
        return firNum - secNum;
      } else if (this.state.type === "divide" ) {
          if(secNum ===0){
              return 'Not valid divisor'
          }
        return firNum % secNum;
      } else if (this.state.type === "multiply") {
        return firNum * secNum;
      }
    } 
  };
  render() {
    return (
      <section>
        <div>
          <input
            id="first-num"
            value={this.state.firstNum}
            onChange={(e) => this.updateFirstNum(parseInt(e.target.value))}
            type="number"
            required
          />
        </div>
        <div>
          <select
            onChange={(e) => this.updateCalcType(e.target.value)}
            className="calc"
            name="option"
          >
            <option value="add" selected>
              Addition
            </option>
            <option value="sub">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </div>
        <div>
          <input
            id="sec-num"
            value={this.state.secNum}
            onChange={(e) => this.updateSecondNum(parseInt(e.target.value))}
            type="number"
            required
          />
        </div>
        {/* <p>{this.state.firstNum && this.state.secNum ?this.state.sum}</p> */}
        <p>result: {this.doMath()}</p>
      </section>
    );
  }
}
