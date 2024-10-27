import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

import HomeFooter from './HomeFooter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListDrinkFru from "./Section/ListDrinkFru";
import './HomePage.scss';
import ListDrinkGas from './Section/ListDrinkGas';
import ListDrinkCoffe from './Section/ListDrinkCoffe';
class HomePage extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 2,

        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />

                <ListDrinkFru
                    settings={settings}
                ></ListDrinkFru>
                <ListDrinkGas
                    settings={settings}
                >

                </ListDrinkGas>
                <ListDrinkCoffe
                    settings={settings}

                />

                <HomeFooter />





            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
