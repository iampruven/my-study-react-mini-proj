import React from "react";
import "./PhoneBook.css";
export default class PhoneBook extends React.Component {
  state = {
    contact: [
      { name: "Jill", phone: "(408)-550-5522" },
      { name: "Capibara-san", phone: "123-000-1234" },
    ],
    newName: "",
    newPhone: "",
  };
  updateName(name) {
    this.setState({ newName: name });
  }
  updatePhone(phone) {
    this.setState({ newPhone: phone });
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
    const book = this.state.contact.map((x, id) => {
      return (
        <li key={id}>
          {x.name} {x.phone}
        </li>
      );
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
