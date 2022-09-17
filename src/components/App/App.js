import React, { Component } from "react";
import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
import Category from "../Category";
import Cart from "../Cart";
import Profile from "../Product";

class App extends Component {


  render() {
    return (
      <div className="app">
        <Routes >
          <Route  element={<Layout />}>
            <Route index element={<Category />} />
            <Route path="all" element={<Category />} />
            <Route path="clothes" element={<Profile />} />
            <Route path="tech" element={<Cart />} />
          </Route>
        </Routes>
      </div>
    )
  }
}

export default App;