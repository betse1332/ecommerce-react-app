import React, { Component } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { GET_CATEGORIES } from "../Category";
import { Query } from "react-apollo";
import ProgressIndicator from "../ProgressIndicator";
import ErrorMessage from "../Error";
import "./Layout.style.css";
import { logoTransparent } from "../../assets";
class Layout extends Component {
  render() {
    const { handleClick } = this.props;

    const style = ({ isActive }) => ({
      color: isActive ? "#5ECE7B" : "black",

      fontWeight: isActive ? "bold" : "300",
      // padding: "10px",
      textDecorationLine: isActive ? "underline" : "none",
    });
    return (
      <Query query={GET_CATEGORIES}>
        {({ data, loading, error }) => {
          if (loading) {
            return <ProgressIndicator />;
          }
          if (error) {
            return <ErrorMessage errorMessage={error.message} />;
          }
          // console.log(data.categories);
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
                      onClick={() => handleClick(category.name)}
                    >
                      {category.name.toUpperCase()}
                    </NavLink>
                  ))}
                </nav>
                <img className="layout--logo" src={logoTransparent} alt="" />
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

export default Layout;
