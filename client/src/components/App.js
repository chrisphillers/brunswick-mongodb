// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import Menu from "./Menu";
import Nav from "./Nav";
import "../styles/App.scss";

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    menuItems: [],
    customerDetails: {
      name: "Chris",
      address: "Dekker House",
      postcode: "E8 3FS",
      email: "chrisphillers@gmail.com",
      phone: "07714205581"
    },
    showBasket: false,
    basketStatus: false
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("http://localhost:3002/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  basketStatus = () => {
    this.setState({ basketStatus: true });
  };

  openBasket = () => {
    this.setState({ showBasket: true });
  };

  closeBasket = () => {
    this.setState({ showBasket: false });
  };

  receiveOrder = orderBasket => {
    const finalOrder = {
      items: orderBasket,
      ...this.state.customerDetails
    };
    console.log({ finalOrder });
    this.postOrder(finalOrder);
  };

  postOrder = currentOrder => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios
      .post("http://localhost:3002/api/putData", {
        // id: idToBeAdded,
        order: currentOrder
      })
      .then(data => {
        console.log(data);
        alert("15 mins to Kale o'clock!");
      })
      .then(() => this.getDataFromDb());
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Nav
          openBasket={this.openBasket}
          basketStatus={this.state.basketStatus}
        />
        <div className="main">
          <div className="header" />
        </div>

        <Menu
          menu={data}
          receiveOrder={this.receiveOrder}
          closeBasket={this.closeBasket}
          showBasket={this.state.showBasket}
          basketStatus={this.basketStatus}
        />
      </div>
    );
  }
}

export default App;
