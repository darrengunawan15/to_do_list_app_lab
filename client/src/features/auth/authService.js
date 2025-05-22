import axios from 'axios'

const API_URL = '/service/user'

// Add request interceptor to include auth token
axios.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            config.headers.Authorization = `Bearer ${user.refresh_token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// signin user
const signin = async (userData) => {
    const response = await axios.post(API_URL + "/signin", userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    signin,
    logout
}

export default authService

