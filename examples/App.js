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
	.header {
		padding-top: 30px;
		text-align:center;
	}

	.image-wrapper {
		display:flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		a {
			position:relative;
			max-width: 85%;
			max-height: 74vh;
		}
		img {
			max-width: 100%;
			max-height: 74vh;
		}
		
		.copyright {
			position:absolute;
			bottom: -25px;
			left: 0px;
			z-index:99;
			font-size: 13px;
			padding: 5px;
			color: #999;
		}
	}
	.map {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		height: 90vh;
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
		setPosition(
			{
				latitude,
				longitude,
				Flash,
				Make,
				Model,
				Copyright,
				CreateData,
				FNumber,
				LensModel,
				OffsetTime,
				Orientation,
				SceneType
			}
		)
	};

	const getMap = (position) => {
		let {latitude,longitude} = position;
		let mapPos = [latitude,longitude];
		return (
			<>
				<MapContainer center={mapPos} zoom={12} scrollWheelZoom={false}>
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
			<div key={`row-${FNumber}`}>
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
			</div>
		)
	}

	const getRow = (image,index) => {
		return(
			<>
				<div className="columns" id={`row-${index+1}`} key={`row-${index+1}`}>
					<div className="column image-wrapper">
							<a href="https://www.instagram.com/kenjica/" target="_blank">
								<ImageMetadata onMetadata={onMetadata}>
									<img src={image} />
								</ImageMetadata>
								<span className="copyright">Kenji Katahira Copyright 2020. All rights reserved.</span>
							</a>
					</div>
					<div className="column map">
						<div className="card">
							<div className="card-content">
								<div className="content">
									{(metadatas[index] || {}).hasOwnProperty('Make') && getContent(metadatas[index])}
								</div>
							</div>
							<div className="card-image">
								{(metadatas[index] || {}).hasOwnProperty('Make') && getMap(metadatas[index])}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	return (
		<StyledApp className="app">
			<div className="container is-fluid">
				<div className="header">
					<h1 className="title">react-image-metadata</h1>
					<h2 className="subtitle">A react component to get image's metadata</h2>
				</div>
				{ images.map(getRow) }
			</div>
		</StyledApp>
	)
}

export default App;