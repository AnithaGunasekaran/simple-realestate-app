import React, { Component } from 'react';
import { Link } from 'react-router';

import SingleListing from './single-listing';

class Listing extends Component {

   constructor(props){
        super(props);
    }

  
   render() {

        return (
            
                <ul className="properties_list"> 
                    {this.props.list.map(function(item, i) {
                        return (
                            <li key = {i}>
                                <Link to={"/listing/"+item.id + "?price="+item.price} price={item.price} component={SingleListing}>
                                    <img className="property_img" src={item.img}/>
                                </Link>
                                {item.price ? <span className="price">{item.price}</span> : ''}
                                <div className="property_details">
                                    <h1>{item.address}</h1>
                                    <h2>{item.bedrooms ? <span> {item.bedrooms} bedrooms</span> : ''} {item.bathrooms ? <span> {item.bathrooms} bathrooms</span> : ''} {item.parking ? <span>{item.parking} car spaces</span> : ''}</h2>
                                </div>
                            </li>
                        );
                    },this)}
            </ul>
        
        );
   }
}

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

export default Listing;