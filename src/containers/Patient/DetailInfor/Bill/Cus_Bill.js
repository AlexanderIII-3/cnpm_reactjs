import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import * as actions from "../../../../store/actions";
import './Cus_Bill.scss';
import { handleGetAllBillCus } from '../../../../services/userService';
import HomeHeader from '../../../HomePage/HomeHeader';
import moment from 'moment';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
class Cus_Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            currentDate: moment(new Date()).startOf('day').valueOf(),
            listOder: [],
            arrDays: [],
            nameUser: '',

        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInfo !== this.props.userInfo) {
            let user = this.props.userInfo
            let name = await this.buldName(user.user)
            this.setState({
                nameUser: name
            })
        }

    }
    async componentDidMount() {
        if (this.props.userInfo) {
            let user = this.props.userInfo
            let name = await this.buldName(user.user)
            this.setState({
                nameUser: name
            })
        }

        await this.handleReloadData();
        let arrDays = this.getArrDays();
        if (arrDays && arrDays.length > 0) {
            this.setState({
                arrDays: arrDays,
            })
        }



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
            let res = await handleGetAllBillCus(data)
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

    handleOnchangeSelect = async (event) => {
        console.log('check event data', event.target.value)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {

            let id = this.props.match.params.id;

            let data = {
                date: event.target.value,
                id: id,
            }


            let res = await handleGetAllBillCus(data)
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


    buldName = (data) => {
        let nameuser = data.lastName + " " + data.firstName;
        return nameuser
    };

    getArrDays = () => {
        let allDays = [];

        for (let i = 0; i < 7; i++) {
            let object = {};

            if (i === 0) {
                let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
                let today = `Hôm nay - ${ddMM}`
                object.lable = today;


            } else {
                let labelVi = moment(new Date()).subtract(i, 'days').locale('vi').format('dddd - DD/MM');
                object.lable = labelVi

            }






            object.value = moment(new Date()).subtract(i, 'days').startOf('day').valueOf();
            if (i == 6) {
                object.lable = 'Tất Cả'
                object.value = "ALL"
            }
            allDays.push(object);
        }
        return allDays


    }

    render() {

        let { listOder, arrDays, nameUser } = this.state;

        console.log('check arrrdays ', nameUser)



        return (
            <>
                <HomeHeader />
                <div className='cus-bill-container'>
                    <div className='cus-bill-header'>
                        <span>Bill của Anh/Chị : {nameUser ? nameUser : ''} </span>
                    </div>
                    <div className=' col-xl-8 oder-days'>
                        <div>Danh sách oder theo ngày:</div>
                        <div>
                            <select onChange={(event) => this.handleOnchangeSelect(event)}>
                                {arrDays && arrDays.length > 0 &&
                                    arrDays.map((item, index) => {
                                        return (
                                            <option value={item.value} key={index}>{item.lable}</option>

                                        )
                                    })
                                }

                            </select>
                        </div>

                    </div>
                    <div className='cus-bill-body'>


                        <div className='bill-body'>
                            <ol class="alternating-colors">
                                {listOder && listOder.length > 0 &&

                                    listOder.map((item, index) => {



                                        let totalPrice = this.caculationPrice(item.size, item.priceTypeDataBillCus.valueEn, item.amount)
                                        return (
                                            <li key={index.key}>
                                                <strong>{item.nameDrink ? item.nameDrink : ''}</strong>
                                                <div className='infomation'>
                                                    <p><strong>Số lượng: </strong> {item.amount ? item.amount : ''}</p>
                                                    <p><strong>Size: </strong> {item.size ? item.size : ''}</p>
                                                    <p> <strong>Giá Cả: </strong>{item.priceTypeDataBillCus && item.priceTypeDataBillCus.valueEn

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
                </div>

            </>
        )
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        userInfo: state.user.userInfo,



    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cus_Bill);
