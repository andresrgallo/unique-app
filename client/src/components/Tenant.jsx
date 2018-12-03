import React, { Component } from 'react';
import RentPayments from './RentPayments';
import './css/Tenant.css';

export default class Tenant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tenant: []
		};
	}

	//Fetch the data for individual tenants from API
	componentDidMount() {
		this.callBackendAPI()
			.then(res => res.tenant)
			.then(tenant => {
				this.setState({ tenant });
			})
			.catch(e => console.log(e));
	}
	// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
	//Access the url
	//Get the lease id
	callBackendAPI = async () => {
		var url = window.location.href;
		let leaseId = url.split('=')[1];
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/v1/leases/${leaseId}`
		);
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};

	render() {
		const { tenant } = this.state;
		const { id } = tenant;
		return (
			<div className="tenant-container">
				<h2 id="tenant-title">Payment Schedule For Lease Id - {id}</h2>
				<div id="info">
					Rent Frequency: {tenant.frequency}, Rent(week): ${tenant.rent}
				</div>

				<table id="tenant-table">
					<thead>
						<tr>
							<th>From</th>
							<th>To</th>
							<th>Days</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						<RentPayments tenant={tenant} />
					</tbody>
				</table>
			</div>
		);
	}
}
