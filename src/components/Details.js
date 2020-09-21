import React, { Component } from "react";
import { ProductConsumer } from "./Context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {
            id,
            img,
            inCart,
            info,
            price,
            title,

            company,
          } = value.detailProduct;
          // console.log(value.detailProduct);

          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto col-md-8 my-3 text-blue slanted-text text-center">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* title end */}

              {/* Product info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-5">
                  <img src={img} alt="product" className="img-fluid" />
                </div>
                {/* Product text */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model:{title}</h2>
                  <h4 className="text-title text-muted mt-3 mb-2">
                    made by:<span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price:<span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about product
                  </p>
                  <p className="text-muted lead">{info}</p>
                  <div>
                    <Link to="/">
                      <ButtonContainer>Back to products</ButtonContainer>
                    </Link>

                    <Link to="/cart">
                      <ButtonContainer
                        className="ml-3"
                        disabled={inCart ? true : false}
                        onClick={() => {
                          value.addToCart(id);
                          value.openModal(id);
                        }}
                      >
                        {inCart ? "inCart" : "Add to cart"}
                      </ButtonContainer>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Details;
