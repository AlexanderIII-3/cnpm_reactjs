import './ManageHandBook.scss';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { handleCreateNewHandBook } from '../../../services/userService';



import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: '',
            image: '',
            isOpen: false,
            name: '',
            descriptionHtml: '',
            descriptionMarkDown: '',
            id: '',
            action: CRUD_ACTIONS.CREATE,

        };
        // this.listenEmitter();

    }


    async componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnchange = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,

        }, () => { console.log('name', this.state) })
    };
    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    };
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {

            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                image: base64,
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            descriptionMarkDown: text,
            descriptionHtml: html
        })
    }
    handleCheckVaildate = () => {
        let isValid = true;
        let type = ['image', 'name', 'descriptionHtml', 'descriptionMarkDown'];
        for (let i; i < type.length; i++) {
            if (!this.state[type[i]]) {
                isValid = false;
                alert(`Missing Parameter :` + type[i]);
                break;
            }

        }
        return isValid;



    };
    handleSaveHandBook = async () => {
        let isValid = this.handleCheckVaildate();
        if (isValid === true) {
            let res = await handleCreateNewHandBook({
                name: this.state.name,
                descriptionHtml: this.state.descriptionHtml,
                descriptionMarkDown: this.state.descriptionMarkDown,
                image: this.state.image,

            })
            if (res.errorCode === 0 && res) {
                toast.success("Create New HandBook Success!")
                this.setState({
                    name: '',
                    descriptionHtml: '',
                    descriptionMarkDown: '',
                    image: '',
                    previewImgUrl: '',

                })
            }
        }

    };


    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='specialty-title'>
                    Manage HandBook
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Name HandBook </label>
                        <input
                            value={this.state.name}
                            onChange={(event) => this.handleOnchange(event, 'name')}
                            className='form-control' type='text'></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Image handbook </label>

                        <div className='preview-img-container'>
                            <input
                                onChange={(event) => this.handleOnchangeImage(event)}
                                id='previewImg' type='file' hidden />
                            <label className='label-upload' htmlFor='previewImg'>
                                Tải Ảnh <i className='fas fa-upload'></i>
                            </label>
                            <div className='preview-image'

                                style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                onClick={() => this.openPreviewImg()} >  </div>
                        </div>
                    </div>

                    <div className='manage-specialty-editor col-12'>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkDown}


                        />
                    </div>
                    <div className='col-12 my-4' >
                        <button
                            onClick={() => this.handleSaveHandBook()}
                            className='btn-save-specialty'
                        >
                            {this.state.action === CRUD_ACTIONS.CREATE ? <FormattedMessage id="manage-user.save" /> : <FormattedMessage id="manage-user.edit" />}

                        </button>

                    </div>


                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        specialtyArr: state.admin.specialtyArr

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
