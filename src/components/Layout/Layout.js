import React, { Component } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { GET_CATEGORIES } from "../Category";
import { Query } from "react-apollo";
import ProgressIndicator from "../ProgressIndicator";
import ErrorMessage from "../Error";
class Layout extends Component {
  render() {
    const style = ({ isActive }) => ({
      fontWeight: isActive ? "bold" : "normal",
      padding: "10px",
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
          console.log(data.categories);
          return (
            <div>
              <nav className="layout--nav">
                {data.categories.map((category) => (
                  <NavLink key={category.name} to={category.name} style={style}>
                    {category.name.toUpperCase()}
                  </NavLink>
                ))}
              </nav>
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
