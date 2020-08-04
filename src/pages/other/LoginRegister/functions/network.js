import Axios from 'axios'
import Net from '../../../../config/keys'

const url = Net.deployed? Net.deployedUrl : Net.localUrl

export const registerUser = async user => {
    const request = {
        query: `mutation ($userInfo: UserInput!) {
            signUp(user: $userInfo) {
                id firstName
            }
        }`,

        variables: {
            "userInfo": user
        }
    }

    const { data, status } = await Axios.post(url, request)
    return {
        status, info: data.data.signUp
    }
}

export const loginUser = async user => {
    const request = {
        query: `mutation ($credentials: Credentials!) {
            login(credentials: $credentials) {
                id error {
                    value message
                }
            }
        }`,

        variables: {
            "credentials": user
        }
    }

    const { data, status } = await Axios.post(url, request)
    return {
        status, data: data.data.login
    }
}