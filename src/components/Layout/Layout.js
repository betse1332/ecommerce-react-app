import React, { Component } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Query } from "react-apollo";
import PropTypes from 'prop-types'
import ProgressIndicator from "../ProgressIndicator";
import ErrorMessage from "../Error";
import DropDown from "../DropDown";
import { emptyCart, logoTransparent } from "../../assets";
import { GET_CATEGORYNAME_AND_CURRENCY } from "./queries";
import "./Layout.style.css";
import CartModal from "../Cart/CartOverlay";
import LayoutActions from "./LayoutActions";

class Layout extends Component {
 

  render() {
    const { handleTabChange, currencyType, handleSelectorChange } = this.props;
      // handleSelectorChange("$")
    console.log(
      "🚀 ~ file: Layout.js ~ line 20 ~ Layout ~ render ~ currencyType",
      currencyType
    );
    const style = ({ isActive }) => ({
      color: isActive ? "#5ECE7B" : "black",

      fontWeight: isActive ? "bold" : "300",
      // padding: "10px",
      textDecorationLine: isActive ? "underline" : "none",
    });

    return (
      <Query query={GET_CATEGORYNAME_AND_CURRENCY}>
        {({ data, loading, error }) => {
          if (loading) {
            return <ProgressIndicator />;
          }
          if (error) {
            return <ErrorMessage errorMessage={error.message} />;
          }
          // console.log(data.currencies);
          console.log(
            "🚀 ~ file: Layout.js ~ line 42 ~ Layout ~ render ~ currencies",
            data.currencies
          );

          return (
            <div>
              <div className="layout--header">
                <nav className="layout--nav">
                  {data.categories.map((category) => (
                    <NavLink
                      key={category.name}
                      to={category.name}
                      style={style}
                      className="layout--navlink"
                      onClick={() => handleTabChange(category.name)}
                    >
                      {category.name.toUpperCase()}
                    </NavLink>
                  ))}
                </nav>
                <img className="layout--logo" src={logoTransparent} alt="" />
                <LayoutActions currencies={data.currencies} title={currencyType} handleSelector={handleSelectorChange}/>
               
              </div>

              <main>
                <Outlet />
              </main>
            </div>
          );
        }}
      </Query>
    );
  }
}

Layout.prototypes={
  handleTabChange:PropTypes.func.isRequired,
  handleSelectorChange:PropTypes.func.isRequired,
  currencies:PropTypes.string.isRequired
}

export default Layout;
