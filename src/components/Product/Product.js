import React, { Component } from "react";
import "./Product.style.css";
class Product extends Component {
  render() {
    const { coverImage, productName, productPrice } = this.props;
    console.log(productPrice);
    return (
      <div className="product">
        <img className="product--img" src={coverImage} alt={productName} />

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
