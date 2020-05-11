

import React, { Component } from 'react'

import Layout from '../components/Layout'

import {URL,KEY} from '../data/Constant'

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {ToastContainer, toast } from "react-toastify";

import {Card} from 'bootstrap-4-react'

import "react-toastify/dist/ReactToastify.css";

export default class Payment extends Component {

    constructor(props){
        super(props)
        this.state ={
            payFlag:true,
            name: "American Dirt",
            author:"Jeanine Cummins",
            price: 10,
            image:"https://images-na.ssl-images-amazon.com/images/I/510goBNFiFL._SX323_BO1,204,203,200_.jpg"}
    }

     handleToken=async (token, addresses)=> {
        const response = await axios.post(
          `${URL}/payment/checkout`,
          { token, data:this.state }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
          toast("Payment Success! Check email for details", { type: "success" });
        } else {
          toast("Payment Failed! Please contact our support line", { type: "error" });
        }
      }

    render() {
        return (
            <Layout>
            <ToastContainer />
            <div className="card-center" style={{textAlign:"center"}}>
            <Card >
                <Card.Body>
                <Card.Image src={this.state.image} />
                <Card.Title style={{textAlign:"left"}}>{this.state.name}</Card.Title>
                <Card.Text style={{textAlign:"left"}}>
                    {`By ${this.state.author}`}
                </Card.Text>
                <Card.Text style={{textAlign:"left"}}>
                    On Sale ·<b>{`$${this.state.price}`}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                {this.state.payFlag &&(
                <StripeCheckout
                stripeKey={KEY}
                token={this.handleToken}
                amount={this.state.price * 100}
                name={this.state.name}
                billingAddress
                shippingAddress
                />
                )}
                </Card.Footer>
            </Card>
            </div>
            </Layout>
        );
    }
}

