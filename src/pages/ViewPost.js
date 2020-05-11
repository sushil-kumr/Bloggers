import React, { Component } from 'react'

import Layout from '../components/Layout'
import NotFound from './NotFound';

import {ToastContainer, toast } from "react-toastify";

import ReactPlayer from 'react-player'

import axios from 'axios'

import {URL} from '../data/Constant'


export default class ViewPost extends Component {

    constructor(props){
        super(props)
        this.state={data:{videoLink:"",
                    title:"",
                    description:""
                },
                dataFlag:true
            }
    }

    async componentWillMount(){
        try {
            const response = await axios({
                method: 'post',
                url: `${URL}/article/data`,
                data: {
                  id: this.props.match.params.id,
                }
              });
            console.log(response.data.data.videoLink!==""+" hi");
            this.setState({data:response.data.data,
                            loading:false});
            
            }
            catch(error) {
               // const errors = error.response.data.errors;
                this.setState({dataFlag:false})
            };
    }

    render() {
        return (
            <React.Fragment>
            {this.state.dataFlag && (
            <Layout>
                <ToastContainer/>
                <div className="container" >
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-8">
                        {this.state.data.videoLink!=="" && (
                        <div className="player-wrapper" style={{textAlign:"center",marginTop:"10px"}}>
                        <ReactPlayer className="react-player" width="100%" height="100%" url={this.state.data.videoLink} controls />
                        </div>)}
                        <article>
                        <div className="article__title text-center" style={{marginTop:"2rem"}}><h2 className="h2">{this.state.data.title}</h2></div>
                        <div className="article__body" style={{marginTop:"2rem"}} dangerouslySetInnerHTML={{__html: this.state.data.description}}>   
                        </div>
                        </article>
                        </div>
                    </div>
                </div>
            </Layout>
            )}
            {!this.state.dataFlag && <NotFound/>}
            </React.Fragment>
        )
    }
}
