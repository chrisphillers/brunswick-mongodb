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

  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios
      .post("http://localhost:3002/api/putData", {
        id: idToBeAdded,
        message: message
      })
      .then(() => this.getDataFromDb());
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3002/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3002/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
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

  postOrder = finalOrder => {
    console.log({ finalOrder }, "postorder!!!");
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

        <h1 className="hotpink">HI THERE</h1>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li key={data.message}>
                  <span> id: </span> {dat.id} <br />
                  <span> data: </span>
                  {dat.message}
                </li>
              ))}
        </ul>
        <div>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div>
          <input
            type="text"
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div>
          <input
            type="text"
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;
