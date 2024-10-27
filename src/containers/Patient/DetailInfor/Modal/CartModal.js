import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import * as actions from "../../../../store/actions";
import './CartModal.scss';
import _, { times } from 'lodash';
import { LANGUAGES } from '../../../../utils';

import moment from 'moment';

class CartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isShowLoading: false
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    // handleChange = selectedGender => {
    //     this.setState({ selectedGender })
    // };
    async componentDidMount() {
        this.props.getGenderStart();


    }
    // setPriceDoctor = (data) => {
    //     if (this.props.language === LANGUAGES.VI) {
    //         data.priceTypeData.value.Vi
    //     }
    // };








    render() {

        let { dataScheduleModal, isOpenModal, isCloseModal } = this.props;
        // if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
        //     doctorId = dataScheduleModal.doctorId
        // }
        return (

            <Modal

                isOpen={true}
                className={'booking-modal-container'}
                size='lg'
                centered
            >

                <div className='cart-modal-container'>

                    <div className='cart-modal-body'>
                        <div className='cart-header'>

                        </div>
                        <div className='cart-body'></div>
                    </div>
                </div>

            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        genderRedux: state.admin.genders,



    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getGenderStart: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
