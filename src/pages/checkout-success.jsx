import styled from "styled-components";

const CheckoutSuccess = () => {
  
  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order has been placed.</p>
      <p>Track your order status at your profile.</p>
    </Container>
  );
};

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;

export default CheckoutSuccess;
