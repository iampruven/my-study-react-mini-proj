import React from "react";

export default class PhoneBook extends React.Component {
  state = {
    names: ["Jill"],
    phoneNum: ["(408)-550-5522"],
    newName:'',
    newContact:'',
  };
  updateName(name){
      this.setState({newName:name})
  }
  render() {
    return (
      <section>
        <form>
          <label htmlFor="person-name">Name</label>
          <input id="person-name" value={this.state.newName} onChange={e=>this.updateName(e.target.value)} placeholder="input name here" type="text" name="person-name" />
          <label htmlFor="contact-number">Contact Number</label>
          <input
            id="contact-number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            requiredname="contact-number"
          />
          <button>Add Contact</button>
        </form>
      </section>
    );
  }
}
