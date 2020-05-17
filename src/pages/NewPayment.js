

import React, { Component } from 'react'

import Layout from '../components/Layout'

import {URL,KEY,clientId} from '../data/Constant'

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {ToastContainer, toast } from "react-toastify";

import {Card} from 'bootstrap-4-react'

import "react-toastify/dist/ReactToastify.css";
import { Button } from 'bootstrap-4-react/lib/components';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from '../components/CheckoutForm';

const queryString = require('query-string');

let stripePromise = loadStripe("pk_test_vvc0TFugJPptSp6tzuHr4Cr100zt85c8ql",
{stripeAccount: "acct_1GjQ4XBzBTz6ebo2"});

// let stripePromise;

export default class NewPayment extends Component {

    constructor(props){
        super(props)
        this.state ={
            payFlag:true,
            loginFlag:false,
            authFlag:false,
            name: "American Dirt",
            author:"Jeanine Cummins",
            price: 10,
            stateId:"",
            stripeAccount:""
        }
            
    }

    async componentWillMount(){

        const parsed = queryString.parse(this.props.location.search);
        if(this.props.location.search!==''){
            //console.log(parsed.code);

            try {
                let res =  await axios({
                    method: 'post',
                    url: `${URL}/payment/oauth`,
                    data: {
                        state: parsed.state,
                        code: parsed.code
                    }
                    })

                    this.setState({stripeAccount:res.data.userId})
                    toast("Login Successful!", { type: "success" });
                        
                    stripePromise = loadStripe("pk_test_vvc0TFugJPptSp6tzuHr4Cr100zt85c8ql",
                                        {stripeAccount: res.data.userId});
                }
                catch(error) {
                    const err = error.response.data.error;
                    toast(err, { type: "error" });
                };

        }else{
            try {
                const response = await axios.get(`${URL}/payment/generates`);
                console.log(response);
                this.setState({stateId:response.data.id,
                                authFlag:true});
            }
            catch(error) {
                toast.error('Login not possible, Server Down');
            }

        }
        


    }

    handleToken=async (token, addresses)=> {
        
    }

    handleLogin =async (e) => {
        e.preventDefault();

        
    }

    render() {
        return (
            <React.Fragment>  
            <ToastContainer />
            {!this.state.loginFlag && (
            <Layout>
            <div className="card-center" style={{textAlign:"center"}}>
            <Card style={{width:"20rem"}}>
                <Card.Body>
                <Card.Title style={{textAlign:"left"}}>{this.state.name}</Card.Title>
                <Card.Text style={{textAlign:"left"}}>
                    {`By ${this.state.author}`}
                </Card.Text>
                <Card.Text style={{textAlign:"left"}}>
                    On Sale ·<b>{`$${this.state.price}`}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                {this.state.authFlag &&(
                    <a href={`https://connect.stripe.com/oauth/authorize?client_id=${clientId}&state=${this.state.stateId}&scope=read_write&response_type=code`} target=""><Button primary  >Login</Button></a>
                )} 
                {!this.state.authFlag &&(
                    <Elements stripe={stripePromise}>
                        <CheckoutForm account={this.state.stripeAccount} price={this.state.price}/> 
                    </Elements>
                )}           
                </Card.Footer>
            </Card>

            </div>

            </Layout>
            )}
            </React.Fragment>
        );
    }
}

