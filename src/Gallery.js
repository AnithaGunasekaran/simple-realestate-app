import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

class ListingGallery extends Component{

      constructor(props){
          super(props);
          console.log(this.props)
      }

      render() {
        
            const images = this.props.items;/*[
            {
                original: 'http://lorempixel.com/1000/600/nature/1/',
                thumbnail: 'http://lorempixel.com/250/150/nature/1/',
            },
            {
                original: 'http://lorempixel.com/1000/600/nature/2/',
                thumbnail: 'http://lorempixel.com/250/150/nature/2/'
            },
            {
                original: 'http://lorempixel.com/1000/600/nature/3/',
                thumbnail: 'http://lorempixel.com/250/150/nature/3/'
            }
            ];*/
            var showNav= true;
            var showBullets = true;

            return (
                <ImageGallery items={images} showNav={showNav} thumbnailPosition="bottom" showBullets={showBullets}/>
            );
      };
}

export default ListingGallery;