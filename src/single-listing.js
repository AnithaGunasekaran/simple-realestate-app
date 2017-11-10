import React, { Component } from 'react';

import ListingGallery from './Gallery.js';

import './css/image-gallery.css';

var apiendPoint = 'https://property-sandbox-api.corelogic.asia/bsg-au/v1/property/';

var returnFields = '?returnFields=address,propertyPhotoList,attributes,featureList&access_token=';

class SingleListing extends Component {

    constructor(props){
        super(props);
        console.log("Props")
        console.log(props)
        this.state = { id: this.props.routeParams.id, price: this.props.location.query.price }
        this.fetchListing = this.fetchListing.bind(this);
    }

    fetchListing(){
         fetch(apiendPoint+ this.state.id + '.json'+ returnFields + localStorage.getItem('access_token'),{})
        .then(
            (resp) => resp.json()
        )
        .then(function(response){
             console.log(response);
             var imageArray = response.property.propertyPhotoList;
             var result = [];
            for( var i = 0, n = imageArray.length;  i < n;  ++i ) {
                    var item = imageArray[i];
                    result[i] = {"original":item.largePhotoUrl, "thumbnail" : item.thumbnailPhotoUrl};

            }
           
            this.setState(
                {
                    property:{
                        features: response.property.featureList,
                        councilArea: response.property.address.councilArea,
                        postcode: response.property.address.street.locality.postcode.name,
                        state: response.property.address.street.locality.postcode.state,
                        address: response.property.address.singleLine,
                        streetNumber: response.property.address.street.nameAndNumber,
                        suburb: response.property.address.street.locality.name,
                        bedrooms: response.property.attributes.bedrooms,
                        bathrooms: response.property.attributes.bathrooms,
                        carspaces: response.property.attributes.carSpaces,
                        images: result
                    }                       
                }
            )        
            
        }.bind(this));
    }

    componentWillMount(){
        this.fetchListing();
    }

    render(){
        console.log("Render");
        console.log(this.state.property ? 'true': 'false' )
        return(
            
            <div>
                
            
                <ul>

                    {
                    this.state.property ?
                        <div>
                            <div className="gallery"><div className="wrapper"><ListingGallery items={this.state.property.images} /></div></div>
                            <div className="baseInfo">
                                <div className="wrapper">
                                    <div className="left">
                                        <h1>
                                            <span className="address">{this.state.property.streetNumber}</span>
                                            <span className="details">{this.state.property.suburb}</span>&nbsp;
                                            <span className="details">{this.state.property.state}</span>&nbsp;
                                            <span className="details">{this.state.property.postcode}</span>
                                        </h1>
                                        <ul className="rooms">
                                            { this.state.property.bedrooms ? <li>{this.state.property.bedrooms} bedrooms</li> : ''}
                                            { this.state.property.bathrooms ? <li>{this.state.property.bathrooms} bathrooms</li> : ''}
                                            { this.state.property.carspaces ? <li>{this.state.property.carspaces} carspaces</li> : ''}
                                        </ul>
                                    </div>
                                    <div className="right">
                                        <h3> {this.state.price} </h3>
                                    </div>
                                    <div className="clear"></div>
                                     <div className="features">
                                        {this.state.property.features ? <h2>Featuring: </h2> : ''}
                                        {this.state.property.features.map(function(item,k){
                                            return(<li key={k} className="features">{item.name} - {item.value}</li>)
                                        },this)}
                                    </div>
                                  </div>
                                   
                                </div>
                                
                        </div> :
                        <div>Loading......</div>
                    }

                </ul>
             
            </div>
        );  
    }

}

export default SingleListing;