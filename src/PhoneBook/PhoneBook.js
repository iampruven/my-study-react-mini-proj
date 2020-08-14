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
    editName: "",
    editPhone: "",
    editNameMode: false,
    editPhoneMode: false,
  };

  updateName(name) {
    this.setState({ newName: name });
  }
  updatePhone(phone) {
    this.setState({ newPhone: phone });
  }
  updateEditNameMode = (id) => {
    let existingName = this.state.contact.filter((x) => x.id === id)[0].name;
    // let existingPhone = this.state.contact.filter((x) => x.id === id)[0].phone;
    this.setState({ editNameMode: id, editName: existingName });
  };
  handleEditName = (newerName) => {
    this.setState({ editName: newerName });
  };
  handleEditPhone(newPhone) {
    this.setState({ editPhone: newPhone });
  }

  updateEditPhoneMode = (id) => {
    let existingPhone = this.state.contact.filter((x) => x.id === id)[0].phone;
    this.setState({ editPhoneMode: id, editPhone: existingPhone });
  };
  handleSaveName = () => {
    // {...contact, name: this.state.editName}
    // take everything but change the name only
    let saveName = this.state.contact.map((contact) => {
      return contact.id === this.state.editNameMode
        ? { ...contact, name: this.state.editName }
        : contact;
    });
    this.setState({
      contact: saveName,
      editNameMode: false,
    });
  };
  handleSavePhone = () => {
    let savePhone = this.state.contact.map((contact) => {
      return contact.id === this.state.editPhoneMode
        ? { ...contact, phone: this.state.editPhone }
        : contact;
    });
    this.setState({contact:savePhone, editPhoneMode:false})
  };
  handleDeleteContact = (id) => {
    let newContact = this.state.contact.filter((contact) => {
      return contact.id !== id;
    });
    this.setState({ contact: newContact });
  };

  handleNameCancelEdit = () => {
    this.setState({ editNameMode: false });
  };
  handlePhoneCancelEdit = () => {
    this.setState({ editPhoneMode: false });
  };
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
          {this.state.editNameMode === x.id ? (
            <div>
              <input
                id="person-name"
                type="text"
                required
                value={this.state.editName}
                onChange={(e) => this.handleEditName(e.target.value)}
              />
              <button onClick={this.handleSaveName}>Save</button>
              <button onClick={this.handleNameCancelEdit}>Cancel</button>
            </div>
          ) : (
            <span onClick={() => this.updateEditNameMode(x.id)}>{x.name}</span>
          )}{" "}
          {this.state.editPhoneMode === x.id ? (
            <div>
              <input
                id="contact-number"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
                required
                name="contact-number"
                value={this.state.editPhone}
                onChange={(e) => this.handleEditPhone(e.target.value)}
              />
              <button onClick={this.handleSavePhone}>Save</button>
              <button onClick={this.handlePhoneCancelEdit}>Cancel</button>
            </div>
          ) : (
            <span onClick={() => this.updateEditPhoneMode(x.id)}>
              {x.phone}
            </span>
          )}
          <button onClick={() => this.handleDeleteContact(x.id)}>Delete</button>
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
