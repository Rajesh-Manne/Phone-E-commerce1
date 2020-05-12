import React, { Component } from "react";
// import { ProductConsumer } from "../components/Context";

class Title extends Component {
  render() {
    const { name, title } = this.props;
    return (
      <div className="row">
        <div className="col-10 my-2  col-md-6 text-center mx-auto text-title">
          <h1 className="text-capitalize text-title">
            {name} <strong className="text-blue">{title}</strong>
          </h1>
          {/* <ProductConsumer>
            {(title) => {
              return <h1>hello: {title}</h1>;
            }}
          </ProductConsumer> */}
        </div>
      </div>
    );
  }
}
export default Title;
