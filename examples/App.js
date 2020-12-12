import React, {Component} from 'react';
import ImageMetadata from '../src/'

import './style.scss';

import photo from './IMG_2383.jpg';

class App extends Component {
	render() {
		return (
			<div>
				<h1>My React App</h1>
				<ImageMetadata
					onMetadata={(metadata) => console.log(metadata)}
					onError={(error) => console.log(error)}
					rotata={false}
				>
					<img 
						src={photo}
					/>
				</ImageMetadata>
			</div>
		)
	}
}

export default App;