import React,{useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import { Button } from 'bootstrap-4-react/lib/components';
import { clientId } from '../data/Constant';

import ReactLoading from "react-loading";

import {Link} from 'react-router-dom'


import axios from "axios";
import {ToastContainer, toast } from "react-toastify";

import {URL} from '../data/Constant'

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading,setLoading] = useState(false);
  const [flag,setFlag] = useState(false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
        return;
    }

    try {
        setLoading(true);
        setFlag(true);
        let res =  await axios({
            method: 'post',
            url: `${URL}/payment/create-payment-intent`,
            data: {
                stripe_account: props.account,
                price: props.price
            }
            })
            confirmPayment(res.data.clientSecret)
            // console.log(res.data.clientSecret);
            
            
        }
        catch(error) {
            const err = error.response.data.error;
            toast(err, { type: "error" });
            setLoading(false);
            setFlag(false);
        };
    };

    const confirmPayment =async (clientSecret) =>{

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                name: 'Sushil Kumar',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                  }
                },
            }
            });
    
            if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                // console.log(result.error.message);
                toast.error(result.error.message);
                setLoading(false);
                setFlag(false);

            } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                toast.success("Payemnt Success !");
                setLoading(false);
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
            }
        }
    }

    return (
    <>
    
    <form onSubmit={handleSubmit}>
        <CardSection />
        <br/>
        {flag && loading && (<h3 style={{marginLeft:"5rem"}}> <ReactLoading type="spinningBubbles" color="#000" /> </h3>)}
        {flag && !loading && (<Link to="/"> Go Home</Link>)}
        {!flag && !loading && (
        <Button disabled={!stripe} primary>Pay Now</Button>
        )}
    </form>
   
    </>
    );
}