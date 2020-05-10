import React, { Component } from 'react'

import Layout from '../components/Layout'
import { Card, BSmall } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';

export default class Home extends Component {

    render() {
        const data=[2,3,4,5,6,2,4,5,3,5,6]
        var len = Math.ceil(data.length/3);

        console.log(len+" "+data.length/4);
        
        return (
            <Layout>
                <div className="container" style={{textAlign:"center",margin:"0 auto"}}>
                        
                    <Card.Columns>
                        {(data).map((values,index)=>{
                            return(
                                <Card key={index}  style={{ width: '20rem' }}>
                                <Card.Body>
                                <Card.Title style={{textAlign:"center"}}>Card title</Card.Title>
                                <Card.Text style={{textAlign:"left"}}>
                                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                <Card.Text style={{textAlign:"right"}}><Link to="view">View Post  </Link></Card.Text>
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

