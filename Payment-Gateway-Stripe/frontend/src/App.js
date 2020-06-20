import React, { useState } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import Card from "./components/Card";

function App() {
  const [product, setProduct] = useState({
    name: "React from Facebook",
    price: 10,
    productBy: "FB",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <StripeCheckout
          stripeKey="pk_test_51GvyzJGusasasasasaqEVo5lOQirl1ChhktnlrMGBx2nLkEGVQP4YxCjp0OyaSoKLasPTubDkcUtN6eZdThteE3LV96VuQDPoUstFSkq00KFf8sR1k"
          token={makePayment}
          name="By React"
          currency
          amount={product.price * 100}
          shippingAddress
          billingAddress
          zipCode
        >
          <Card />
          <button className="btn-large navy-blue">
            Buy This for in Just {product.price} $
          </button>
          <Card />
          <button className="btn-large navy-blue">
            Buy React in Just {product.price} $
          </button>
          <Card />
          <button className="btn-large navy-blue">
            Buy React in Just {product.price} $
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
