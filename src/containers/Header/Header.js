import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { path } from '../../utils'
import Home from '../../routes/Home';
import { Redirect } from 'react-router-dom';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, dishMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import HomePage from '../HomePage/HomePage';
// import { lang } from 'moment';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);

    };
    componentDidMount() {
        let { userInfo } = this.props;

        // phan vung ng dung
        let menu = []
        if (userInfo) {
            let role = userInfo.user.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.EMPLOYEE || role === USER_ROLE.CUSTOMER) {

                // // const { isLoggedIn } = this.props;
                // // let linkToRedirect = isLoggedIn ? '/home' : '/system/user-redux';
                // // console.log('check redireact', linkToRedirect)
                // return <Redirect to={linkToRedirect} />
                menu = dishMenu;
            }
            this.setState({
                menuApp: menu,
            })
        }
    }
    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome' >
                        <FormattedMessage id='home-header.welcome' />,
                        {userInfo.user && userInfo.user.firstName ? userInfo.user.firstName : ''}!</span
                    >
                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}

                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)} >VN</span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}

                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)} >EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,

        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
