import Axios from 'axios'
import { REQ, RES } from '../../constants/network/types'
import { Print } from '../../useCases'
import { INVALID, FAILED_REQUEST } from '../../common/strings/Network'
import Keys from '../../config/keys'

class Net {
    _interfaces() {
        return {
            type: '', url: '', data: {}, prop: '',
            params: [{ key: '', value: '' }],
            request: {
                type: '', url: '', params: [{ key: '', value: '' }], data: {}
            },
            get: { url: '',  params: [{ key: '', value: '' }] },
            post: { url: '', data: {} },
            callback: (response = {}, error = {}) => null
        }
    }

    constructor(
        type = this._interfaces().type, url = this._interfaces().url,
        params = this._interfaces().params, data = {}
        ) {
        
        url = Keys.deployed? Keys.deployedUrl : Keys.localUrl
        
        this.state = {
            type: "", url: "", params: {}, data: {}
        }
        const newState = {}
        if (type.length > 0) {
            newState.type = type
        }

        if (url.length > 0) {
            newState.url = url
        }

        if (params[0]['key'].length > 0) {
            newState.params = params
            if (url.length > 0) newState.url = this.mapParams(url, params)
            else Print.warn(INVALID.NO_URL_TO_MAP_PARAMS)
        }

        this.setState(newState)
    }

    checkProp(prop = this._interfaces().prop) {
        for (var item in this.state) {
            if (item === prop) return true
        }
        return false
    }

    setState (newState = {}) {
        for (var item in newState) {
            if (this.checkProp(item)) {
                this.state[item] = newState[item]
            }
        }
    }

    _isEmpty(object = {}) {
        var count = 0
        for (var item in object) count = !item? null : count + 1
        return count === 0
    }

    mapParams (url, params = this._interfaces().params) {
        if (this._isEmpty(params[0])) return url
        if (params.length === 0) {
            var check = false
            try {
                check = params[0]['key'].length === 0 || params[0]['value'] === 0
            } catch (e) {
                return url
            }
            if (check) return url
        }
        var buildParams = ''
        params.forEach(item => {
            if (!(item.key && item.value)) return Print.error(INVALID.INVALID_PARAMS)
            var param = `&${item.key + ""}=${item.value + ""}`
            buildParams += param
        })
        return url + '?' + buildParams.slice(1, buildParams.length)
    }

    getType() {
        return this.state.type
    }
    getURL() {
        return this.state.url
    }
    getParams() {
        return this.state.params
    }

    request(req = this._interfaces().request, callback = this._interfaces().callback) {
        if (req.type === undefined) return Print.warn(INVALID.NO_TYPE)
        if (req.url === undefined) return Print.warn(INVALID.NO_URL)
        var falseType = true
        for (var item in REQ) {
            if (item === req.type) falseType = false
        }
        if (falseType) return Print.warn(INVALID.INVALID_REQUEST)
        if (req.data) {
            return Axios({
                url: req.url,
                method: req.type,
                data: req.data
            }).then(res => res.data).catch(err => err.response.data)
        } else return Axios({ url: req.url, method: req.type })
    }

    get(url = this.state.url, params = this.state.params, callback = this._interfaces().callback) {
        return Axios.get(this.mapParams(url, params))
            .then(res => callback({ data: res.data, headers: res.headers }, null))
            .catch(err => callback(null, {
                response: err.response,
                message: err.response.data
            }))
    }

    post(data, callback = this._interfaces().callback) {
        return Axios.post(this.state.url, data)
            .then(res => {
                return { data: res.data.data, headers: res.headers, status: res.status }
            })
            .catch(err => {
                return { status: RES['SERVER_NOT_FOUND'], serverText: err.toJSON().message, message: FAILED_REQUEST['403'] }
            })
    }
}

export default Net