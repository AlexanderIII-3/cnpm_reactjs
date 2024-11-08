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





    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }
    componentDidMount = () => {

        let userInfo = this.props.userInfo;
        if (userInfo) {
            this.setState({
                id: userInfo.user.id

            })
        }
    }
    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);

        }
    }
    handleRedirect = (id) => {
        if (this.props.history) {
            this.props.history.push(`/cart-drink-cus/${id}`);

        }

    }
    handleRedirectBill = (id) => {
        if (this.props.history) {
            this.props.history.push(`/viewBill/${id}`);

        }

    }

    render() {
        let language = this.props.language;
        let id = this.state.id
        console.log('check user data', this.state.id)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            {/* <img src={logo} /> */}
                            <div className='header-logo' onClick={() => this.returnHome()}>


                            </div>
                        </div>
                        {this.props.userInfo && this.props.userInfo.user &&

                            <div className='center-content'>
                                <div className='child-content'>
                                    <div
                                        onClick={() => this.handleRedirect(id)}
                                        className='box-cart'>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <div className='text-child'>Giỏ Hàng </div>
                                    </div>
                                    <div
                                        onClick={() => this.handleRedirectBill(id)}
                                        className='box-bill'>
                                        <i className="fa-solid fa-receipt"></i>
                                        <div className='text-child'>Hoá Đơn </div>
                                    </div>
                                </div>

                            </div>
                        }


                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-banner-container'>
                        <div className='content-up'>
                            {/* <div className='title1'>Cửa Hàng Alex Drink Xin Chào</div> */}
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
