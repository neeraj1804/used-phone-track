import React, { Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Importing Actions */
import * as actions from '../../actions';

/* Importing Layouts */
import PrimaryLayout from '../../components/layout/PrimaryLayout';

/* Importing Styles */
import styles from './App.pcss';

function App(props) {
    let routes = (
		<Switch>
			<Route path="/" component={PrimaryLayout} />
			<Redirect to="/" />
		</Switch>
	);
	return (
		<Suspense fallback={<div>Loading...</div>}>
            <div className={styles.App}>
				{routes}
			</div>
		</Suspense>
	);
}

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);