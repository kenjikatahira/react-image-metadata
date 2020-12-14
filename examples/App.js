import React, { useState , useEffect } from 'react';
import ImageMetadata from '../src/';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Styled from 'styled-components';
import './style.scss';

import itu from './images/itu.jpg';
import sp from './images/sp.jpg';
import salvationMountain from './images/salvation-mountain.jpg';
import colorado from './images/colorado.jpg';

const images = [itu,sp,salvationMountain,colorado];

const StyledApp = Styled.div`
	.image-wrapper {
		display:flex;
		align-items: center;
		justify-content: center;

		img {
			max-width: 85%;
			max-height: 74vh;
		}
	}
	.map {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		height: 100vh;
		.leaflet-container {
			width: 600px;
			height: 40vh;
		}
	}
`

const App = () => {
	const [metadatas, setMetadatas] = useState([]);
	const [metadata, setPosition] = useState(null);

	useEffect(() => {
		metadata && setMetadatas([...metadatas, metadata]);
	},[metadata])

	const onMetadata = (exif) => {
		const {latitude,longitude, Flash, Make, Model, Copyright, CreateData, FNumber,LensModel,OffsetTime,Orientation,SceneType} = exif;
		setPosition({latitude, longitude, Flash, Make, Model, Copyright, CreateData, FNumber,LensModel,OffsetTime,Orientation,SceneType})
	};

	const getMap = (position) => {
		let {latitude,longitude} = position;
		let mapPos = [latitude,longitude];
		return (
			<>
				<MapContainer center={mapPos} zoom={13} scrollWheelZoom={false}>
					<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={mapPos}>
						<Popup />
					</Marker>
				</MapContainer>
			</>
		)
	}

	const getContent = ({latitude, longitude, Flash, Make, Model, CreateData, FNumber,LensModel,OffsetTime,Orientation,SceneType}) => {
		return(
			<>
				<p><b>Location</b>: {latitude} , {longitude}</p>
				<p><b>Make</b>: {Make}</p>
				<p><b>Model</b>: {Model}</p>
				<p><b>Flash</b>: {Flash}</p>
				<p><b>CreateData</b>: {CreateData}</p>
				<p><b>FNumber</b>: {FNumber}</p>
				<p><b>LensModel</b>: {LensModel}</p>
				<p><b>OffsetTime</b>: {OffsetTime}</p>
				<p><b>Orientation</b>: {Orientation}</p>
				<p><b>SceneType</b>: {SceneType}</p>
			</>
		)
	}

	const getRow = (image,index) => {
		return(
			<div className="columns">
				<div className="column image-wrapper">
					<ImageMetadata onMetadata={onMetadata}>
						<img src={image} />
					</ImageMetadata>
				</div>
				<div className="column map">
					<div className="card">
						<div className="card-image">
							{(metadatas[index] || {}).hasOwnProperty('Make') && getMap(metadatas[index])}
						</div>
						<div className="card-content">
							<div className="content">
								{(metadatas[index] || {}).hasOwnProperty('Make') && getContent(metadatas[index])}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<StyledApp className="app">
			{ images.map(getRow) }
		</StyledApp>
	)
}

export default App;