import React, { Component, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import io from "socket.io-client";
import TweetCard from './TweetCard';


const TweetFeed = (props) => {
  
  useEffect(() => {
    var socket = io('http://localhost:80');

    socket.on('tweets', function (data) {
        //var div = document.getElementById("news-list");
        console.log("Rendering tweets : ",data);
  
        /* for(var i = 0;i < data.length;i++){
            var newsItem = data[i];
            console.log(newsItem)
        } */
    });   
  })

  return (
    <div>
      <p>Test</p>
    </div>
  )

}

export default TweetFeed;






/* 

let items = this.state.items;

    let itemsCards = <TransitionGroup
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
      {items.map((x, i) =>
        <TweetCard key={i} data={x} />
      )}
    </TransitionGroup>;

    let searchControls =
      <div>
        <input id="email" type="text" className="validate" value={this.state.searchTerm} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
        <label htmlFor="email">Search</label>
      </div>

    let filterControls = <div>
      <a className="btn-floating btn-small waves-effect waves-light pink accent-2" style={controlStyle} onClick={this.handleResume}><i className="material-icons">play_arrow</i></a>
      <a className="btn-floating btn-small waves-effect waves-light pink accent-2" onClick={this.handlePause} ><i className="material-icons">pause</i></a>
      <p>
        <input type="checkbox" id="test5" />
        <label htmlFor="test5">Retweets</label>
      </p>
    </div>

    let controls = <div>
      {
        items.length > 0 ? filterControls : null
      }
    </div>

    let loading = <div>
      <p className="flow-text">Listening to Streams</p>
      <div className="progress lime lighten-3">
        <div className="indeterminate pink accent-1"></div>
      </div>
    </div>

    return (
      <div className="row">
        <div className="col s12 m4 l4">
          <div className="input-field col s12">
            {searchControls}
            {
              items.length > 0 ? controls : null
            }
          </div>
        </div>
        <div className="col s12 m4 l4">
          <div>
            {
              items.length > 0 ? itemsCards : loading
            }

          </div>

        </div>
        <div className="col s12 m4 l4">
        </div>
      </div>
    );

*/