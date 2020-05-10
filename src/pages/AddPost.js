import React, { Component } from 'react'

import Layout from '../components/Layout'

import { Button } from 'bootstrap-4-react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class AddPost extends Component {

    constructor(props){
    super(props)
    this.state={
      error:"",
      success:"",
      updates:[],
      headline :"",
      desc: "",
      link: "",
      text:""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit=(e) =>{
    e.preventDefault();
    if(this.state.headline===""){
      this.setState({error:"Fill the Title/Headline"})
    }else if(this.state.desc===""){
      this.setState({error:"Fill the Short Description"})
    }
    else if(this.state.text==="" || this.state.text==="<p><br></p>"){
      this.setState({error:"Fill the Full Description"})
    }
    else{
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({headline : this.state.headline,
  //                           link: this.state.link,
  //                           body: this.state.desc
  //                         })
  // };
  // fetch('', requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       if(data.success)
  //           this.setState({success:data.message})
  //       else
  //         this.setState({error:data.message})
  // })
}
}

  handleclear=()=>{
    this.setState({
      headline :"",
      text: "",
      link: "",
      id:"",
      error:"",
      success:""
    })
  }

  onHandleAlert = (e) => {
    this.setState({[e.target.id]:""})
  }

  textChange = (e) =>{
    this.setState({text:e})
    console.log(e);
  }

    render() {
        const data={title:"Hello",desc:"This is whole website",link:""}
        
        return (
            <Layout>
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
                    <input className="form-control" placeholder="This will be the Main Headline of the Post" name="headline" type="text" value={this.state.headline} onChange={(e)=> (this.handleChange(e))}/>
                </div>
                </div>

                <div className="form-group row">
                <label className="col-form-label col-sm-4" htmlFor="">Video Link</label>
                <div className="col-sm-8">
                    <input className="form-control" placeholder="Post Video Link (Optional)" type="text" name="link" value={this.state.link} onChange={(e)=> this.handleChange(e)}/>
                </div>
                </div>

                <div className="form-group row">
                <label className="col-form-label col-sm-4" htmlFor="">Short Description</label>
                <div className="col-sm-8">
                    <input className="form-control" placeholder="Short Description (1-2 Lines)" type="text" name="desc" value={this.state.desc} onChange={(e)=> this.handleChange(e)}/>
                </div>
                </div>

                <div className="form-group row" style={{height:"12rem"}}>
                    <label className="col-sm-4 col-form-label">Full Content/Description</label>
                    <div className="col-sm-8" style={{height:"12rem"}}>
                    <ReactQuill style={{height:"7rem"}} value={this.state.text} onChange={this.textChange} />
                    </div>
                </div> 

                <div className="alert alert-danger" style={{display:(this.state.error===""?"none":"inline-block")}} id="error" onClick={this.onHandleAlert}>{this.state.error}</div>
                <div className="alert alert-success" style={{display:(this.state.success===""?"none":"inline-block")}} id="success" onClick={this.onHandleAlert}>{this.state.success}</div>
            
        
                <div className="form-buttons-w">
                    <Button primary style={{marginRight:"2rem"}} onClick={this.handleSubmit}>Submit</Button>
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
