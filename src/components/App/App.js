import React, { Component } from "react";
import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
import Category from "../Category";
import { filterProductPrice } from "../helper-functions";
import ProductDetail from "../Product/ProductDetail";
import "./App.style.css";
import Cart from "../Cart/Cart";
class App extends Component {
  state = {
    currencyType: "$",
    categoryName: "all",
    cartItems: [],
    cartItemCount: 0,
    totalPrice: 0,
  };

  addItemToTheCart = (product) => {
    const itemExist = this.state.cartItems.filter(
      (item) => product.id === item.id
    ).length;

    itemExist
      ? this.setState((prevState) => ({
          cartItemCount: prevState.cartItemCount + 1,
        }))
      : this.setState((prevstate) => ({
          cartItemCount: prevstate.cartItemCount + 1,
          cartItems: [...prevstate.cartItems, product],
        }));
  };

  removeItemFromTheCart = (product) => {
    const { cartItems, currencyType } = this.state;

    const { counter, id } = product;
    const newCartItems = cartItems.filter((item) => item.id !== id);

    counter == 0
      ? this.setState((prevState) => ({
          cartItems: newCartItems,
          cartItemCount: prevState.cartItemCount - 1,
        }))
      : this.setState((prevState) => ({
          cartItemCount: prevState.cartItemCount - 1,
        }));

    console.log(this.state.cartItems.length);
  };
  handleTabChange = (categoryName) => {
    this.setState({
      categoryName: categoryName,
    });
  };
  handleSelectorChange = (currency) => {
    this.setState({
      currencyType: currency,
    });
  };

  render() {
    const { cartItems, currencyType, cartItemCount, totalPrice } = this.state;

    return (
      <div className="app">
        <Routes>
          <Route
            element={
              <Layout
                handleTabChange={this.handleTabChange}
                handleSelectorChange={this.handleSelectorChange}
                currencyType={currencyType}
                cartItems={cartItems}
                cartItemCount={cartItemCount}
                removeItemFromTheCart={this.removeItemFromTheCart}
                addItemToTheCart={this.addItemToTheCart}
                totalPrice={totalPrice}
              />
            }
          >
            <Route
              index
              element={
                <Category
                  currencyType={this.state.currencyType}
                  categoryName={this.state.categoryName}
                  handleAddItemToCart={this.addItemToTheCart}
                />
              }
            />
            <Route
              path="all"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
                  handleAddItemToCart={this.addItemToTheCart}
                />
              }
            />
            <Route
              path="clothes"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
                  handleAddItemToCart={this.addItemToTheCart}
                />
              }
            />

            <Route
              path="tech"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
                  handleAddItemToCart={this.addItemToTheCart}
                />
              }
            />
            <Route
              path="cart"
              element={
                <Cart
                  currencyType={currencyType}
                  cartItems={cartItems}
                  cartItemCount={cartItemCount}
                  removeItemFromTheCart={this.removeItemFromTheCart}
                  addItemToTheCart={this.addItemToTheCart}
                />
              }
            />

            <Route
              path="products/:productID"
              element={
                <ProductDetail
                  addItemToTheCart={this.addItemToTheCart}
                  removeItemFromTheCart={this.removeItemFromTheCart}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
