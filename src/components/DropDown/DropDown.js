import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrowDown, arrowUp } from "../../assets";
import "./DropDown.style.css";

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropDownOpen: false,
      headerTitle: this.props.title,
      selectedItem: {},
    };
  }

  toggleDropDown = () => {
    this.setState((prevState) => ({
      isDropDownOpen: !prevState.isDropDownOpen,
    }));
  };
  selectCurrency = (item) => {
    const { selectedItem } = this.state;
    const { handleSelector } = this.props;
    this.setState(
      {
        isDropDownOpen: false,
        selectedItem: item,
        headerTitle: item.symbol,
      },
      () => selectedItem?.symbol !== item.symbol && handleSelector(item.symbol)
    );
  };
  render() {
    const { currencies } = this.props;

    return (
      <div className="currency--dropdown">
        <button className="dropdown--header" onClick={this.toggleDropDown}>
          <div
            className="header--title"
            style={{ marginRight: this.state.isDropDownOpen ? 0 : "1.23rem" }}
          >
            <span>
              {" "}
              {this.state.headerTitle}{" "}
              <img
                src={this.state.isDropDownOpen ? arrowUp : arrowDown}
                alt="arrow-up"
                className="dropdown--arrowup"
              />
            </span>
          </div>
        </button>
        {this.state.isDropDownOpen && (
          <div role="list" className="dropdown--list">
            {currencies.map((currency) => (
              <button
                key={currency.symbol}
                className="dropdown--listitem"
                onClick={() => this.selectCurrency(currency)}
              >
                {currency.symbol} {currency.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

DropDown.propTypes = {
  title: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  handleSelector: PropTypes.func.isRequired,
};

export default DropDown;
