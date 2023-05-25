import React from "react";
import "./customerdashboard.scss";
import productImg from "../../../assets/product.png";
import { setCartItems, setTotalPrice } from "../../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allProducts } from "../../../redux/slices/productSlice";
import Loader from "../../../components/Loaders/Loader";

function CustomerDashboard() {
  const { token } = useSelector((state) => state.users);
  const { loading, products } = useSelector((state) => state.product);
  const { cartItems: cartProducts, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const validateProdcut = (product) => {
    let prod = cartProducts?.find((val) => val?._id == product?._id);
    return prod ? prod : false;
  };
  const addProductToCart = (product) => {
    let oldProduct = cartProducts?.find((p) => p._id == product._id);
    if (oldProduct) {
      let updatePro = { ...oldProduct };
      updatePro.q++;
      let index = cartProducts.findIndex((val) => val._id == product._id);
      let arr = [...cartProducts];
      arr.splice(index, 1, updatePro);
      dispatch(setTotalPrice(totalPrice + product.price));
      dispatch(setCartItems(arr));
    } else {
      let arr = [...cartProducts];
      arr.push({
        ...product,
        q: 1,
      });
      dispatch(setTotalPrice(totalPrice + product.price));
      dispatch(setCartItems(arr));
    }
  };
  const removeProductFromCart = (product) => {
    let oldProduct = cartProducts?.find((p) => p._id == product._id);
    if (oldProduct) {
      let updatePro = { ...oldProduct };
      if (updatePro.q > 1) {
        updatePro.q--;
        let index = cartProducts.findIndex((val) => val._id == product._id);
        let arr = [...cartProducts];
        arr.splice(index, 1, updatePro);
        dispatch(setCartItems(arr));
        dispatch(setTotalPrice(totalPrice - product?.price));
      } else {
        let index = cartProducts.findIndex((val) => val._id == product._id);
        let arr = [...cartProducts];
        arr.splice(index, 1);
        dispatch(setCartItems(arr));
        dispatch(setTotalPrice(totalPrice - product?.price));
      }
    }
  };
  useEffect(() => {
    dispatch(allProducts({ token }));
  }, []);
  return (
    <div className="customer-dashboard">
      {loading ? <Loader /> : null}
      <h3>All Products</h3>
      <div className="products">
        {products?.map((prod) => {
          let product = validateProdcut(prod);

          return product ? (
            <div className="product" key={product._id}>
              <img src={productImg} alt="" />
              <div className="details">
                <p>
                  <b>{product.name}</b>
                </p>
                <p>{product.description}</p>
                <p className="price">$ {product.price}.00</p>
                <div className="add-remove-cart">
                  <div
                    className="btn rmv"
                    onClick={() => removeProductFromCart(product)}
                  >
                    -
                  </div>
                  <p>{product?.q}</p>
                  <div
                    className="btn add"
                    onClick={() => addProductToCart(product)}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="product" key={prod._id}>
              <img src={productImg} alt="" />
              <div className="details">
                <p>
                  <b>{prod.name}</b>
                </p>
                <p>{prod.description}</p>
                <p className="price">$ {prod.price}.00</p>
                {prod?.q > 1 ? (
                  <div className="add-remove-cart">
                    <div
                      className="btn rmv"
                      onClick={() => removeProductFromCart(prod)}
                    >
                      -
                    </div>
                    <p>{0}</p>
                    <div
                      className="btn add"
                      onClick={() => addProductToCart(prod)}
                    >
                      +
                    </div>
                  </div>
                ) : (
                  <p
                    className="add-cart"
                    onClick={() => addProductToCart(prod)}
                  >
                    Add to Cart
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(CustomerDashboard);
