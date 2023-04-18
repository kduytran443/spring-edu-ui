import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';

function PaypalCheckout({
    dataId,
    classFullName,
    username,
    payee,
    email,
    phoneNumber,
    totalPrice,
    successAction = () => {},
}) {
    const description = `${username} (${email}) sends ${totalPrice} to pay for class: ${classFullName} (id: ${dataId}).`;

    const [paidFor, setPaidFor] = useState(false);

    let price = totalPrice / 23585;
    price = price.toFixed(2);

    const handleApprove = (orderId) => {
        setPaidFor(true);
        successAction(orderId);
    };
    console.log(payee);
    const [error, setError] = useState(null);
    if (error) {
        alert(error);
    }
    if (paidFor) {
    }
    return (
        <div className="w-full z-0" style={{ zIndex: '0' }}>
            {totalPrice > 0 && (
                <PayPalScriptProvider
                    options={{
                        'client-id': 'AcEuHTipVMU_S1rYymaqRPkVRVI8QPF_GIK9a7UNGsUAuNyDfp_YJGfQ1qvZR1RNHt8-_6R8z4UVHSmR',
                        intent: 'capture',
                    }}
                >
                    <PayPalButtons
                        style={{
                            color: 'silver',
                            layout: 'horizontal',
                            height: 48,
                            tagline: false,
                            shape: 'pill',
                        }}
                        onClick={(data, actions) => {
                            return actions.resolve();
                        }} //abc
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                intent: 'CAPTURE',
                                purchase_units: [
                                    {
                                        description: description,
                                        amount: {
                                            value: price,
                                        },
                                        payee: {
                                            email_address: payee,
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            const order = await actions.order.capture();
                            console.log('order', order);

                            handleApprove(data.orderID);
                        }}
                        onError={(err) => {
                            setError(err);
                            console.error('PayPal Checkout onError', err);
                        }}
                    />
                </PayPalScriptProvider>
            )}
        </div>
    );
}

export default PaypalCheckout;
