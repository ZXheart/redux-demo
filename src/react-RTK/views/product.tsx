import { PureComponent } from "react";
import { connect } from "react-redux";

import type { RootState } from "../store";

import {
  addProduct,
  removeByIndex,
} from "../store/modules/product/product-slice";

interface SeflState {
  removeIndex: number;
  inputProduct: string;
}

class Product extends PureComponent<PropsFromRedux, SeflState> {
  constructor(props: PropsFromRedux) {
    super(props);

    this.state = {
      removeIndex: 0,
      inputProduct: "",
    };
    // this.handleProductChange = this.handleProductChange.bind(this);
  }

  // handleProductChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   this.setState({ inputProduct: e.target.value });
  // }

  render() {
    const { products, removeByIndex, addProduct } = this.props;
    const { removeIndex, inputProduct } = this.state;

    const handleAdd = () => {
      if (inputProduct.trim()) {
        addProduct(inputProduct);
        this.setState({ inputProduct: "" });
      }
    };

    const handleRemove = () => {
      removeByIndex(removeIndex);
      this.setState({ removeIndex: 0 });
    };

    return (
      <div>
        <h1>Counter: {products.join(", ")}</h1>
        <input
          type="text"
          value={inputProduct}
          onChange={(e) => this.setState({ inputProduct: e.target.value })}
        />
        <button onClick={() => handleAdd()}>add product</button>
        <input
          type="number"
          value={removeIndex}
          onChange={(e) => this.setState({ removeIndex: +e.target.value })}
        />
        <button onClick={() => handleRemove()}>remove product by index</button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.product,
});

const mapDispatchToProps = {
  addProduct,
  removeByIndex,
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Product);
