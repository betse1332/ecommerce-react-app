import React, { Component } from "react";
import apolloClient from "../../apollo_config";
import { circleCart } from "../../assets";

import { Link } from "react-router-dom";

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
    const { handleAddItemToCart, productID } = this.props;
    console.log("🚀 ~ file: Product.js ~ line 25 ~ Product ~ id", productID)
    

    apolloClient
      .query({
        query: GET_PRODUCT_BY_ID,
        variables: { productID },
      })
      .then(({ data, error }) => {
        const { product } = data;
        console.log(product);
        handleAddItemToCart(product);
      });
  };


  render() {
    const { coverImage, productName, productPrice, productID } = this.props;
    const { isHovering } = this.state;

    return (
      <div
        onMouseOver={this.handleMouseHovering}
        onMouseOut={this.handleMouseHovering}
      >
        {isHovering && (
          <div className="product--cart" onClick={this.itemAddToCartHandler}>
            <img src={circleCart} alt="cirlce-cart" />
          </div>
        )}
        <Link
          to={`/products/${productID}`}
      
          style={{ textDecoration: "none", color: "black" }}
        >
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
        </Link>
      </div>
    );
  }
}

export default Product;
