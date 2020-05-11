import React, { Component } from 'react'

import Layout from '../components/Layout'

import { Button } from 'bootstrap-4-react';

import {ToastContainer, toast } from "react-toastify";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios'

import {URL} from '../data/Constant'

export default class AddPost extends Component {

    constructor(props){
    super(props)
    this.state={
      updates:[],
      headline :"",
      shortDescription: "",
      videoLink: "",
      description:""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit= async (e) =>{
    e.preventDefault();
     if(this.state.description==="<p><br></p>"){
      toast("Full Description is required.", { type: "error" });
    }
    else{
      try {
      await axios({
            method: 'post',
            url: `${URL}/article/add`,
            data: {
              title: this.state.headline,
              videoLink: this.state.videoLink,
              shortDescription: this.state.shortDescription,
              description: this.state.description,
            }
          });
          toast("Article Added!", { type: "success" });
          this.handleclear();
        }
        catch(error) {
          const errors = error.response.data.errors;
          errors.forEach(element => {
            toast(element.msg, { type: "error" });
          });
        };
}
}

  handleclear=()=>{
    this.setState({
      headline :"",
      description: "",
      shortDescription:"",
      videoLink: "",
      error:"",
      success:""
    })
  }

  onHandleAlert = (e) => {
    this.setState({[e.target.id]:""})
  }

  textChange = (e) =>{
    this.setState({description:e})
    console.log(e);
  }

    render() {

        return (
            <Layout>
            <ToastContainer/>
                <div className="container">

        <div className="col-lg-8">
        <div className="element-wrapper">
            <h6 className="element-header">
            Details for Post
            </h6>
            <div className="element-box" id="top">
                <div className="form-group row">
                <label className="col-form-label col-sm-4" htmlFor="">Headline</label>
                <div className="col-sm-8">
                    <input className="form-control" placeholder="Headline/Title" name="headline" type="text" value={this.state.headline} onChange={(e)=> (this.handleChange(e))}/>
                </div>
                </div>

                <div className="form-group row">
                <label className="col-form-label col-sm-4" htmlFor="">Video Link</label>
                <div className="col-sm-8">
                    <input className="form-control" placeholder="Post Video Link (Optional)" type="text" name="videoLink" value={this.state.videoLink} onChange={(e)=> this.handleChange(e)}/>
                </div>
                </div>

                <div className="form-group row">
                <label className="col-form-label col-sm-4" htmlFor="">Short Description</label>
                <div className="col-sm-8">
                    <input className="form-control" placeholder="Short Description (2-3 Lines)" type="text" name="shortDescription" value={this.state.shortDescription} onChange={(e)=> this.handleChange(e)}/>
                </div>
                </div>

                <div className="form-group row" >
                    <label className="col-sm-4 col-form-label">Full Content/Description</label>
                    <div className="col-sm-8">
                    <ReactQuill  value={this.state.description} onChange={this.textChange} />
                    </div>
                </div> <br/>
        
                <div className="form-buttons-w">
                    <Button primary style={{marginRight:"1rem"}} onClick={this.handleSubmit}>Submit</Button>
                    <Button secondary onClick={this.handleclear}>Clear</Button>
                </div>
            </div>
        </div>
        </div>
                </div>
            
            </Layout>
        )
    }
}
