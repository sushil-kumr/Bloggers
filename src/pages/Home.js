import React, { Component } from 'react'

import Layout from '../components/Layout'
import { Card,Button } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';

import {URL} from '../data/Constant'

import {ToastContainer, toast } from "react-toastify";


import axios from 'axios'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[],
            dataFlag:true,
        }
    }


    async componentDidMount(){
        try {
        const response = await axios.get(`${URL}/article`);
        console.log(response.data.data);
        if(response.data.data.length===0)
            this.setState({dataFlag:false});
        this.setState({data:response.data.data});
        }
        catch(error) {
            //const errors = error.response.data.errors;
            
            this.setState({dataFlag:false});
            // errors.forEach(element => {
            //   toast(element.msg, { type: "error" });
            // });
        }

    }

    render() {
        
        return (
            <Layout>
                
                <ToastContainer/>
                {this.state.dataFlag && (
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
                )}
                {!this.state.dataFlag && (
                    <div className="card-center" style={{textAlign:"center",marginTop:"10rem"}}>
                    <Card style={{ width: '18rem' ,justifyContent:"center"}}>
                        <Card.Body >
                        <h2>No Blogs</h2>
                        <Card.Title>We can make new Blogs</Card.Title>
                        <Card.Text>Lets write an awesome blogs here.</Card.Text>
                        <Link to="/post"><Button primary>Add New Blog</Button></Link>
                        </Card.Body>
                    </Card>
                </div>
                )}
            </Layout>
        )
    }
}

