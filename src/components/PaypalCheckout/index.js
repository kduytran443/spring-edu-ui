import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';

function PaypalCheckout({ orderDataId, username, email, phoneNumber, totalPrice, successAction = () => {} }) {
    const description = `${username} (${email}) sent ${totalPrice} to pay for order: ${orderDataId}.`;

    const [paidFor, setPaidFor] = useState(false);

    let price = totalPrice / 23585;
    price = price.toFixed(2);

    const handleApprove = (orderId) => {
        setPaidFor(true);
        successAction(orderId);
    };
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
                        'client-id': 'AcHaKF7CapLkTqFZvw7ouPLY3mh_xyQxwn2OFq98--jiFh5IEJl9UyerIF5g0DIzwHwU12n2m5srgsr6',
                        'merchant-id': '6EWJ4DX5UUTZQ',
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
                        }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: description,
                                        amount: {
                                            value: price,
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
