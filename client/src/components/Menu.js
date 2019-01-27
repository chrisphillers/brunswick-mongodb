import React from "react";
// import Basket from "./Basket";
// import MoreInfo from "./MoreInfo";

import "../styles/Menu.scss";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { basket: [] };
    this.getCourse = this.getCourse.bind(this);
    this.basketReceiveRemove = this.basketReceiveRemove.bind(this);
    this.basketReceiveAdd = this.basketReceiveAdd.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  basketReceiveAdd = id => {
    this.props.basketStatus();

    const existingItem = this.state.basket.find(element => {
      return element.menuItemId === id;
    });
    if (existingItem) {
      this.setState(
        {
          basket: this.state.basket.map(dish => {
            if (dish == existingItem) {
              return Object.assign({}, dish, { quantity: dish.quantity + 1 });
            } else {
              return dish;
            }
          })
        },
        () => console.log(this.state.basket)
      );
    } else {
      const item = { menuItemId: id, quantity: 1 };
      this.setState(
        {
          basket: this.state.basket.concat([item])
        },
        () => console.log(this.state.basket)
      );
    }
    this.calculate();
  };

  basketReceiveRemove(id) {
    const existingItem = this.state.basket.find(element => {
      return element.menuItemId === id;
    });
    if (existingItem) {
      this.setState(
        {
          basket: this.state.basket.map(dish => {
            if (dish == existingItem) {
              return Object.assign({}, dish, { quantity: dish.quantity - 1 });
            } else {
              return dish;
            }
          })
        },
        () => console.log(this.state.basket)
      );
    } else {
      const item = { menuItemId: id, quantity: 0 };
      this.setState(
        {
          basket: this.state.basket.concat([item])
        },
        () => console.log(this.state.basket)
      );
    }
    this.calculate();
  }

  getCourse(course) {
    console.log(this.props.menu);
    return this.props.menu
      .filter(item => item.type === course)
      .map(foodItem => {
        // console.log(this.state.basket);
        // let counter = typeof this.state.basket[foodItem.id].quantity === undefined ? 0 : this.state.basket[foodItem.id].quantity;
        //  const basketQuant =
        // let counter = typeof this.state.basket[foodItem.id] === undefined ? 0: this.state.basket[0].quantity;
        let counter =
          typeof this.state.basket[foodItem.id] === "undefined"
            ? 0
            : this.state.basket[foodItem.id].quantity;
        // console.log(this.state.basket[0].quantity);

        console.log(counter);
        // foodItem.id
        // const inBasket = order.items.length && order.items.map(item => item[0]).includes(menuItem.id);
        // const count = inBasket ? order.items.filter(item => item[0] === menuItem.id)[0][1] : 0;

        return (
          <li key={foodItem.id}>
            <div className="menuitems">
              <div className="menuitems__row">
                <h2>{foodItem.name}</h2>
                <div className="menuitems__order">
                  <button
                    className="orderbutton__plus"
                    onClick={() => this.basketReceiveAdd(foodItem.id)}
                  >
                    +
                  </button>
                  {/* <h3>0</h3> */}
                  <h3>{counter}</h3>

                  <button
                    className="orderbutton__minus"
                    onClick={() => this.basketReceiveRemove(foodItem.id)}
                  >
                    -
                  </button>
                </div>
              </div>
              <h3 className="menuitems__info">{foodItem.headline}</h3>
              <h2>{`£${foodItem.price}`}</h2>
            </div>
            <hr />
          </li>
        );
      });
  }

  calculate() {
    let delivery = 2.5;
    let calc = this.state.basket.map(order => {
      console.log("hi there", { order });
      console.log(this.props.menu[order.menuItemId]);
      // return parseInt(this.props.menu[order.menuItemId].price, 10 * order.quantity);
      return this.props.menu[order.menuItemId].price * order.quantity;
    });
    let calcTotal = calc.reduce((total, amount) => total + amount);

    //

    console.log("calculate", calc, calcTotal);
  }

  // calculate() {
  //   const menu = this.props.menu;
  //   console.log(menu);
  //   const calcTotal = this.state.basket
  //     .map(
  //       order =>
  //         menu.find(menuItem => menuItem.id === order[0]).price * order[1]
  //     )
  //     .reduce((total, amount) => total + amount);
  //   return calcTotal;
  //   console.log(calcTotal);
  // }

  render() {
    return (
      <div>
        <ul className="menu">
          <h1>BRUNCH</h1>
          {this.getCourse("brunch")}

          <h1>DRINKS</h1>
          {this.getCourse("drinks")}

          <h1>DESSERT</h1>
          {this.getCourse("dessert")}
        </ul>
        {/* <MoreInfo
          basket={this.state.basket}
          menu={this.props.menu}
          /> */}

        {/* <Basket
          basket={this.state.basket}
          menu={this.props.menu}
          receiveOrder={this.props.receiveOrder}
          basketReceiveRemove={this.basketReceiveRemove}
          basketReceiveAdd={this.basketReceiveAdd}
          calculate={this.calculate}
          closeBasket={this.props.closeBasket}
          showBasket={this.props.showBasket}
          basketStatus={this.basketStatus}
        /> */}
      </div>
    );
  }
}

export default Menu;
