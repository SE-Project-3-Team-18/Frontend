import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { serverFunctions } from "../utils/communicate";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


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
  const navigate = useNavigate();
  const { _id: id, customerAddress, orderStatus, products, createdAt } = order;

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {formatDateTime(new Date(createdAt))}
        </Typography>
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Items</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {products.map((product) => (
                <Typography variant="body2" component="div" key={product.id}>
                  {product.name} - Quantity: {product.quantity}
                </Typography>
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        <Typography variant="h5" component="div">
          Total: ₹{calculateTotalOrderAmount(products)}
        </Typography>
        <Typography variant="body2" component="div">
          Status: {orderStatus}
        </Typography>
        <Typography variant="body2" component="div">
          Address: {customerAddress.line1}, {customerAddress.line2}, {customerAddress.city}
        </Typography>
        <Button variant="contained" sx = {{ margin: 2 }} onClick={() => navigate(`/orders/${id}`)}>
          See Details
        </Button>
        {orderStatus === 'pending' && (
          <Button variant="contained" onClick={() => onCancel(id)}>
            Cancel Order
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await serverFunctions.getAllOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await serverFunctions.cancelOrder(orderId);
      // Reload orders after cancellation
      loadOrders();
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">No orders found.</Typography>
      ) : (
        orders.map((order) => (
          <OrderItem key={order.id} order={order} onCancel={handleCancelOrder} />
        ))
      )}
    </Container>
  );
};

export default OrdersPage;


