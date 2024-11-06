import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { getDetailDrinkById, handleAddToCart } from '../../../services/userService'
import HomeHeader from '../../HomePage/HomeHeader';
import { toast } from 'react-toastify';
import moment, { lang } from 'moment';
import CartModal from './Modal/CartModal';
import './DetailDrink.scss';
import { first } from 'lodash';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';

class DetailDrink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDrink: {},
            countDrink: 0,
            currentDrinkId: -1,
            size: '',
            price: '',
            nameUser: '',
            name: '',
            idUser: '',
            drinkId: '',
            date: moment(new Date()).startOf('day').valueOf()
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.detailDrink !== this.state.detailDrink) {
            this.setState({
                detailDrink: this.state.detailDrink,


            });
            if (this.state.detailDrink) {
                let { detailDrink } = this.state;
                this.setState({
                    price: detailDrink.price,
                    name: detailDrink.name
                })
            }
            await this.handleReload();


        }




    }
    async componentDidMount() {
        await this.handleReload();



    }
    handleReload = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            this.setState({
                currentDrinkId: +this.props.match.params.id
            })
            let data = await getDetailDrinkById(id);

            if (data && data.errorCode === 0) {
                this.setState({
                    detailDrink: data.data,
                });
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
    handleDecDrink = (name) => {
        let copyState = { ...this.state }
        if (this.state.countDrink === 0) {
            copyState[name] = 0;
            this.setState({
                ...copyState
            })
            return;
        }
        if (+this.state.countDrink > 0) {

            copyState[name] = +copyState[name] - 1;


            this.setState({
                ...copyState
            }, () => console.log('check state', this.state.countDrink))
        }

    };
    checkValidate = () => {

        let check = ['countDrink', 'size', 'pirce', 'name'];
        for (let i = 0; i < check.length; i++) {
            if (!this.state[check[i]]) {
                alert("Missing parameter! '" + check[i])
                return;
            }
        }



    };
    onchangInput = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value;
        this.setState({ ...copyState });
    }
    chooseSize = (name, nameSize) => {
        let copyState = { ...this.state };
        copyState[name] = nameSize.toString();
        this.setState({ ...copyState })


    };
    handleSaveInforUser = async () => {

        let data = await this.props.userInfo
        if (data) {
            let result = [];
            let data = this.props.userInfo.user;
            let firstName = data.firstName;
            let lastName = data.lastName;
            result.lable = firstName + ' ' + lastName;
            this.setState({
                nameUser: result.lable,
                idUser: data.id
            })
            if (this.state.nameUser && this.state.nameUser.length > 0) {
                let res = await handleAddToCart({
                    idUser: this.state.idUser,
                    nameUser: this.state.nameUser,
                    name: this.state.name,
                    price: this.state.price,
                    size: this.state.size,
                    drinkId: this.state.currentDrinkId,
                    amount: this.state.countDrink,
                    date: this.state.date
                });
                if (res && res.errorCode === 0) {
                    toast.success('Add To Cart Success!')
                    await this.handleReload();
                } else {
                    toast.error('Add To Cart Falled!')
                }

            }






        }
        else {
            this.setState({
                nameUser: ''
            })
        }
    };
    viewCart = () => {

        if (this.props.history) {
            let userInfo = this.props.userInfo
            if (userInfo && userInfo.user) {
                this.props.history.push(`/cart-drink-cus/${userInfo.user.id}`);

            }
            console.log('check uset infor', userInfo.user)

        }
    }
    render() {
        let { detailDrink } = this.state;
        console.log('check dedtail drink', detailDrink)
        // date back


        return (
            < >
                <HomeHeader />
                <div className='detail-drink-container'>
                    <div className='detail-drink-body'>
                        {/* <div className='detail-drink-header' >
                            Detail drink fruit
                        </div> */}
                        <div className='detail-body'>
                            <div className='content-left '


                            >
                                <div className='image-drink'
                                    style={{ backgroundImage: `url(${detailDrink.image})` }}
                                ></div>



                            </div>
                            <div className='content-right'>
                                <div className='content-up'>
                                    <div className='descipton'>
                                        <i className="fa-solid fa-mug-hot"></i>
                                        <span>{detailDrink && detailDrink.name ? detailDrink.name : ''}</span>

                                        <div className='note'>{detailDrink && detailDrink.decription ? detailDrink.decription : ''}</div>
                                    </div>
                                    <div className='rate'>
                                        <span className='point'>
                                            4.9đ
                                        </span>
                                        <div className='star'>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div className='rate-customer'><span>Đánh giá từ khách hàng!</span></div>

                                    </div>
                                    <div className='price'>
                                        {detailDrink && detailDrink.priceTypeData ?
                                            <NumberFormat
                                                value={detailDrink.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VNĐ'} />


                                            : ''}
                                    </div>
                                    <div className='type'>
                                        <div className='type-content'> Loại Đồ Uống: </div>
                                        <span>{detailDrink && detailDrink.dishTypeData ? detailDrink.dishTypeData.valueEn : ''

                                        }</span>

                                    </div>
                                    <div className='limit-oder'>
                                        <div className='limit'>Tồn kho: </div>
                                        <span>{detailDrink && detailDrink.limitOder ? detailDrink.limitOder : 'Hiện tại đang hết mặt hàng này!'}</span>
                                    </div>

                                </div>
                                <div className='content-down btn'>
                                    <div className='list-size '>
                                        <button onClick={() => this.chooseSize('size', 'S')}
                                            className={this.state.size === "S" ? 'button active' : 'button '} >


                                            S</button>
                                        <button onClick={() => this.chooseSize('size', 'M')}
                                            className={this.state.size === "M" ? 'button active' : 'button '}>M</button>
                                        <button onClick={() => this.chooseSize('size', 'L')}
                                            className={this.state.size === "L" ? 'button active' : 'button '}>L</button>
                                        <button onClick={() => this.chooseSize('size', 'XL')}
                                            className={this.state.size === "XL" ? 'button active' : 'button '}>XL</button>

                                    </div>
                                    <div className='count'>
                                        <div className='count-content'>Số Lượng</div>
                                        <button
                                            onClick={() => this.handleDecDrink('countDrink')}> - </button>
                                        <input
                                            onChange={(event) => this.onchangInput(event, 'countDrink')}
                                            type='text'
                                            value={this.state.countDrink}></input>
                                        <button
                                            onClick={(event) => this.handleAddDrink('countDrink')}> + </button>
                                    </div>
                                    <div className='add-cart'>

                                        {detailDrink && detailDrink.limitOder ?
                                            <button
                                                onClick={() => this.handleSaveInforUser()}
                                            ><i className="fa-solid fa-cart-shopping"></i>Them vao gio</button>
                                            : ''}
                                        <button
                                            onClick={() => this.viewCart()}
                                        ><i className="fa-solid fa-cart-shopping"></i>Xem gio hang</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDrink));
