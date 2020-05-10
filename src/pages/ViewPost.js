import React, { Component } from 'react'

import Layout from '../components/Layout'

import ReactPlayer from 'react-player'

export default class ViewPost extends Component {
    render() {
        return (
            <Layout>
                <div className="container" >
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-8">
                        <div className="player-wrapper" style={{textAlign:"center",marginTop:"10px"}}>
                        <ReactPlayer className="react-player" width="100%" height="100%" style={{display:"inline-block"}} url='https://www.youtube.com/watch?v=ysz5S6PUM-U' controls /></div>

                        <article>

                        <div className="article__title text-center" style={{marginTop:"2rem"}}><h1 className="h2">An Old Man Lived in the Village</h1></div>

                        <div className="article__body" style={{marginTop:"2rem"}}>

                            <p>
                            Stories that have morals and messages behind them are always powerful. In fact, it’s crazy just how powerful a 200 word story can be. Our last article of short stories became so popular, that we decided to create another list, in which every story has a simple moral behind it. The 10 Best Short Moral Stories Some of these stories are very short and basic. In fact some are so basic they’re most likely featured in children’s books somewhere.
                            
                            Stories that have morals and messages behind them are always powerful. In fact, it’s crazy just how powerful a 200 word story can be. Our last article of short stories became so popular, that we decided to create another list, in which every story has a simple moral behind it. The 10 Best Short Moral Stories Some of these stories are very short and basic. In fact some are so basic they’re most likely featured in children’s books somewhere.
                            Stories that have morals and messages behind them are always powerful. In fact, it’s crazy just how powerful a 200 word story can be. Our last article of short stories became so popular, that we decided to create another list, in which every story has a simple moral behind it. The 10 Best Short Moral Stories Some of these stories are very short and basic. In fact some are so basic they’re most likely featured in children’s books somewhere.
                            Stories that have morals and messages behind them are always powerful. In fact, it’s crazy just how powerful a 200 word story can be. Our last article of short stories became so popular, that we decided to create another list, in which every story has a simple moral behind it. The 10 Best Short Moral Stories Some of these stories are very short and basic. In fact some are so basic they’re most likely featured in children’s books somewhere.
                            </p>

                            
                        </div>
                        
                        </article>


                        </div>
                    </div>
                </div>
            
            </Layout>
        )
    }
}
