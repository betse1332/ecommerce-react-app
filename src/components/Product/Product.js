import React, { Component } from "react";
import apolloClient from "../../apollo_config";
import { circleCart } from "../../assets";
import { GET_PRODUCTS_FROM_CATEGORY } from "../Category/queries";

import "./Product.style.css";
import { GET_PRODUCT_BY_ID } from "./queries";
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
  itemAddToCartHandler = () => {
    const { handleAddItemToCart, id } = this.props;
    

    apolloClient
      .query({
        query: GET_PRODUCT_BY_ID,
        variables: { id },
      })
      .then(({ data, error }) => {
        const {product}= data
        console.log(product);
        handleAddItemToCart(product)
      });
  };

  render() {
    const { coverImage, productName, productPrice } = this.props;
    const { isHovering } = this.state;

    return (
      <div
        className="product"
        onMouseOver={this.handleMouseHovering}
        onMouseOut={this.handleMouseHovering}
      >
        <img className="product--img" src={coverImage} alt={productName} />
        {isHovering && (
          <div className="product--cart" onClick={this.itemAddToCartHandler}>
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
