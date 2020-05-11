import React, { Component } from 'react'

import Layout from '../components/Layout'
import { Card } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';

import {URL} from '../data/Constant'

import {ToastContainer, toast } from "react-toastify";

import axios from 'axios'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[],
            loading:true,
        }
    }


    async componentDidMount(){
        try {
        const response = await axios.get(`${URL}/article`);
        console.log(response.data.data);
        this.setState({data:response.data.data,
                        loading:false});
        }
        catch(error) {
            const errors = error.response.data.errors;
            errors.forEach(element => {
              toast(element.msg, { type: "error" });
            });
        }

    }

    render() {
        
        return (
            <Layout>
                <ToastContainer/>
                <div className="container" style={{textAlign:"center",margin:"0 auto"}}>
                        
                    <Card.Columns>
                        {(this.state.data).map((values,index)=>{
                            return(
                                <Card key={index} >
                                <Card.Body>
                                <Card.Title style={{textAlign:"center"}}>{values.title}</Card.Title>
                                <Card.Text style={{textAlign:"left"}}>
                                    {values.shortDescription}
                                </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                <Card.Text style={{textAlign:"right"}}><Link to={`/${values._id}`}>View Post</Link></Card.Text>
                                </Card.Footer>
                                </Card>
                            )
                        })}
                    </Card.Columns>
                </div>
            </Layout>
        )
    }
}

