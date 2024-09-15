import './DetailHandBook.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { handleGetDetailHandBookById } from '../../../services/userService';



import _ from 'lodash';

class DetailHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandBook: {},
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await handleGetDetailHandBookById({
                id: id,
            });

            if (res && res.errorCode === 0) {
                let data = res.data;

                this.setState({
                    dataDetailHandBook: res.data,
                })

            }

        }

    }







    render() {
        let { dataDetailHandBook } = this.state;

        return (
            <div className='detail-specialty-container'>
                <HomeHeader></HomeHeader>

                <div className='detail-specialty-body'>
                    <div className='title'> {dataDetailHandBook.name}</div>
                    <div className='description-specialty'>
                        <div className='description-specialty'>
                            <div>holoo</div>
                            {dataDetailHandBook && !_.isEmpty(dataDetailHandBook)

                                &&
                                <>
                                    <div className='clinic-address'>{dataDetailHandBook.name}</div>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailHandBook.descriptionHtml }}></div>
                                </>
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);
