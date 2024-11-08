import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import * as actions from "../../../../store/actions";
import './Bill.scss';
import _, { isElement, times } from 'lodash';
import { LANGUAGES } from '../../../../utils';
import { handleGetAllBill, handleSaveCusBill } from '../../../../services/userService';

import HomeHeader from '../../../HomePage/HomeHeader';
import moment from 'moment';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            listOder: [],
            currentDate: moment(new Date()).startOf('day').valueOf(),
            isShowLoading: false,
            payment: [],
            totalPrice: 0,
            status: false,
            infor: [],
            allDays: []
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.userId !== this.state.userId) {
            await this.handleReloadData()
        };
        if (prevState.listOder !== this.state.listOder) {
            let payment = this.setPaymentMethod(this.state.listOder)
            let infor = this.setAddress(this.state.listOder)
            this.setState({
                payment: payment,
                infor: infor
            })
        }
        // if (prevState.totalPrice !== this.state.totalPrice) {
        //     this.submitCharge()
        // }

    }
    async componentDidMount() {
        await this.handleReloadData()



    }
    caculationPrice = (size, price, amount) => {
        let totalPrice = 0
        if (size === "S") {
            totalPrice = +price * amount
        }
        if (size === "M") {
            totalPrice = (+price + 10000) * amount
        }
        if (size === "L") {
            totalPrice = (+price + 20000) * amount
        }
        if (size === "XL") {
            totalPrice = (+price + 30000) * amount
        }
        // this.setState({
        //     totalPrice: totalPrice
        // })

        return totalPrice
    }
    handleReloadData = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                userId: id
            })
            let formatedDate = new Date(this.state.currentDate).getTime();

            let data = {
                date: formatedDate,
                id: id,
            }
            let res = await handleGetAllBill(data)
            if (res && res.errorCode === 0) {
                this.setState({
                    listOder: res.data,
                })
                if (this.state.totalPrice === 0) {
                    let data = this.caculationTotalPrice(this.state.listOder)
                    this.setState({
                        totalPrice: data
                    });

                }


            }




        }
    };
    caculationTotalPrice = (totalArr) => {

        let DataTotalPrice = this.state.totalPrice

        totalArr.map(item => {

            if (item.priceTypeDataBill.valueEn && item.size && item.amount) {
                if (item.size === "S") {
                    DataTotalPrice += +item.priceTypeDataBill.valueEn * item.amount
                }
                if (item.size === "M") {
                    DataTotalPrice += (+item.priceTypeDataBill.valueEn + 10000) * item.amount
                }
                if (item.size === "L") {
                    DataTotalPrice += (+item.priceTypeDataBill.valueEn + 20000) * item.amount
                }
                if (item.size === "XL") {
                    DataTotalPrice += (+item.priceTypeDataBill.valueEn + 30000) * item.amount
                }



            }



        })
        return DataTotalPrice;






    };



    setPaymentMethod = (pyamentMethod) => {
        let result = [];

        if (pyamentMethod && pyamentMethod.length > 0) {
            pyamentMethod.map((item, index) => {
                let object = {}

                object.lable = item.paymentData.valueEn
                object.value = item.payment
                result.push(object)
            })
            return result;

        }

    };


    submitCharge = async () => {
        this.setState({
            status: true,
            totalPrice: 0
        })
        await this.handleClearBill();
        await this.handleReloadData()



    }
    handleRedicrect = () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            if (this.props.history) {
                this.props.history.push(`/handle-view-cus-bill/${id}`);

            }
        }

    };
    handleClearBill = async () => {
        let { listOder } = this.state
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let result = [];
            {
                listOder && listOder.length > 0 &&
                    listOder.map(item => {
                        let object = {};
                        object.cusId = item.cusId;
                        object.nameCus = item.nameCus;
                        object.nameDrink = item.nameDrink;
                        object.size = item.size;
                        object.date = this.state.currentDate;
                        object.price = item.price;
                        object.amount = item.amount;
                        result.push(object);

                    })

            }
            let res = await handleSaveCusBill({

                listOder: result,
                cusId: id,
                date: this.state.currentDate
            })
            if (res && res.errorCode === 0) {
                await this.handleReloadData();
            }

        }

    }
    setAddress = (infor) => {
        let result = [];

        if (infor && infor.length > 0) {
            infor.map((item, index) => {
                let object = {}

                object.name = item.nameCus
                object.phone = item.phoneNumber
                object.address = item.address

                result.push(object)
            })
            return result;

        }
    }
    getArrDays = () => {
        let allDays = [];

        for (let i = 0; i < 7; i++) {
            let object = {};

            if (i === 0) {
                let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
                let today = `Hôm nay - ${ddMM}`
                object.lable = today;

            } else {
                let labelVi = moment(new Date()).subtract(i, 'days').format('dddd - DD/MM');
                object.lable = labelVi
            }





            object.value = moment(new Date()).subtract(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }
        return allDays


    }


    render() {
        let listOder = this.state.listOder;
        let payment = listOder.payment;
        let paymentMethod = this.state.payment && this.state.payment[0];
        let infor = this.state.infor && this.state.infor[0];






        return (
            <>
                <HomeHeader />
                <div className='bill-container'>
                    <div className='content-left'>

                        <div className='bill-header'>
                            <strong>Hoá đơn </strong>
                        </div>
                        <div className='bill-body'>
                            <ol class="alternating-colors">

                                {listOder && listOder.length > 0 &&

                                    listOder.map((item, index) => {



                                        let totalPrice = this.caculationPrice(item.size, item.priceTypeDataBill.valueEn, item.amount)
                                        return (
                                            <li key={index.key}>
                                                <strong>{item.nameDrink ? item.nameDrink : ''}</strong>
                                                <div className='infomation'>
                                                    <p><strong>Số lượng: </strong> {item.amount ? item.amount : ''}</p>;
                                                    <p><strong>Size: </strong> {item.size ? item.size : ''}</p>;
                                                    <p> <strong>Giá Cả: </strong>{item.priceTypeDataBill && item.priceTypeDataBill.valueEn

                                                        ?
                                                        <NumberFormat
                                                            value={totalPrice}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={' VNĐ'} />

                                                        : ''}</p>

                                                </div>

                                            </li>
                                        )

                                    })
                                }


                            </ol>
                        </div>


                    </div>


                    <div className='content-right'>
                        <div className='right-head'>
                            <strong>Các loại chi phí:</strong>
                        </div>
                        <div className='right-body'>

                            <div className="total-price">
                                <div>


                                    <div className='price-child'>
                                        <strong>
                                            Tiền đồ uống :  <span>
                                                {this.state.totalPrice ? <NumberFormat
                                                    value={this.state.totalPrice}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' VNĐ'} />
                                                    :
                                                    ''}</span>
                                        </strong>
                                    </div>
                                    <div className='price-child'>
                                        <strong>
                                            Tiền Ship :  <span>
                                                {this.state.totalPrice ? <NumberFormat
                                                    value={30000}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' VNĐ'} />
                                                    :
                                                    ''}</span>
                                        </strong>
                                    </div>
                                    <div className='price-child'>
                                        <strong>
                                            Thanh toán :  <span>
                                                {this.state.totalPrice ? <NumberFormat
                                                    value={this.state.totalPrice + 30000}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' VNĐ'} />
                                                    :
                                                    ''}</span>
                                        </strong>
                                    </div>


                                    {paymentMethod && paymentMethod.value === 'PAY1' &&
                                        <div className='price-child'>
                                            <strong>
                                                Phương thức thanh toán:  <span>{paymentMethod ? paymentMethod.lable : ''}</span>
                                            </strong>
                                        </div>

                                    }
                                    {paymentMethod && paymentMethod.value === "PAY2" &&
                                        <div className='price-child'>
                                            <strong>
                                                Phương thức thanh toán:  <span>{paymentMethod ? paymentMethod.lable : ''}</span>
                                            </strong>
                                            <div className='image-QR'></div>

                                        </div>

                                    }
                                </div>

                                <div className='address'>


                                    <div className='address-cus'>
                                        <strong>Anh/Chi: </strong>
                                        <span>{infor ? infor.name : ''} </span>
                                        <strong>Địa chỉ:  </strong>
                                        <span>{infor ? infor.address : ''}  </span>
                                        <strong>Số điện thoại: </strong>
                                        <span>{infor ? infor.phone : ''}</span>
                                    </div>


                                </div>
                                <div className='confirm-transfer'>

                                    {listOder && listOder.length > 0 ?

                                        <button
                                            onClick={() => this.submitCharge()}
                                        >Xác Nhận</button>

                                        :
                                        <>
                                            {
                                                this.state.status && this.state.status === true ?
                                                    <div className='state'>Thanh toán thành công đơn hàng sẽ được giao đến bạn</div>
                                                    :
                                                    ''
                                            }

                                            <div className='confirm-transfer'>

                                                <button
                                                    onClick={() => this.handleRedicrect()}
                                                >Xem Bill</button>




                                            </div>
                                        </>


                                    }
                                </div>

                            </div>

                        </div>



                    </div>





                </div>

            </>
        )
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,



    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bill);
