import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { orderService } from "../utils/OrderService";

const OrderItem = ({ order, onCancel }) => {
  const { id, customerAddress, orderStatus, products } = order;

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Order ID: {id}
        </Typography>
        <Typography variant="body2" component="div">
            <ul>
            {products.map((product) => (
                <li key={product.id}>
                {product.name} - Quantity: {product.quantity}
                </li>
            ))}
            </ul>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
      const data = await orderService.getAllOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await orderService.cancelOrder(orderId);
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

  
