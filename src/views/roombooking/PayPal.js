import React, { useState, useEffect, useRef } from "react";

export default function PayPal({ price }) {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  // Initialize PayPal Buttons when the component is mounted
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your booking at Blue House B&B",
                amount: {
                  currency_code: "EUR", // Set preferred currency
                  value: price, // Total price from props
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            const order = await actions.order.capture();
            setPaid(true); // Set paid to true once payment is successful
            console.log("Payment successful:", order); // Log order details
          } catch (error) {
            console.error("Payment approval error:", error);
            setError(error); // Set error state if there's an issue with payment approval
          }
        },
        onError: (err) => {
          console.error("Payment error:", err);
          setError(err); // Set error state for payment errors
        },
      })
      .render(paypalRef.current);
  }, [price]);

  if (paid) {
    return <div>Payment successful! Thank you for your booking.</div>;
  }

  if (error) {
    return <div>Error occurred while processing payment. Please try again.</div>;
  }

  return (
    <div>
      <h4>Total Amount in EUR: {price}</h4>
      <div ref={paypalRef} />
    </div>
  );
}
