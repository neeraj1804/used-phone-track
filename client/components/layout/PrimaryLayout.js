import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* Importing Components */
import Header from '../header/Header';
import ListPage from '../../views/users/ListUsers';
import Footer from '../footer/Footer';

/* Importing Styles */
import styles from './PrimaryStyles.pcss';

const PrimaryLayout = ({ match }) => {
	return (
		<div className={styles.primaryLayoutCont}>
			<Header />
			<main>
				<Switch>
					<Route path={`${match.path}`} exact component={ListPage} />
					<Redirect to={`${match.path}`} />
				</Switch>
			</main>
            <Footer />
		</div>
	);
}

export default PrimaryLayout;