import React, { Component } from "react";

export default class EmptyCart extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="conatiner">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 text-capitalize col-lg-6 text-center text-title ">
              <h2>your cart is empty</h2>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
