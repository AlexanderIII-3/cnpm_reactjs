import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { handleFecthCartPerCustomer, handleDeleteOder } from '../../../services/userService'
import HomeHeader from '../../HomePage/HomeHeader';
import { toast } from 'react-toastify';
import moment, { lang } from 'moment';
import './CartDrink.scss';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
import { first } from 'lodash';
import PaymentModal from './Modal/PaymentModal';
import Bill from './Bill/Bill';
class CartDrink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            currentDate: moment(new Date()).startOf('day').valueOf(),
            listOder: [],
            totalPrice: 0,
            isOpenModal: false,
            allDays: [],


        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevState.listOder !== this.state.listOder) {

            this.setState({
                listOder: this.state.listOder
            });
            if (this.state.totalPrice === 0) {
                let data = this.caculationTotalPrice(this.state.listOder)
                this.setState({
                    totalPrice: data
                });

            }

        }



    }
    async componentDidMount() {
        await this.handleReloadData();
        let allDays = await this.getArrDays();
        this.setState({
            allDays: allDays
        })

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
            if (i == 6) {
                object.lable = 'Tất Cả'
                object.value = "ALL"
            }
            allDays.push(object);
        }
        return allDays


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
            let res = await handleFecthCartPerCustomer(data)
            if (res && res.errorCode === 0) {
                this.setState({
                    listOder: res.data
                })
                if (this.state.totalPrice === 0) {
                    let data = this.caculationTotalPrice(this.state.listOder)
                    this.setState({
                        totalPrice: data
                    }, console.log('check data totla', data));

                }


            }




        }

    };
    handleAddDrink = (name) => {
        let copyState = { ...this.state }
        copyState[name] = +copyState[name] + 1;


        this.setState({
            ...copyState
        })
    };



    caculationTotalPrice = (totalArr) => {

        let DataTotalPrice = this.state.totalPrice

        totalArr.map(item => {

            if (item.priceTypeData1.valueEn && item.size && item.amount) {
                if (item.size === "S") {
                    DataTotalPrice += +item.priceTypeData1.valueEn * item.amount
                }
                if (item.size === "M") {
                    DataTotalPrice += (+item.priceTypeData1.valueEn + 10000) * item.amount
                }
                if (item.size === "L") {
                    DataTotalPrice += (+item.priceTypeData1.valueEn + 20000) * item.amount
                }
                if (item.size === "XL") {
                    DataTotalPrice += (+item.priceTypeData1.valueEn + 30000) * item.amount
                }



            }



        })
        return DataTotalPrice;






    };
    handleViewModal = () => {
        this.setState({
            isOpenModal: true,
        })
        this.handleReloadData()
    };
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
    isCloseModal = () => {
        this.setState({
            isOpenModal: false
        })
    }
    handleViewBll = (userId) => {
        if (this.props.history) {
            this.props.history.push(`/viewBill/${userId}`);

        }
    };
    handleGetAllBill = async () => {
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
            let res = await handleFecthCartPerCustomer(data)
            if (res && res.errorCode === 0) {
                this.setState({
                    listOder: res.data
                })
                if (this.state.totalPrice === 0) {
                    let data = this.caculationTotalPrice(this.state.listOder)
                    this.setState({
                        totalPrice: data
                    }, console.log('check data totla', data));

                }


            }



        }
    };
    handleDeleteOder = async (item) => {
        let data = await handleDeleteOder(item.id)
        if (data && data.errorCode === 0) {
            await this.handleReloadData();
            toast.success("Delete Success")
        } else {
            toast.error("Delete Falled")
        }
    };
    handleReloadData = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                userId: id
            })
            let formatedDate = 'ALL'
            let data = {
                date: formatedDate,
                id: id,
            }
            let res = await handleFecthCartPerCustomer(data)
            if (res && res.errorCode === 0) {
                this.setState({
                    listOder: res.data
                })
                if (this.state.totalPrice === 0) {
                    let data = this.caculationTotalPrice(this.state.listOder)
                    this.setState({
                        totalPrice: data
                    }, console.log('check data totla', data));

                }


            }



        }
    };
    handleRedicrect = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);

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


            let res = await handleFecthCartPerCustomer(data)
            if (res && res.errorCode === 0) {
                this.setState({
                    listOder: res.data
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
    handleImage = (image) => {
        let dataImage = new Buffer.from(image, 'base64').toString('binary')
        return dataImage;
    };
    render() {
        let { allDays, listOder, currentDate, totalPrice } = this.state;
        console.log('check list oder', listOder)

        //date font
        let date = moment(currentDate).format('MM/DD/YYYY');
        return (
            < >
                <HomeHeader />
                <div class="container">
                    <div class="row">
                        <div className=' col-xl-8 oder-days'>
                            <div>Danh sách oder theo ngày:</div>
                            <div>
                                <select onChange={(event) => this.handleOnchangeSelect(event)}>
                                    {allDays && allDays.length > 0 &&
                                        allDays.map((item, index) => {
                                            return (
                                                <option value={item.value} key={index}>{item.lable}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>

                        </div>


                        <div class="col-xl-8">

                            {listOder && listOder.length > 0
                                && listOder.map((item, index) => {


                                    let totalPrice = this.caculationPrice(item.size, item.priceTypeData1.valueEn, item.amount)
                                    {/* this.setState({ totalPrice: totalPrice }) */ }


                                    let dataImage = ''

                                    if (item.ListDish) {
                                        let dataImg = this.handleImage(item.ListDish.image.data)
                                        dataImage = dataImg
                                    }
                                    else {
                                        dataImage = '';
                                    }



                                    return (

                                        <>
                                            <div class="card border shadow-none">
                                                <div class="card-body">

                                                    <div class="d-flex align-items-start border-bottom pb-3">
                                                        <div class="me-4">
                                                            <div className='avatar-lg rounded'
                                                                style={{ backgroundImage: `url(${dataImage})` }}

                                                            ></div>

                                                            {/* <img src="" alt="" class="avatar-lg rounded" /> */}
                                                        </div>
                                                        <div class="flex-grow-1 align-self-center overflow-hidden">
                                                            <div>
                                                                <h5 class="text-truncate font-size-18"><a href="#" class="text-dark">{item && item.nameDrink ? item.nameDrink : ''} </a></h5>

                                                                <p class="mb-0 mt-1">Size : <span class="fw-medium">{item && item.size ? item.size : ''}</span></p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button onClick={() => this.handleDeleteOder(item)} ><i className="fa-solid fa-trash"></i></button>
                                                        </div>
                                                        <div class="flex-shrink-0 ms-2">
                                                            <ul class="list-inline mb-0 font-size-16">
                                                                <li class="list-inline-item">
                                                                    <a href="#" class="text-muted px-1">
                                                                        <i class="mdi mdi-trash-can-outline"></i>
                                                                    </a>
                                                                </li>
                                                                <li class="list-inline-item">
                                                                    <a href="#" class="text-muted px-1">
                                                                        <i class="mdi mdi-heart-outline"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="mt-3">
                                                                    <p class="text-muted mb-2">Giá</p>
                                                                    <h5 class="mb-0 mt-2"><span class="text-muted me-2">{item && item.priceTypeData1.valueEn ?
                                                                        <NumberFormat
                                                                            value={item.priceTypeData1.valueEn}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' VNĐ'} />
                                                                        : ''



                                                                    }</span></h5>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <div class="mt-3">
                                                                    <p class="text-muted mb-2">Số lượng</p>
                                                                    <div class="d-inline-flex">
                                                                        {item && item.amount ? item.amount : ''}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="mt-3">
                                                                    <p class="text-muted mb-2">Tổng giá</p>
                                                                    <h5>{totalPrice ?
                                                                        <NumberFormat
                                                                            value={totalPrice}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' VNĐ'} />
                                                                        : ''

                                                                    }




                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </>
                                    )

                                })
                            }






                            <div class="row my-4">
                                <div class="col-sm-6">
                                    <span className='render-home active' onClick={() => this.handleRedicrect()}>
                                        <i class="mdi mdi-arrow-left me-1"></i> Continue Shopping
                                    </span>

                                </div>
                                <div class="col-sm-6">
                                    {
                                        listOder && listOder.length > 0 ?
                                            <div class="text-sm-end mt-2 mt-sm-0">

                                                <i class="mdi mdi-cart-outline me-1"></i> <button

                                                    onClick={() => this.handleViewModal()}
                                                >Thanh Toán</button>
                                            </div>
                                            :
                                            <div class="text-sm-end mt-2 mt-sm-0">
                                                <div className='infomation'>Hiện không có oder nào!</div>
                                                <i class="mdi mdi-cart-outline me-1"></i> <button

                                                    onClick={() => this.handleViewBll(this.state.userId)}
                                                >Xem hoá đơn</button>
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                        {/* Totaol prices */}


                        {/* {totalPrice && listOder */}
                        <div div class="col-xl-4">
                            <div class="mt-5 mt-lg-0">
                                <div class="card border shadow-none">

                                    <div class="card-header bg-transparent border-bottom py-3 px-4">
                                        <h5 class="font-size-16 mb-0">Thống Kê: <span class="float-end">{
                                            currentDate ? date : ''



                                        }</span></h5>
                                    </div>

                                    <div class="card-body p-4 pt-2">

                                        <div class="table-responsive">
                                            <table class="table mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>Tổng giá đồ :</td>
                                                        <td class="text-end">{totalPrice ?
                                                            <NumberFormat
                                                                value={totalPrice}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={' VNĐ'} />
                                                            :
                                                            ''}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Phí ship :</td>
                                                        <td class="text-end">
                                                            {
                                                                totalPrice ?
                                                                    <NumberFormat
                                                                        value={30000}
                                                                        displayType={'text'}
                                                                        thousandSeparator={true}
                                                                        suffix={' VNĐ'} />
                                                                    :
                                                                    'Vui lòng thêm oder'

                                                            }

                                                        </td>
                                                    </tr>

                                                    <tr class="bg-light">
                                                        <th>Tổng :</th>
                                                        <td class="text-end">
                                                            <span class="fw-bold">
                                                                {

                                                                    totalPrice ? <NumberFormat
                                                                        value={30000 + totalPrice}
                                                                        displayType={'text'}
                                                                        thousandSeparator={true}
                                                                        suffix={' VNĐ'} />
                                                                        :
                                                                        ''

                                                                }


                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <PaymentModal
                    isOpenModal={this.state.isOpenModal}
                    isCloseModal={this.isCloseModal}
                    listOder={this.state.listOder}
                />

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        language: state.app.language,
        userInfo: state.user.userInfo,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDrink));
