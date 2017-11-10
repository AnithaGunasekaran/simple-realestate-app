import React, {Component} from 'react';
import { Link } from 'react-router';
import Listings from './Listings';


class Main extends Component{
	constructor(props) {
		super(props);
		
		
	}
    render(){
		let heroclassName = '';
		if(window.location.pathname == "/" || window.location.pathname == "/listing" || window.location.pathname == "/rent"){
			heroclassName = 'hero';
		}

       
        return( 
        <div>
            <section className={heroclassName}>
		<header>
			<div className="wrapper">
				<a href="#"><img src="img/logo.png" className="logo" alt="" titl=""/></a>
				<a href="#" className="hamburger"></a>
				<nav>
					<ul>
						<li><Link to="/rent" Component={Listings}>Rent</Link></li>
						<li><Link to="/listing" Component={Listings}>Buy</Link></li>
					</ul>
				</nav>
			</div>
		</header>

			
	</section>
            <section className="listings">
                 {this.props.children}
            </section>
        </div>
        );
    }
}

export default Main;