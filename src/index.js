import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
// Import routing components
import { browserHistory, Router, Route } from 'react-router'
import './index.css';
import SingleListing from './single-listing.js';
import App from './App';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import Listings from './Listings';

ReactDOM.render( <Router history={browserHistory}>
                    <Route component= {Main}>
                        <Route path="/" component={App} />
                        <Route path ="/rent" component={Listings} type="rent" />
                        <Route path="/listing" component={App}/>
                        <Route path="/listing/:id" component={SingleListing} />
                    </Route>
              </Router>, document.getElementById('root'));
registerServiceWorker();
