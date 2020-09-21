import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import PropTypes from "prop-types";
import { ProductConsumer } from "./Context";

export class Product extends Component {
  render() {
    const { id, img, inCart, price, title } = this.props.product;
    // const { product } = this.props;
    // console.log(product);
    return (
      <ProductWrapper className="col-10 mx-auto col-md-6 my-2  col-lg-4">
        <div className="card">
          <ProductConsumer>
            {(value) => (
              <div
                className="img-container p-5"
                onClick={() => value.handleDetail(id)}
              >
                <Link to="/details">
                  <img src={img} alt="product" className="card-img-top" />
                </Link>
                <button
                  className="cart-btn"
                  disabled={inCart ? true : false}
                  onClick={() => {
                    value.addToCart(id);
                    value.openModal(id);
                  }}
                >
                  {inCart ? (
                    <p className="text-capitalize mb-0">in cart</p>
                  ) : (
                    <i className="fas fa-cart-plus"> </i>
                  )}
                </button>
              </div>
            )}
          </ProductConsumer>

          {/* card-footer */}
          <div className="card-footer d-flex mb-0 justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-blue font-italic mb-0">
              <span className="mr-1">$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

// Product.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.number,
//     img: PropTypes.string,
//     title: PropTypes.string,
//     price: PropTypes.number,
//     inCart: PropTypes.bool,
//   }).isRequired,
// };

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .card-img-top {
    transition: all 1s ease-in;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .cart-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  &:hover {
    .cart-btn {
      transform: translate(0, 0);
    }
  }
`;

export default Product;
