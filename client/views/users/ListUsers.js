import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Importing Custom Components */
import GMap from '../../components/gmap/GMap';

/* Importing Actions */
import * as actions from '../../actions';

/* Importing Styles */
import styles from './ListUsers.pcss';

const ListUsers = (props) => {
    const [users, setUsers] = useState(props.users);
    useEffect(() => {
        props.actions.getUsersInitiate({});
    }, []);
    useEffect(() => {
        setUsers(props.users);
    }, [props.users]);

    let elem = null, inputElem = null;

    const searchUser = () => {
        const param = elem.value;
        const val = inputElem.value.trim();
        if(param && val){
            props.actions.getUsersInitiate({
                [param]: val
            });
        }
    }

    return (
        <div className={styles.listUsersCont}>
            <div className={styles.searchCont}>
                <select ref={(e) => elem = e}>
                    <option value="">Select Search Parameter</option>
                    <option value="name">name</option>
                    <option value="count">count</option>
                </select>
                <input type="text" ref={(e) => inputElem = e} />
                <button onClick={searchUser}>Search</button>
            </div>
            <div style={{width: "50%", height: "50%"}}>
                <GMap users={users} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
	users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);