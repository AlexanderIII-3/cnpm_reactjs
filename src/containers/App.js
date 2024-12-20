import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import CustomScrollbars from '../components/CustomScrollbars'
import LoadingOverlay from 'react-loading-overlay';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import DetailDrink from '../../src/containers/Patient/DetailInfor/DetailDrink.js'
import { path } from '../utils'
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from './HomePage/HomePage.js';
import CartDrink from './Patient/DetailInfor/CartDrink.js';
import Bill from './Patient/DetailInfor/Bill/Bill.js';
import Cus_Bill from './Patient/DetailInfor/Bill/Cus_Bill.js';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />

                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />

                                    <Route path={path.DETAIL_DRINK} component={userIsAuthenticated(DetailDrink)} />
                                    <Route path={path.CART_DRINK} component={userIsAuthenticated(CartDrink)} />
                                    <Route path={path.VIEW_BILL} component={userIsAuthenticated(Bill)} />
                                    <Route path={path.VIEW_BILL_CUSTOMER} component={userIsAuthenticated(Cus_Bill)} />
                                    <Route path={path.VIEW_ODER_CART} component={userIsAuthenticated(CartDrink)}></Route>
                                    <Route path={path.VIEW_ODER_BILL} component={userIsAuthenticated(Cus_Bill)}></Route>


                                </Switch>
                            </CustomScrollbars>
                        </div>



                        <ToastContainer
                            position="top-right"
                            autoClose={4000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover

                        />
                        {/* <LoadingOverlay
                            active={this.state.isShowLoading}
                            spinner
                            text='Loading...'
                        ></LoadingOverlay> */}


                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);