import React from "react";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["chocolate", "cherries", "vanilla"],
      newItem: "",
      updateField: false, //or index
      editedItem: "", //content of edited input
    };
    this.handleUpdateField = this.handleUpdateField.bind(this);
    this.updateNewItem = this.updateNewItem.bind(this);
    this.updateListItem = this.updateListItem.bind(this);
  }

  updateNewItem = (item) => {
    console.log(item);
    console.log(this.state.items.concat(item));
    this.setState({ newItem: item });
  };
  updateListItem = () => {
    this.setState({
      items: this.state.items.concat(this.state.newItem),
      newItem: "",
    });
  };
  updateEditItem = (newItem) => {
    this.setState({ editedItem: newItem });
  };
  handleUpdateField(id) {
    this.setState({ updateField: id, editedItem: this.state.items[id] });
  }
  handleSaveField(place) {
    let newAdd = this.state.items.map((item, index) =>
      index === place ? this.state.editedItem : item
    );
    this.setState({ updateField: false, items: newAdd });
  }
  handleCancel() {
    this.setState({ updateField: false });
  }
  handleDelete(place) {
      let removeItem = this.state.items.filter((item, index)=>index!==place? item:'')
    this.setState({ items: removeItem});
  }

  render() {
    const listItems = this.state.items.map((item, id) => {
      return (
        <div>
          {this.state.updateField === id ? (
            <input
              id="new-edits"
              type="text"
              value={this.state.editedItem}
              onChange={(e) => this.updateEditItem(e.target.value)}
            />
          ) : (
            <li key={id}>{item}</li>
          )}
          {this.state.updateField === id ? (
            <div>
              <button onClick={() => this.handleSaveField(id)}>Save</button>
              <button onClick={()=>this.handleCancel()}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => this.handleUpdateField(id)}>Edit</button>
          )}
          <button onClick={() => this.handleDelete(id)}>Delete</button>
        </div>
      );
    });
    return (
      <section>
        <div>
          <input
            type="text"
            id="list-item"
            value={this.state.newItem}
            onChange={(e) => this.updateNewItem(e.target.value)}
          />
          <button onClick={this.updateListItem}>Submit</button>
        </div>
        <div>
          <p>Results</p>
          <ul>{listItems}</ul>
        </div>
      </section>
    );
  }
}
