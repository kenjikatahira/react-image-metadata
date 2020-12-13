import React, { useState , useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import ImageMetadata from '../src/';

import './style.scss';

import colorado from './colorado.jpg';

const App = () => {
	const [position,setPosition] = useState([]);
	const onMetadata = (metadata) => {
		const {latitude,longitude} = metadata;
		if(latitude && longitude) {
			setPosition([latitude,longitude]);
		}
	};

	const getMap = () => {	
		return (
			<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
			<TileLayer
			  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		  </MapContainer>
		)
	}

	return (
		<div className="app">
			<div className="image-wrapper">
				<ImageMetadata onMetadata={onMetadata}>
					<img src={colorado} />
				</ImageMetadata>
			</div>
			<div className="map">
					{position.length && getMap(position)}
			</div>
		</div>
	)
}

export default App;