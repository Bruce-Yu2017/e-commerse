import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

const PaypalBtn = props => {
  const onSuccess = payment => {
    // 1, 2, and ... Poof! You made it, everything's fine and dandy!
    console.log("Payment successful!", payment);
    props.cancel();
    props.clearCart();
    props.toggleSuccessAlert();
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onCancel = data => {
    // The user pressed "cancel" or closed the PayPal popup
    console.log("Payment cancelled!", data);
    props.cancel();
    props.toggleCancelAlert();
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = err => {
    // The main Paypal script could not be loaded or something blocked the script from loading
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  let env = "sandbox"; // you can set this string to 'production'
  let currency = "USD"; // you can set this string from your props or state
  let total = props.total; // this is the total amount (based on currency) to charge
  console.log('total: ', typeof total);
  // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

  const client = {
    sandbox: "",
    production: "YOUR-PRODUCTION-APP-ID"
  };
  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
};

export default PaypalBtn;
