import React, { Component } from "react";
import { storeProducts, detailProduct } from "../data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  // state = {
  //   products: storeProducts,
  //   detailProduct: detailProduct,
  // };

  componentDidMount() {
    this.setProduct();
  }

  setProduct = () => {
    let tempProducts = [];
    // console.log(storeProducts);
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      // console.log(singleItem);
      tempProducts = [...tempProducts, singleItem];
      // console.log(tempProducts);
    });

    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => id === item.id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    console.log(`hello from handledetail id is ${id}`);

    this.setState(() => {
      return {
        detailProduct: product,
      };
    });
  };

  // handleDetail = () => {
  //   // console.log("Hello From handleDetail");
  // };

  addToCart = (id) => {
    // console.log(`hello from add to cart id is ${id}`);
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const Product = tempProducts[index];
    Product.inCart = true;
    Product.count = 1;
    // const price = product.price;
    Product.total = Product.price;

    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, Product] };
      },
      () => {
        // console.log(this.state);
        this.addTotals();
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    // product.total = product.count * product.price;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart],
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  // remove = (id) => {
  //   console.log("item removed");
  // };

  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: [],
        };
      },
      () => {
        this.setProduct();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const Tax = parseFloat(tempTax.toFixed(2));
    const Total = subTotal + Tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: Tax,
        cartTotal: Total,
      };
    });
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  render() {
    // console.log(this.state.products);
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
// const ProductProvider = ProductContext.Provider;
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
