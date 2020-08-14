import React from "react";
import "./PhoneBook.css";
export default class PhoneBook extends React.Component {
  state = {
    contact: [
      { id: 1, name: "Jill", phone: "(408)-550-5522" },
      { id: 2, name: "Capibara-san", phone: "123-000-1234" },
    ],
    newName: "",
    newPhone: "",
    editName: "jull2",
    editPhone: "",
    editMode: false,
  };

  updateName(name) {
    this.setState({ newName: name });
  }
  updatePhone(phone) {
    this.setState({ newPhone: phone });
  }
  updateEditMode = (id) => {
    let existingName = this.state.contact.filter((x) => x.id === id)[0].name;
    this.setState({ editMode: id, editName: existingName });
  };
  handleEditName = (newerName) => {
    this.setState({ editName: newerName });
  };
  handleSaveName = () => {
    // {...contact, name: this.state.editName}
    // take everything but change the name only
    let saveName = this.state.contact.map((contact) => {
      return contact.id === this.state.editMode
        ? { ...contact, name: this.state.editName }
        : contact;
    });
    this.setState({
      contact: saveName,
      editMode: false,
    });
  };

  handleDeleteContact=(id)=>{
    let newContact=this.state.contact.filter(contact=>{
      return contact.id !== id
    })
    this.setState({contact:newContact})
  }

  handleCancelEdit=()=>{
    this.setState({editMode:false})
  }
  onSubmitInfo(ev) {
    ev.preventDefault();

    let newContact = this.state.contact.concat({
      name: this.state.newName,
      phone: this.state.newPhone,
    });
    this.setState({ contact: newContact });
  }

  render() {
    console.log(this.state.editMode);
    const book = this.state.contact.map((x, id) => {
      return (
        <li key={id}>
          {this.state.editMode === x.id ? (
            <div>
              <input
                id="person-name"
                type="text"
                value={this.state.editName}
                onChange={(e) => this.handleEditName(e.target.value)}
              />
              <button onClick={this.handleSaveName}>Save</button>
              <button onClick={this.handleCancelEdit}>Cancel</button>
            </div>
          ) : (
              <span onClick={() => this.updateEditMode(x.id)}>{x.name}</span>             
          )}{" "}  
            <span onClick={() => this.updateEditMode(x.id)}>{x.phone}</span>
            <button onClick={()=>this.handleDeleteContact(x.id)}>Delete</button>
          
        </li>
      );
      //onClick takes in a function
    });
    return (
      <section>
        <form onSubmit={(ev) => this.onSubmitInfo(ev)}>
          <label htmlFor="person-name">Name</label>
          <input
            id="person-name"
            value={this.state.newName}
            onChange={(e) => this.updateName(e.target.value)}
            placeholder="input name here"
            type="text"
            name="person-name"
            required
          />
          <label htmlFor="contact-number">Contact Number</label>
          <input
            id="contact-number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            value={this.state.newPhone}
            onChange={(e) => this.updatePhone(e.target.value)}
            required
            name="contact-number"
          />
          <button>Add Contact</button>
        </form>
        <div>
          <ul className="no-bullet">{book}</ul>
        </div>
      </section>
    );
  }
}
