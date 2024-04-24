import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PayButton from "./paybutton";
import { serverFunctions } from "../utils/communicate";

const Cart = () => {
  const [cartItems, setcartItems] = useState(undefined);
  const [price,setprice] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const received_data = await serverFunctions.getCart();
        console.log("received data", received_data);
        setcartItems(received_data.items);
        setprice(received_data.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); 
  }, []);

  const handleRemoveFromCart = (cartItem) => {
    const fetchData = async () => {
        try {
          const received_data = await serverFunctions.removeCartItembyId(cartItem.productId);
          console.log("received data", received_data);
        } catch (error) {
          console.log(error);
        }
      };
    fetchData(); 
  };

  const handleDecreaseCart = (cartItem) => {
    const fetchData = async () => {
        try {
          const received_data = await serverFunctions.decrementCartItembyId(cartItem.productId);
          console.log("received data", received_data);
          
        } catch (error) {
          console.log(error);
        }
      };
    fetchData(); 
  };

  const handleAddToCart = (cartItem) => {
    const fetchData = async () => {
        try {
          const received_data = await serverFunctions.addToCart(cartItem.productId);
          console.log("received data", received_data);
          
        } catch (error) {
          console.log(error);
        }
      };
    fetchData(); 
  };

  const handleClearCart = () => {
    const fetchData = async () => {
        try {
          const received_data = await serverFunctions.clearCart();
          console.log("received data", received_data);
          
        } catch (error) {
          console.log(error);
        }
      };
    fetchData(); 
  };

  const url = "https://www.mattsenkumar.com/wp-content/uploads/2021/01/ecom.jpg"
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems && cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartItems &&
              cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem._id}>
                  <div className="cart-product">
                    <img src={url} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.description}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.quantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.price * cartItem.quantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${price}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
                <PayButton cartItems={cartItems} />
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
