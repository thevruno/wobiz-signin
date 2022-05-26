import axios from "axios";

const wobizApi = axios.create({
    baseURL: 'admin.localwobiz.com/login',
    params: {
        username,
        passoword
    }
})

export default wobizApi