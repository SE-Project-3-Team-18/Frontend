import styled from "styled-components";

const CheckoutFailure = () => {
  
  return (
    <Container>
      <h2>Checkout Failed</h2>
      <p>Your payment has not been successful.</p>
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

export default CheckoutFailure;
