import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Tenants.css';

export default class Tenants extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tenants: []
		};
	}

	//Fetch data for all Tenants from API
	componentDidMount() {
		this.callBackendAPI()
			.then(res => this.setState({ tenants: res.tenants }))
			.catch(err => console.log(err));
	}
	// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
	callBackendAPI = async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/leases`);
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};

	render() {
		const { tenants } = this.state;
		const list = tenants.map((t, index) => (
			<tr key={index}>
				<td>
					<Link to={'/leases.html?leaseId=' + (index + 1)}>{t.id}</Link>
				</td>
				<td>{t.name}</td>
			</tr>
		));

		return (
			<div className="tenants-container">
				<div className="wrapper">
					<h2 id="title">List Of Tenants</h2>
					<table id="tenants-table">
						<thead id="tenants-head">
							<tr>
								<th>Lease ID</th>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>{list}</tbody>
					</table>
				</div>
			</div>
		);
	}
}
