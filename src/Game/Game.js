import React from "react";
import "./Game.css";
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnA: ["sugar", "wells"],
      columB: ["bye", "ya", "hi", "sugar"],
      selectedValuesA: [],
      selectedValuesB: [],
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  onAddClick(ev) {
    // 1. add all items from selectedValuesA into columB
    this.setState({
      columnA: this.state.columnA.filter(
        (x) => !this.state.selectedValuesA.includes(x)
      ),
      columB: this.state.columB.concat(this.state.selectedValuesA),
      selectedValuesA: [],
    });
    // 2. remove selectedValuesA from columnA
    // 3. selectedValuesA = []
  }

  onRemoveClick(ev) {
    this.setState({
      columnA: this.state.columnA.concat(this.state.selectedValuesB),
      columB: this.state.columB.filter(
        (x) => !this.state.selectedValuesB.includes(x)
      ),
      selectedValuesB: [],
    });
  }

  render() {
    const colmnFirst = this.state.columnA.map((x, id) => {
      return (
        <option
          key={id}
          selected={this.state.selectedValuesA.includes(x)}
          value={x}
        >
          {x}
        </option>
      );
    });
    const colSec = this.state.columB.map((x, id) => {
      return (
        <option
          key={id}
          selected={this.state.selectedValuesB.includes(x)}
          value={x}
        >
          {x}
        </option>
      );
    });

    // Multi select example
    const selectOnChangeA = (e) => {
      const selectedItems = Array.from(e.target.selectedOptions).map(
        (x) => x.value
      );
        
      this.setState({selectedValuesA:selectedItems});
      
    };
    const selectOnChangeB = (e) => {
      const selectedItems = Array.from(e.target.selectedOptions).map(
        (x) => x.value
      );
      this.setState({selectedValuesB:selectedItems});
    };

    return (
      <section>
        <select multiple onChange={selectOnChangeA}>
          {colmnFirst}
        </select>

        
          <div>
            <div>
              <button disabled={!this.state.selectedValuesA.length}onClick={this.onAddClick}>Add</button>
            </div>
            <div>
              <button disabled={!this.state.selectedValuesB.length} onClick={this.onRemoveClick}>Remove</button>
            </div>
          </div>
        

        <select multiple onChange={selectOnChangeB}>
          {colSec}
        </select>
      </section>
    );
  }
}
