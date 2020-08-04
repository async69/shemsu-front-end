import Net from '../../../../support/API'
import { FetchAllProducts } from '../../../../support/Queries/Product'
import { FAILED_REQUEST } from '../../../../common/strings/Network'
import { RES } from '../../../../constants/network/types'

export const fetchAllProducts = () => {
    return new Net().post(FetchAllProducts())
        .then(res => {
            if (res.status === RES.SERVER_NOT_FOUND) {
                console.error(FAILED_REQUEST['403'])
                return { failed: true, data: null, message: res.message }
            } else if (res.status === RES.SUCCESS) {
                return { failed: false, data: res.data.products, message: null }
            }
        })
}