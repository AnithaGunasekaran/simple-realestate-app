import React, { Component } from 'react';
import Listing from './Listing.js';


class Listings extends Component {

    constructor(props){
        super(props);
        this.state = {apiEndPoint : 'https://search-sandbox-api.corelogic.asia/search/au/property/geo/radius/otmForSale?activeCampaign=true&lat=-33.8374&lon=150.9917&radius=10'};
        this.updateEndPoint = this.updateEndPoint.bind(this);
        this.retrieveListing = this.retrieveListing.bind(this);
        
    }
    componentWillMount(){
        this.updateEndPoint();    
    }

    updateEndPoint(){
         if(this.props.route !== undefined){
            if(this.props.route.type == "rent"){
                this.setState({ apiEndPoint:"https://search-sandbox-api.corelogic.asia/search/au/property/locality/9299/otmForRent?" }, function() {
                     this.retrieveListing();
                });
            }            
        }
        else{
           this.retrieveListing();
        }
      
    }
    retrieveListing(){
        console.log("Ret listing")
        console.log(this.state.apiEndPoint)    
        fetch(this.state.apiEndPoint+ "&access_token="+localStorage.getItem("access_token"))
        .then(
            (resp) => resp.json()
        )
        .then(function (response) {

            var listingArray =[];
            
            var price = 'Not listed';      
           
            for(var i=0; i<= response._embedded.propertySummaryList.length - 1; i++){
                if(response._embedded.propertySummaryList[i].propertySummary.otmForSaleDetail !== undefined){
                    price =  response._embedded.propertySummaryList[i].propertySummary.otmForSaleDetail.priceDescription ?  response._embedded.propertySummaryList[i].propertySummary.otmForSaleDetail.priceDescription : 'Not Listed';
                }
                else{
                     price =  response._embedded.propertySummaryList[i].propertySummary.otmForRentDetail.priceDescription ? response._embedded.propertySummaryList[i].propertySummary.otmForRentDetail.priceDescription :  'Not mentioned' ;
                }
               listingArray[i] = {
                   "id" : response._embedded.propertySummaryList[i].propertySummary.id,
                   "address": response._embedded.propertySummaryList[i].propertySummary.address.singleLineAddress,
                   "img" : response._embedded.propertySummaryList[i].propertySummary.propertyPhoto.largePhotoUrl,
                   "bedrooms" :  response._embedded.propertySummaryList[i].propertySummary.attributes.bedrooms,
                   "bathrooms" : response._embedded.propertySummaryList[i].propertySummary.attributes.bathrooms,
                   "parking" : response._embedded.propertySummaryList[i].propertySummary.attributes.carSpaces,
                   "price" : price
               }
            }
     
            this.setState({listing: listingArray})
        }.bind(this));
    }

   render() {

        
        
       if(this.state.listing != undefined){
           
             return(
                 <div className="wrapper"> <Listing list={this.state.listing}/>   </div>
            )
         
       }
       else{

           return  <div className="wrapper"><div>Loading...</div></div>
       }
      
       
   }
}

export default Listings;