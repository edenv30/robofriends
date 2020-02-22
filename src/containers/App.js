import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChagne: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
		// onRequestRobots: () => requestRobots(dispatch)
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	// onSearchChagne = (event) => {
	// 	this.setState({searchfield: event.target.value})
	// }

	render() {
		const { searchField,onSearchChagne, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		// if (!robots.length) { //robots.length === 0
		return isPending ?
			<h1>Loading</h1> :
			(
				<div className='tc'>
					<h1 className='f2'>RoboFriends</h1>
					<SearchBox searchChange={onSearchChagne} />
					<Scroll>
						<ErrorBoundary>
							<CardList robots={filteredRobots} />
						</ErrorBoundary>
					</Scroll>
				</div>
			);	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);