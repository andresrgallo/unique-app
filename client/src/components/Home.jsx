import React from 'react';
import './css/Home.css';

export default function Home() {
	return (
		<div className="home-container">
			<div className="h2-icon">
				<h1 className="hero">
					<ion-icon name="home" class="home-icon" />
				</h1>
				<h2 id="home-line">Property Managers</h2>
			</div>
		</div>
	);
}
