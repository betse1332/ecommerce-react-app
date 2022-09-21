import React, { Component } from "react";
import { circleCart } from "../../assets";
import "./Product.style.css";
class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
    };
  }

  handleMouseHovering = () => {
    this.setState((prevState) => ({
      isHovering: !prevState.isHovering,
    }));
  };

  render() {
    const { coverImage, productName, productPrice } = this.props;
    const { isHovering } = this.state;
    console.log(productPrice);
    return (
      <div
        className="product"
        onMouseOver={this.handleMouseHovering}
        onMouseOut={this.handleMouseHovering}
      >
        <img className="product--img" src={coverImage} alt={productName} />
        {isHovering && (
          <div className="product--cart">
            <img src={circleCart} alt="cirlce-cart" />
          </div>
        )}
        <span className="product--description">
          <p className="product--name">{productName}</p>
          <p className="product--price">
            {productPrice.currency.symbol}
            {productPrice.amount}
          </p>
        </span>
      </div>
    );
  }
}

export default Product;
