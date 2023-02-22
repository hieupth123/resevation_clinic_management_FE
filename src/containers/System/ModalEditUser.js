import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        const { user } = this.props
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: '123456',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        const arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter: ${arrInput[i]}`)
                break;
            }
        }
        return isValid
    }

    editUserInfo = () => {
        const isValid = this.checkValidateInput()
        if (isValid) {
            this.props.editUser(this.state)
        }
    }

    closeModalUser = () => {
        this.props.closeModalUser()
    }

    handleInput = (e, id) => {
        const stateClone = { ...this.state }
        stateClone[id] = e.target.value
        this.setState({ ...stateClone })
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isShowModalUser}
                toggle={() => { this.closeModalUser() }}
                className="user-modal"
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.closeModalUser() }}>CREATE USER</ModalHeader>
                <ModalBody>
                    <div className="user-modal-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder='Email'
                                onChange={(e) => { this.handleInput(e, 'email') }}
                                value={this.state.email}
                                disabled
                            ></input>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder='Password'
                                onChange={(e) => { this.handleInput(e, 'password') }}
                                value={this.state.password}
                                disabled
                            ></input>
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder='First Name'
                                onChange={(e) => { this.handleInput(e, 'firstName') }}
                                value={this.state.firstName}></input>
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder='Last Name'
                                onChange={(e) => { this.handleInput(e, 'lastName') }}
                                value={this.state.lastName}></input>
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder='Address'
                                onChange={(e) => { this.handleInput(e, 'address') }}
                                value={this.state.address}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.editUserInfo() }}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.closeModalUser() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
