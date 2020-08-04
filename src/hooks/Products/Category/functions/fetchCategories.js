import Net from '../../../../support/API'
import { FetchAllCategories } from '../../../../support/Queries/Product'
import { FAILED_REQUEST } from '../../../../common/strings/Network'
import { RES } from '../../../../constants/network/types'

export const fetchCategories = () => {
    return new Net().post(FetchAllCategories())
        .then(res => {
            if (res.status === RES.SERVER_NOT_FOUND) {
                console.error(FAILED_REQUEST['403'])
                return { failed: true, data: null, message: res.message }
            } else if (res.status === RES.SUCCESS) {
                return { failed: false, data: res.data.categories, message: null }
            }
        })
}