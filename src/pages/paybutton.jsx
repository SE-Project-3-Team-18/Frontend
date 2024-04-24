import axios from "axios";
import { serverFunctions } from "../utils/communicate";
const PayButton = ({ cartItems }) => {
  const handleCheckout = () => {
    const fetchData = async () => {
      try {
        const received_data = await serverFunctions.handleCheckout();
        window.location.href = received_data.redirectUrl
        console.log("received data", received_data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };
  return (
    <div>
      <button onClick={() => handleCheckout()}>Check out</button>
    </div>
  );
};

export default PayButton;
