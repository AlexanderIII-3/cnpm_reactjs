import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";



import 'react-markdown-editor-lite/lib/index.css';




class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            image: ""


        };
        // this.listenEmitter();

    }


    componentDidMount() {
        let detailDoctor = this.props.detailDoctor.data;
        this.setState({
            ...detailDoctor
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor.data !== this.props.detailDoctor.data) {
            this.setState({
                ...this.props.detailDoctor.data
            })
        }


    }



    render() {
        let imageBase64 = '';
        if (this.state.image) {
            imageBase64 = new Buffer(this.state.image, 'base64').toString('binary')
        }
        console.log('check image base64', imageBase64)
        return (
            <div className='manage-doctor-container'>

                <div className="container-xl px-4 mt-4">
                    <nav className="nav nav-borders">
                        <a className="nav-link active ms-0" href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details" target="__blank">Profile</a>
                        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page" target="__blank">Billing</a>
                        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-security-page" target="__blank">Security</a>
                        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page" target="__blank">Notifications</a>
                    </nav>
                    <hr className="mt-0 mb-4" />
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header">Profile Picture</div>
                                <div className="card-body text-center">
                                    {/* <div classNameName=''
                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                    /> */}
                                    <img className="img-account-profile rounded-circle mb-2" src={imageBase64} alt="" />
                                    <div className="small font-italic text-muted mb-4">avatar</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header">Account Details</div>
                                <div className="card-body">
                                    <form>

                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputFirstName">First name</label>
                                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={this.state.firstName} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputLastName">Last name</label>
                                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={this.state.lastName} />
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputOrgName">Organization name</label>
                                                <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputLocation">Location</label>
                                                <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value={this.state.address} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1" for="inputEmailAddress">Email address</label>
                                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={this.state.email} />
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputPhone">Phone number</label>
                                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={this.state.phoneNumber} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputBirthday">Birthday</label>
                                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.userArr,
        detailDoctor: state.admin.userDetail
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        handleDeleteUserStart: (id) => dispatch(actions.deleteUserStart(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);