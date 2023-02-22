import axios from '../axios'

const userService = {
    handleLogin(email, password) {
        return axios.post('/api/login', { email, password })
    },
    getUsers() {
        return axios.get('/api/users')
    },
    createUsers(userInfo) {
        return axios.post('/api/users', userInfo)
    },
    deleteUser(id) {
        return axios.delete(`/api/users/${id}`)
    },
    editUser(userInfo) {
        return axios.put(`/api/users/${userInfo.id}`, userInfo)
    }
}

export default userService