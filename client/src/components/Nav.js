import React from "react";

import "../styles/Nav.scss";
import basketfullimage from "../img/basket_full.png";
import basketimage from "../img/basket.png";
import logoimage from "../img/logo.png";

const Nav = props => {
  let basketFull = props.basketStatus === true ? basketfullimage : basketimage;

  return (
    <div className="nav">
      <img className="nav__logo" src={logoimage} alt="logo-alt" />
      <img
        className="nav__basket"
        alt="basket-alt"
        onClick={() => props.openBasket()}
        src={basketFull}
      />
    </div>
  );
};

export default Nav;
