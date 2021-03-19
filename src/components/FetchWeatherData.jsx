import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';

class FetchWeatherData extends Component {
	state = { loading: true, weatherData: null, inputValue: '' };

	handleFetchButton = (e) => {
		if (e.key === 'Enter') {
			const userInput = e.target.value;
			const city = userInput;
			const apiKey = '544b05951bc36b26b3f3f7a03d7593f4';
			const url =
				'https://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&appid=' +
				apiKey;
			trackPromise(
				fetch(url)
					.then((res) => res.json())
					.then((result) => {
						this.setState({ weatherData: result, loading: false });
					})
			);
		}
	};

	render() {
		return (
			<div>
				<input
					ref='reference'
					type='text'
					placeholder='Search for your City'
					onKeyPress={this.handleFetchButton}></input>

				<div>
					{this.state.loading || !this.state.weatherData.name ? (
						<div>loading</div>
					) : (
						<div>{this.state.weatherData.name}</div>
					)}
				</div>
			</div>
		);
	}
}

export default FetchWeatherData;
