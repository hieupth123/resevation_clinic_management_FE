import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../services';
import './UserManage.scss';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils';
class UserManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isShowModalUser: false,
      isShowModalEditUser: false,
      userEdit: {}
    }
  }

  async componentDidMount() {
    this.getAllUser()
  }

  getAllUser = async () => {
    const response = await userService.getUsers();
    if (response && response.code === 0) {
      this.setState({
        users: response.users
      })
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isShowModalUser: true
    })
  }

  closeModalUser = () => {
    this.setState({
      isShowModalUser: false
    })
  }

  closeModalEditUser = () => {
    this.setState({
      isShowModalEditUser: false
    })
  }


  createNewUser = async (userInfo) => {
    try {
      const response = await userService.createUsers(userInfo);
      if (response && response.code === 0) {
        this.getAllUser()
        this.closeModalUser()
        emitter.emit('EVENT_CLEAR_FORM_DATA')
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteUser = async (id) => {
    try {
      const response = await userService.deleteUser(id);
      if (response && response.code === 0) {
        this.getAllUser()
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  editUser = async (dataEdit) => {
    try {
      const response = await userService.editUser(dataEdit);
      if (response && response.code === 0) {
        this.getAllUser()
        this.closeModalEditUser()
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleEdituser = (user) => {
    this.setState({
      isShowModalEditUser: true,
      userEdit: user
    })

  }

  render() {
    return (
      <div className="user-container mx-1">
        <ModalUser
          isShowModalUser={this.state.isShowModalUser}
          closeModalUser={this.closeModalUser}
          createNewUser={this.createNewUser} />
        {
          this.state.isShowModalEditUser &&
          <ModalEditUser
            isShowModalUser={this.state.isShowModalEditUser}
            closeModalUser={this.closeModalEditUser}
            user={this.state.userEdit}
            editUser={this.editUser}
          />
        }

        <div className="title text-center">Manage users</div>
        <div className="my-2">
          <button
            type="button"
            className="btn btn-success px-3"
            onClick={() => this.handleAddNewUser()}
          ><i className="fas fa-plus"></i> Add new user</button>
        </div>
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th className='text-center' scope="col">Email</th>
              <th className='text-center' scope="col">First name</th>
              <th className='text-center' scope="col">Last name</th>
              <th className='text-center' scope="col">Address</th>
              <th className='text-center' scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users?.map((user, index) => {
              return (<tr key={index}>
                <td>{user.email}</td>
                <td className='text-center'>{user.firstName}</td>
                <td className='text-center'>{user.lastName}</td>
                <td>{user.address}</td>
                <td className='text-center'>
                  <button className="btn-edit" onClick={() => { this.handleEdituser(user) }}><i className="far fa-edit"></i></button>
                  <button className="btn-delete" onClick={() => { this.deleteUser(user.id) }}><i className="far fa-trash-alt"></i></button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
