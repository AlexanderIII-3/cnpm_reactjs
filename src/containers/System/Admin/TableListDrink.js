import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
// import {getAllListDrinks} form '../../../services/userService'
import { handleDeleteDrink } from '../../../services/userService';

import './tableManageUser.scss';

import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';





class TableListDrink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListDrink: [],
            isOpen: false,
            id: '',
        };
        // this.listenEmitter();

    }


    async componentDidMount() {
        await this.props.fetchRequiredAllListDrink()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.listDrink !== prevProps.listDrink) {

            this.setState({
                ListDrink: this.props.listDrink
            })


        }
    }
    handleDelete = async (drink) => {
        let data = await handleDeleteDrink(drink.id)
        if (data && data.errorCode === 0) {
            toast.success("Delete Success!");

        }
        else {
            toast.error("Delete failed!");

        }

    }


    handleEditDrink = (drink) => {
        this.props.handleEditUserFromProps(drink)
    }

    render() {
        let { ListDrink } = this.state
        console.log('check list drink redux', ListDrink)
        return (
            <React.Fragment>



                <div className="users-table mt-3  mx-4 mb-5"  >
                    <table id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Name </th>
                                <th>Desciption</th>
                                <th>Price</th>
                                <th>Type</th>
                                <th>Active</th>
                            </tr>

                            {ListDrink && ListDrink.map((item, index) => {
                                return (
                                    <tr key={index.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.decription}</td>
                                        <td>{item.priceTypeData.valueEn}</td>
                                        <td>{item.dishTypeData.valueEn}</td>
                                        <td>  <button className='btn-edit' onClick={() => { this.handleEditDrink(item) }} ><i className='fas fa-pencil-alt'></i>
                                        </button>
                                            <button onClick={() => { this.handleDelete(item) }} className='btn-delete'><i className='fas fa-trash-alt' ></i>
                                            </button>


                                        </td>
                                    </tr>)
                            })
                            }







                        </tbody>
                    </table>


                </div>



            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listDrink: state.admin.listDrink
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRequiredAllListDrink: () => dispatch(actions.fetchRequiredAllListDrink()),
        handleDeleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
        detailUserStart: (id) => dispatch(actions.detailUserStart(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableListDrink);
