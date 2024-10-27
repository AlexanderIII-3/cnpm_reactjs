import './PaymentModal.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import * as actions from "../../../../store/actions";
import Select from 'react-select';

import _, { times } from 'lodash';
import { LANGUAGES } from '../../../../utils';
import DatePicker from '../../../../components/Input/DatePicker';
import { postPatentAppointment, handleSaveBill } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class PaymentModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cusId: '',
            nameCus: '',
            phoneNumber: '',
            address: '',
            payment: '',
            email: '',
            isShowLoading: false,
            payment: [],
            selectedPayment: {}
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {

            let arrPayment = this.props.paymentType

            this.setState({
                payment: this.buildDataPayment(arrPayment),

            })
        } if (prevProps.userInfo !== this.props.userInfo) {

            let user = this.props.userInfo
            if (user) {
                let nameCus = await this.buildCustomerName(user);
                this.setState({
                    nameCus: nameCus,
                    phoneNumber: user.user.phoneNumber


                })
            }
        }



    }
    buildDataPayment = (data) => {
        let dataPayment = data.resPayment

        let result = [];

        if (dataPayment && dataPayment.length > 0) {
            dataPayment.map(item => {
                let object = {};
                object.label = item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })

            return result;


        }
    }
    handleChange = selectedPayment => {
        this.setState({ selectedPayment })
    };
    async componentDidMount() {
        await this.props.getRequiredDoctorInfor()

        let dataPayment = this.props.paymentType;
        let payment = await this.buildDataPayment(dataPayment)
        this.setState({
            payment: payment
        })



        let user = this.props.userInfo
        if (user) {
            let nameCus = await this.buildCustomerName(user);
            this.setState({
                nameCus: nameCus,
                phoneNumber: user.user.phoneNumber,
                cusId: user.user.id,
                email: user.user.email

            })
        }


    }



    handleOnchange = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        });
    }

    handleViewBill = (userId) => {
        if (this.props.history) {
            this.props.history.push(`/detail-drink/${userId}`);

        }
    };

    buildCustomerName = (dataName) => {
        let data = dataName.user
        if (dataName && !_.isEmpty(dataName)) {

            let name = `${dataName.user.lastName} ${dataName.user.firstName}`




            return name;


        }
        return ''
    };
    handleSaveBill = async () => {
        let { nameCus, cusId, phoneNumber, address, selectedPayment } = this.state
        let formatDate = moment(new Date()).startOf('day').valueOf();
        let { listOder } = this.props;
        let result = [];
        if (!nameCus || !phoneNumber || !address) {
            toast.error('Missing parameter!')
            return;

        }
        if (selectedPayment && _.isEmpty(selectedPayment)) {
            toast.error("Invalid Slected Payment!")
            return;


        }
        if (listOder && listOder.length > 0) {
            listOder.map(item => {
                let object = {};
                object.cusId = cusId
                object.date = formatDate
                object.nameDrink = item.nameDrink
                object.price = item.price
                object.size = item.size
                object.amount = item.amount
                object.address = address
                object.phoneNumber = phoneNumber
                object.nameCus = nameCus
                object.payment = selectedPayment.value
                result.push(object)
            })
        }
        let res = await handleSaveBill({
            arrDrink: result,
            cusId: cusId,
            date: formatDate,
            nameCus: nameCus,
        })
        this.setState({ isShowLoading: true })
        if (res && res.errorCode === 0) {

            toast.success("Creat Bill Successfully")
            this.setState({ isShowLoading: false })


        }
        else {
            toast.error("Creat Bill falled!")

        }
        this.props.isCloseModal(false)



    };
    render() {

        let { isOpenModal, isCloseModal, listOder } = this.props;
        console.log('check pyemtntype', listOder)
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading...'
            >
                <Modal

                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>Xác nhận thông tin giao hàng

                            </span>
                            <span
                                onClick={isCloseModal}
                                className='right'><i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataScheduleModal)} */}


                            <div className='row'>
                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.full-name' /></label>
                                    <input className='form-control'
                                        value={this.state.nameCus}
                                        onChange={(event) => this.handleOnchange(event, 'fullName')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.Phone-Number' /></label>
                                    <input
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchange(event, 'phoneNumber')}
                                        className='form-control'></input>
                                </div>
                                <div className='col-6 form-group' >
                                    <label><FormattedMessage id='patient.booking.email' /></label>
                                    <input
                                        type='email'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchange(event, 'email')}
                                        className='form-control'></input>
                                </div>
                                <div className='col-6 form-group' >
                                    <label>Chọn phương thức thanh toán:</label>
                                    <Select
                                        value={this.state.selectedPayment}
                                        onChange={this.handleChange}
                                        options={this.state.payment}
                                    />


                                </div>
                                <div className='col-12 form-group' >
                                    <label><FormattedMessage id='patient.booking.address' /></label>
                                    <input
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchange(event, 'address')}
                                        className='form-control'></input>
                                </div>




                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                onClick={() => this.handleSaveBill()}
                                className='btn-booking-confirm'><FormattedMessage id='patient.booking.confirm' /></button>
                            <button onClick={isCloseModal} className='btn-booking-cancel'><FormattedMessage id='patient.booking.cancel' /></button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {


        paymentType: state.admin.allRequiredDoctorInfor,
        userInfo: state.user.userInfo,



    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModel);
