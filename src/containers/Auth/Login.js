import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { userService } from '../../services';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnChangeUser = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            const data = await userService.handleLogin(this.state.username, this.state.password)
            if (data.code != 0) {
                this.setState({
                    errMessage: data.message
                })
                return;
            }
            if (data.user) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.errorMessage) {
                this.setState({
                    errMessage: error.errorMessage
                })
            }
        }
    }

    handleShowHighPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-login">
                            Login
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder='Enter your username' value={this.state.username} onChange={(e) => this.handleOnChangeUser(e)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control" placeholder='Enter your password' onChange={(e) => this.handleOnChangePassword(e)} />
                                <span onClick={() => this.handleShowHighPassword()}><i className={this.state.isShowPassword ? "far fa-eye" : "fas fa-eye-slash"}></i></span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 mt-5 wrap-btn-login">
                            <button className="btn-login" onClick={() => this.handleLogin()}> Login</button>
                        </div>
                        <div className="col-12 forgot-password">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-5">
                            <span className="text-other-login"> Or Login With: </span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
