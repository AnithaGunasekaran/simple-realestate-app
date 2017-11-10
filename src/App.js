import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route} from 'react-router';
// Import routing components
import Listings from './Listings.js';
import logo from './logo.svg';
import './App.css';
import './css/reset.css';
import './css/main.css';
import './css/responsive.css';
const apiEndPoint = 'https://access-api.corelogic.asia/access/oauth/token?client_id=XXXXXXX&client_secret=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&grant_type=client_credentials';

class App extends Component {

   
   componentDidMount() {
     console.log("App Component Mounted")
        localStorage.clear();
        this.getAccessToken();
    }

    getAccessToken() {
        fetch(apiEndPoint)
        .then((resp) => resp.json())
        .then(function(data){
       
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('expires',data.expires_in);
            console.log(localStorage)
        })

     
     }

  render() {
    return (
      
      <div className="App">
        
        <section className="listings">
          
            <Listings/>
      
        </section>
      </div>
    );
  }
}

export default App;
