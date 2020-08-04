import Net from '../../../support/API'
import { FetchProductsByCategory } from '../../../support/Queries/Product'
import { FAILED_REQUEST } from '../../../common/strings/Network'
import { RES } from '../../../constants/network/types'

export const fetchProductsByCategory = categoryID => {
    return new Net().post(FetchProductsByCategory(categoryID))
        .then(res => {
            if (res.status === RES.SERVER_NOT_FOUND) {
                // Server not reachable 403
                console.error(FAILED_REQUEST['403'])
                return { failed: true, data: null, message: res.message }
            } else if (res.status === RES.SUCCESS) {
                // Success 200
                return { failed: false, data: res.data.fetchProductsByCategory, message: null }
            }
        })
}