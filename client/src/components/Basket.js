import React from "react";

import "../styles/Basket.scss";
import cx from "classnames";

class Basket extends React.Component {
  state = { order: {} };

  render() {
    console.log(this.props.basket);

    const basketView = cx("hidden", { basket: this.props.showBasket });
    console.log(this.props.showBasket);
    return (
      <div className={basketView}>
        <h4 className="BasketCloser" onClick={() => this.props.closeBasket()}>
          X
        </h4>
        <ul className="basket__contents">
          {this.props.basket.map(item => {
            return (
              <li key={item.menuItemId}>
                <div className="basket__row">
                  <h2>{this.props.menu[item.menuItemId].name}</h2>
                  <div className="basket__order">
                    <button
                      className="orderbutton__plus"
                      onClick={() =>
                        this.props.basketReceiveAdd(item.menuItemId)
                      }
                    >
                      +
                    </button>

                    <h3>{item.quantity}</h3>
                    <button
                      className="orderbutton__minus"
                      onClick={() =>
                        this.props.basketReceiveRemove(item.menuItemId)
                      }
                    >
                      -
                    </button>
                  </div>
                  <h2 className="basket__price">
                    £{this.props.menu[item.menuItemId].price * item.quantity}
                  </h2>
                </div>
              </li>
            );
          })}
        </ul>
        <span>
          <h2>Delivery Charge</h2>
          <h2>£2.5</h2>
        </span>
        <span>
          <h2>Order Total</h2>
          {/* <h1>{this.props.calculate}</h1> */}
          {/* <h1>{this.props.menu[item.menuItemId].price * item.quantity}</h1> */}
        </span>
        <button onClick={() => this.props.receiveOrder(this.props.basket)}>
          Place Order
        </button>
      </div>
    );
  }
}

export default Basket;
