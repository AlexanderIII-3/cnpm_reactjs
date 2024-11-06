import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";

import './ManageDoctor.scss';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../../utils';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import TableListDrink from '../Admin/TableListDrink';

class ManageListDrink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            name: '',
            limitOder: '',
            previewImgUrl: '',
            avatar: '',
            action: CRUD_ACTIONS.CREATE,
            description: '',
            isOpen: false,
            //save infor doctor_infor
            listDish: [],
            listPrice: [],
            listPayment: [],
            checkData: false,
            selectedPrice: '',
            selectedPayment: '',
            selectedTypeDish: '',


        };
        // this.listenEmitter();

    }


    async componentDidMount() {
        this.props.allRequiredDoctorInfor()
        this.props.fetchRequiredAllList()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.allRequired !== this.props.allRequired) {
            let { resPrice, resPayment, resDish } = this.props.allRequired
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")

            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectDish = this.buildDataInputSelect(resDish, "DISH")

            this.setState({
                listDish: dataSelectDish,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,

            });


            // reload data
            if (prevProps.allRequired !== this.props.allRequired) {
                let { resPrice, resDish } = this.props.allRequired

                this.setState({


                    selectedPrice: resPrice && resPrice.length > 0 ? resPrice[0].keyMap : '',
                    selectedTypeDish: resDish && resDish.length > 0 ? resDish[0].keyMap : '',
                })
            }

            if (this.props.ListDrink !== prevProps.ListDrink) {

                this.setState({
                    name: '',
                    description: '',
                    action: CRUD_ACTIONS.CREATE,
                    previewImgUrl: '',

                    selectedPrice: resPrice && resPrice.length > 0 ? resPrice[0].keyMap : '',
                    selectedTypeDish: resDish && resDish.length > 0 ? resDish[0].keyMap : '',
                })
            }
        }

    }
    checkValidate = () => {
        let arr = ['description', 'name', 'avatar', 'selectedPrice', 'selectedTypeDish'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                this.setState({
                    checkData: false
                })
                alert('Missing parmeter: ' + arr[i]);
                return;






            }
            else {
                this.setState({
                    checkData: true
                })
            }
        }
    };
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {

            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            console.log('check image url: ' + objectUrl)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }

    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    };
    handleSaveContent = async () => {
        this.checkValidate();
        let { checkData, action } = this.state;
        console.log('check state data form client', this.state)
        if (checkData === true) {

            if (action === CRUD_ACTIONS.CREATE) {
                let data = await this.props.saveInforDrink({
                    // save detail doctor

                    action: this.state.action,
                    description: this.state.description,
                    name: this.state.name,
                    image: this.state.avatar,
                    limitOder: this.state.limitOder,

                    selectedPrice: this.state.selectedPrice,
                    selectedTypeDish: this.state.selectedTypeDish,


                })

                this.props.fetchRequiredAllList()

            }
            if (action === CRUD_ACTIONS.EDIT) {
                let data = await this.props.saveInforDrink({
                    id: this.state.id,
                    action: this.state.action,
                    description: this.state.description,
                    name: this.state.name,
                    image: this.state.avatar,


                    selectedPrice: this.state.selectedPrice,
                    selectedTypeDish: this.state.selectedTypeDish,



                })
                this.props.fetchRequiredAllList()


            }

        }



    }
    handleChangeSlected = async (selectedOption, name) => {
        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOption;
        this.setState({
            ...copyState,
        });

    }

    handleChangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check copy state', this.state)
        })
    };
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {

            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVI} VND`;
                    object.label = labelVi;

                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "PAYMENT") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVI;
                    object.label = labelVi;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "DISH") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVI;
                    object.label = labelVi;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }


            return result
        }
    };
    handleEditUserFromProps = (data) => {
        this.setState({

            id: data.id,
            name: data.name,
            description: data.decription,
            selectedPrice: data.price,
            selectedTypeDish: data.dishId,
            avatar: data.image,
            previewImgUrl: data.image,

            action: CRUD_ACTIONS.EDIT,



        })
    };
    onChangeInput = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
    }
    render() {


        let { listDish, listPrice, selectedTypeDish, selectedPrice, action } = this.state;
        console.log('check list all required ', this.props.ListDrink)

        let data = this.props.allRequired;
        return (
            <>
                <div className='manage-doctor-container'>



                    <div className="manage-doctor-title"  >Quản lÝ danh sách đồ uống</div>


                    <div className='more-infor'>
                        <div className='content-left form-group'>

                            <label className=''>Chọn loại đồ uống: </label>

                            <select

                                onChange={(event) => { this.onChangeInput(event, 'selectedTypeDish') }}
                                className="form-control"
                                value={selectedTypeDish} >
                                {listDish && listDish.length > 0 &&
                                    listDish.map((item, index) => {
                                        {/* { console.log('check items', item.valueVI) } */ }

                                        {/* { console.log('check index', index) } */ }
                                        return (
                                            <option key={index} value={item.value}> {item.label}</option>


                                        )



                                    })

                                }
                            </select>




                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id="admin.intro-infor" /></label>
                            <textarea
                                onChange={(event) => this.handleChangeText(event, 'description')}
                                className='form-control'

                                value={this.state.description}
                            >

                            </textarea>
                        </div>



                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.choose-price" /></label>
                            <select

                                onChange={(event) => { this.onChangeInput(event, 'selectedPrice') }}
                                className="form-control"
                                value={selectedPrice} >
                                {listPrice && listPrice.length > 0 &&
                                    listPrice.map((item, index) => {
                                        {/* { console.log('check items', item.valueVI) } */ }

                                        {/* { console.log('check index', index) } */ }
                                        return (
                                            <option key={index} value={item.value}> {item.label}</option>


                                        )



                                    })

                                }
                            </select>



                        </div>

                        <div className='col-3'>
                            <label >
                                <FormattedMessage id="manage-user.img" />
                            </label>
                            <div className='preview-img-container'>
                                <input
                                    onChange={(event) => this.handleOnchangeImage(event)}

                                    id='previewImg' type='file' hidden />
                                <label className='label-upload' htmlFor='previewImg'>Tải Ảnh <i className='fas fa-upload'></i></label>
                                <div className='preview-image'

                                    style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                    onClick={() => this.openPreviewImg()} >  </div>
                            </div>

                        </div>



                        <div className='col-4 form-group'>
                            <label>Tên đồ uống</label>
                            <input
                                onChange={(event) => this.handleChangeText(event, 'name')}
                                value={this.state.name}
                                className='form-control'></input>
                        </div>
                        <div className='col-2 form-group'>
                            <label>Số lượng:</label>
                            <input
                                onChange={(event) => this.handleChangeText(event, 'limitOder')}
                                value={this.state.limitOder}
                                className='form-control'></input>
                        </div>


                    </div>



                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }


                    <button
                        onClick={() => this.handleSaveContent()}
                        className={action === CRUD_ACTIONS.EDIT ? 'save-content-doctor' : 'create-content-doctor'}>
                        {action === CRUD_ACTIONS.EDIT ?
                            <FormattedMessage id="admin.save" />
                            :
                            <FormattedMessage id="admin.add" />}</button>
                </div>
                <div>
                    <TableListDrink
                        handleEditUserFromProps={this.handleEditUserFromProps}
                    ></TableListDrink>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        allRequired: state.admin.allRequiredDoctorInfor,
        ListDrink: state.admin.listDrink

    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveInforDrink: (data) => dispatch(actions.saveInforDrink(data)),
        allRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        fetchRequiredAllList: () => dispatch(actions.fetchRequiredAllListDrink()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageListDrink);
