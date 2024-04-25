import { useNavigate, useParams } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Container, Typography, Box, Card, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from "react";
import { serverFunctions } from "../utils/communicate";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotifyContext from '../context/NotifyContext';


function formatDateTime(date) {
  // Extracting hours, minutes, day, month, and year from the date object
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to get the correct month (0-indexed)
  const year = String(date.getFullYear()).slice(2); // Extracting last two digits of the year

  // Constructing the formatted date string
  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;

  return formattedDateTime;
}

function calculateTotalOrderAmount(products) {
  let totalAmount = 0;

  // Iterate over each product in the order data
  products.forEach(product => {
    // Calculate the subtotal for each product (price * quantity)
    const subtotal = product.price * product.quantity;
    // Add the subtotal to the total amount
    totalAmount += subtotal;
  });

  return totalAmount;
}

const OrderItem = ({ order, onCancel }) => {
  console.log('Order', order)
  const navigate = useNavigate();
  const { Notify } = useContext(NotifyContext)
  const [ratings, setRatings] = useState({})
  const { _id: id, customerAddress, orderStatus, products, createdAt } = order;

  const handleRatingChange = (productId, e) => {
    const newRatings = { ...ratings, [productId]: parseInt(e.target.value) };
    setRatings(newRatings);
  };

  const handleRateProduct = async (productId) => {
    const rating = ratings[productId];
    try {
      if (rating && rating >= 1 && rating <= 5) {
        const receivedData = await serverFunctions.rateProduct(productId, rating, '');
        console.log('received data', receivedData);
        Notify({
          type: 'success',
          message: 'Product rated successfully'
        })
      } else {
        console.error('Invalid rating');
        Notify({
          type: 'error',
          message: 'Invalid rating, must be 1-5'
        })
      }
    } catch (error) {
      console.error('Error rating product:', error);
    }
  };

  return (
    <Box sx={{ minWidth: 275, marginBottom: 2 }}>
      <Typography variant="h5" component="div">
        {formatDateTime(new Date(createdAt))}
      </Typography>
      <Typography variant='h5'>
        Items
      </Typography>
      <Typography sx={{ margin: 3 }}>
        {products.map((product) => (
          <Card key={product.id} sx={{ padding: 3 }}>
            <Typography variant="h6" component="div" >
              {product.name}
            </Typography>
            <Typography>
              Quantity: {product.quantity}
            </Typography>
            <Typography>
              Price per unit: ₹{product.price}
            </Typography>
            <Typography>
              Total Price: ₹{product.price * product.quantity}
            </Typography>
            {
              orderStatus === 'delivered' &&
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  label="Your Rating" 
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                  value={ratings[product.productId] || ''}
                  onChange={(e) => handleRatingChange(product.productId, e)}
                  sx={{ width: '10vw' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRateProduct(product.productId)}
                  sx={{ margin: 1 }}
                >
                  Add Rating
                </Button>
              </Box>
            }
          </Card>
        ))}
      </Typography>
      <Typography variant="h5" component="div">
        Total: ₹{calculateTotalOrderAmount(products)}
      </Typography>
      <Typography variant="body2" component="div">
        Status: {orderStatus}
      </Typography>
      <Typography variant="body2" component="div">
        Address: {customerAddress.line1}, {customerAddress.line2}, {customerAddress.city}
      </Typography>
      {orderStatus === 'pending' && (
        <Button variant="contained" onClick={() => onCancel(id)}>
          Cancel Order
        </Button>
      )}
    </Box>
  );
};

const SingleOrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);


  const loadOrder = async () => {
    try {
      const data = await serverFunctions.getOrderById(id);
      console.log('hey', data)
      setOrder(data.order);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  if (!order) {
    return (
      <CircularProgress />
    )
  }
  console.log('All order', order)

  const handleCancelOrder = async (orderId) => {
    try {
      await serverFunctions.cancelOrder(orderId);
      // Reload orders after cancellation
      loadOrder();
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <OrderItem key={order.id} order={order} onCancel={handleCancelOrder} />
    </Container>
  );
};

export default SingleOrderPage;


