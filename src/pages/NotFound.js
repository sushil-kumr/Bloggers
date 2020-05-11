import React from 'react'

import Layout from '../components/Layout'

import {Link} from 'react-router-dom'

import {Card,Button} from 'bootstrap-4-react'

export default function NotFound() {
    return (
        <Layout>
        <div className="card-center" style={{textAlign:"center",marginTop:"10rem"}}>
            <Card style={{ width: '18rem' ,justifyContent:"center"}}>
                <Card.Body >
                <h2>404</h2>
                <Card.Title>Not Found</Card.Title>
                <Card.Text>Something Worng with URL</Card.Text>
                <Link to="/"><Button primary>Go Home</Button></Link>
                </Card.Body>
            </Card>
        </div>
        </Layout>
    )
}
