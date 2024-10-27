import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let { userInfo } = this.props
        if (userInfo && userInfo.user.roleId === "R2") {
            let linkToRedirect = isLoggedIn ? '/home' : '/system/user-redux';
            console.log('check link redirect to ', linkToRedirect)
        }
        let linkToRedirect = isLoggedIn ? '/system/user-redux' : '/home';
        console.log('check link redirect to ', linkToRedirect)
        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
