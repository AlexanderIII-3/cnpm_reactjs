import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './UserRedux.scss';
import * as actions from "../../../store/actions";
import TableManageUser from './TableManageUser';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { first } from 'lodash';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {

            roleArr: [],





            userId: '',
            email: '',
            password: '',
            phoneNumber: '',
            role: '',
            firstName: ' ',
            lastName: '',
            action: CRUD_ACTIONS.CREATE


        }

    }

    async componentDidMount() {

        await this.props.getRoleStart();
        this.props.getAllUserStart();

    }
    // MATCH STATE IN REDUX TO REACT
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({

                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }


        // reload data 
        if (prevProps.userRedux !== this.props.userRedux) {
            let arrRoles = this.props.roleRedux


            this.setState({
                email: '',
                password: '',
                phoneNumber: '',
                firstName: ' ',
                lastName: '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE



            })
        }

    }


    handleSaveUser = () => {
        let isValid = this.checkValiDateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.getCreateUserStart({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.getEditUserStart({
                id: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,



            })
        }

    }
    checkValiDateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber',];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This missing required: ' + arrCheck[i] + '!');
                console.log(arrCheck[i])
                break
            }
        }
        return isValid;



    }
    onChangeInput = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
    }
    handleEditUserFromProps = (data) => {

        this.setState({
            email: data.email,
            password: 'Hash code',
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName: data.lastName,

            role: data.roleId,
            userId: data.id,

            action: CRUD_ACTIONS.EDIT,



        })
    }
    render() {

        let roles = this.props.roleRedux;
        let language = this.props.language;
        let { email,
            password,
            phoneNumber,
            role,
            firstName,
            lastName } = this.state;
        return (
            <div className='user-redux-container'>

                <div className="title" >{this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.update" /> : <FormattedMessage id="manage-user.add" />}       </div>
                <div className='user-redux-body'>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3' ></div>
                            <div className='col-6'>
                                <label >
                                    Email                                </label>
                                <input
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    className='form-control' type='email' />


                            </div>
                            <div className='col-6'>
                                <label >
                                    <FormattedMessage id="manage-user.password" />
                                </label>

                                <input
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    className='form-control' type='password' />

                            </div>
                            <div className='col-4'>
                                <label >
                                    <FormattedMessage id="manage-user.fname" />
                                </label>
                                <input
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                    className='form-control' type='text' />

                            </div>
                            <div className='col-4'>
                                <label >
                                    <FormattedMessage id="manage-user.lname" />
                                </label>
                                <input
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                    className='form-control' type='text' />

                            </div>
                            <div className='col-4'>
                                <label >
                                    <FormattedMessage id="manage-user.phoneN" />
                                </label>
                                <input
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    className='form-control' type='text' />

                            </div>



                            <div className='col-3'>
                                <label >
                                    <FormattedMessage id="manage-user.roleId" />
                                </label>

                                <select

                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    className="form-control"
                                    value={role} >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            {/* { console.log('check items', item.valueVI) } */ }

                                            {/* { console.log('check index', index) } */ }
                                            return (
                                                <option key={index} value={item.keyMap}> {language === LANGUAGES.VI ? item.valueVI : item.valueEn}</option>


                                            )



                                        })

                                    }
                                </select>
                            </div>

                            <div className='col-12 my-3' >
                                <button
                                    onClick={() => this.handleSaveUser()}
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />}</button>

                            </div>
                            <div className='col-12  mt-5'>
                                <TableManageUser
                                    handleEditUserFromProps={this.handleEditUserFromProps}
                                    action={this.state.action}
                                />

                            </div>

                        </div>
                    </div>

                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>




        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positonRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        userRedux: state.admin.userArr

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPositionStart: () => dispatch(actions.fetchPostionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getCreateUserStart: (data) => dispatch(actions.createUserStart(data)),
        getAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        getEditUserStart: (data) => dispatch(actions.editUserStart(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
