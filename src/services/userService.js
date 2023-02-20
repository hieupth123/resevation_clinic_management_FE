import axios from '../axios'

const userService = {
    handleLogin(email, password) {
        return axios.post('/api/login', { email, password })
    }
}

export default userService