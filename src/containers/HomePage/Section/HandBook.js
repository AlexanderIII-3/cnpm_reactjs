import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions";

import { withRouter } from 'react-router';




class HandBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            handBookArr: []
        };
    }
    async componentDidMount() {
        let res = await this.props.getRequiredHandBook()
        if (res && res.errorCode === 0) {
            this.setState({
                handBookArr: res.data ? res.data : []
            })
        }

    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.handBookArr !== this.props.handBookArr) {
            this.setState({
                handBookArr: this.props.handBookArr
            })
        }
    }
    handleRestDetailHandBook = (item) => {
        console.log('check item handbook', item)

        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`);

        }
    };


    render() {
        let language = this.props.language
        let arrHandBook = this.state.handBookArr
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> {language === LANGUAGES.VI ? <FormattedMessage id="home-page.handbook" />
                            : <FormattedMessage id="home-page.handbook" />}</span>
                        <button className='btn-section'>
                            <FormattedMessage id="home-page.more-Info" /> </button>

                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            {arrHandBook && arrHandBook.length > 0 &&

                                arrHandBook.map((item, index) => {

                                    if (index === 0) {
                                        console.log(item)
                                    }
                                    let image = item.image;
                                    return (
                                        <div key={index} className='section-customize clinic-child'
                                            onClick={() => this.handleRestDetailHandBook(item)}

                                        >

                                            <div
                                                className='bg-imge bg-imge section-handbook'
                                                style={{ backgroundImage: `url(${image})` }}
                                            />

                                            <div className='clinic-name'>  {item.name}</div>
                                        </div>
                                    )
                                })


                            }


                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        handBookArr: state.admin.handBookArr


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredHandBook: () => dispatch(actions.getRequiredHandBook())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
