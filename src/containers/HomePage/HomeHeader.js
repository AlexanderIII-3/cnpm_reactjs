import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo2 from '../../assets/logo2.jpg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from 'react-router';


class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);

        }
    }

    render() {

        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            {/* <img src={logo} /> */}
                            <div className='header-logo' onClick={() => this.returnHome()}>


                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div className='box'>Anh Gió Tai Xin Chào</div>
                            </div>

                        </div>

                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-banner-container'>
                        <div className='content-up'>
                            <div className='title1'>Cửa Hàng Alex Drink Xin Chào</div>
                            <div className='title2'>Danh Sách Các Loại Nước Của Quán</div>

                        </div>
                        <div className='content-down'>

                        </div>

                    </div>
                }
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
