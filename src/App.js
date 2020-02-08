import React, {Component} from 'react';
import {apiData} from './services/apiData';
import './App.css';
import List from './components/List';
import Loader from './components/Loader';

class App extends Component {
	constructor(props){
		super(props);
		let cachedResponse = JSON.parse(sessionStorage.getItem('articles'));
		this.state={
			data: cachedResponse ? cachedResponse : null,
			loader: cachedResponse ? false : true
		};
	}

	// Fetch list of articles programatically from external API and set state accordingly
	componentDidMount(){
		if(!this.state.data){
			this.fetchData('articles');
		}
	}

	fetchData(cacheKey){
		// Fetch data from external API only when response is not already fetches from session storage
		return apiData()
			.then((response)=>{
				// Cache the API response
				sessionStorage.setItem(cacheKey, JSON.stringify(response.articles))
				this.setState({
					data: response.articles,
					loader:false,
				})
			})
			.catch(error =>
				this.setState({
					data:null,
					loader:false,
				})
			);
	}

	render(){
		return(
			<div className="container">
				{ this.state.loader ? 
					<Loader />
					:
					<div>
						{ this.state.data ? 
							<List
								data={this.state.data}
							/>
							:
							<p>Sorry, Data Unavailable!</p>
						}
					</div>
				}
			</div>
		)
	}
}

export default App;
