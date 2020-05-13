import React from "react";
import { Link } from "react-router-dom";
import PaypalButton from "./PaypalButton";

export default function CartTotals({ value, history }) {
  const { cartSubTotal, cartTotal, cartTax, clearCart } = value;
  //   console.log(value);
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-sm-8 text-capitalize text-right ml-md-auto">
          <Link to="/">
            <button
              className="btn btn-outline-danger text-uppercase mb-3 px-5"
              type="button"
              onClick={() => clearCart()}
            >
              {" "}
              clear cart
            </button>
          </Link>
          <h5>
            <span className="text-title">cart Sub Total:</span>
            <strong>${cartSubTotal}</strong>
          </h5>
          <h5>
            <span className="text-title">tax:</span>
            <strong>${cartTax}</strong>
          </h5>
          <h5>
            <span className="text-title">Total:</span>
            <strong>${cartTotal}</strong>
          </h5>
          <PaypalButton
            total={cartTotal}
            clearCart={clearCart}
            hisory={history}
          />
        </div>
      </div>
    </div>
  );
}
