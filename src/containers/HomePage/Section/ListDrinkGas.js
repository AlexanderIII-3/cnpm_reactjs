import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Slider from "react-slick";
import *as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ListDrink.scss'
import NumberFormat from 'react-number-format';


class ListDrinkGas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDrink: []
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listTypeDrink !== this.props.listTypeDrink) {
            // this.props.fetchDrinkGastart('D1');


            this.setState({
                arrDrink: this.props.listTypeDrink.resGas,
            })
        }

    }
    async componentDidMount() {
        this.props.fetchDrinkGastart();
    }

    handleViewDetail = (drink) => {
        if (this.props.history) {
            this.props.history.push(`/detail-drink/${drink.id}`);

        }
    };
    render() {
        let { arrDrink } = this.state
        let settings = this.props.settings;
        return (
            <div className='section-share  section-outstanding-doctor' >
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Danh sách nước có gas</span>


                        {/* <button className='btn-section'>{language === LANGUAGES.VI ? <FormattedMessage id="home-page.more-Info" /> :
                            <FormattedMessage id="home-page.More-Info" />
                        }  </button> */}

                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>

                            {arrDrink && arrDrink.length > 0 &&

                                arrDrink.map((item, index) => {
                                    let price = ''
                                    if (item.priceTypeData) {
                                        let dataPice = item.priceTypeData.valueEn
                                        price = dataPice
                                    }
                                    if (index === 0) {
                                    }
                                    let imageBase64 = item.image;

                                    return (
                                        <div key={index} className='section-customize'
                                        >
                                            <div className='boder-customize'>
                                                <div className='outer-bg'>

                                                    <div className='bg-imge  section-customize-drink'
                                                        onClick={() => this.handleViewDetail(item)}
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />




                                                </div>
                                                <div className=' position text-center' >

                                                    <div> {item.name}</div>
                                                </div>
                                                <div className='cart-pirice'>
                                                    <span>{price ? <NumberFormat
                                                        value={price}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VNĐ'} />

                                                        :
                                                        ''
                                                    }</span>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        isLoggedIn: state.user.isLoggedIn,
        ListDrink: state.admin.listDrink,
        listTypeDrink: state.admin.listTypeDrink
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRequiredAllList: () => dispatch(actions.fetchRequiredAllListDrink()),
        fetchDrinkGastart: () => dispatch(actions.fetchDrinkGastart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDrinkGas));
