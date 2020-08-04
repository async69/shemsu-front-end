import PropTypes from "prop-types"
import React from "react"
import { connect } from 'react-redux'
import { setActiveSort } from "../../helpers/product"
import { changeFilter } from '../../redux/actions/Product/changeFilter'
import { demoSizes } from '../../common/data/demoSizes'
import filtersValues from '../../common/data/filtersValues'

const ShopSize = ({ getSortParams, changeFilter }) => {
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Size </h4>
      <div className="sidebar-widget-list mt-20">
        {demoSizes ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("size", "")
                    setActiveSort(e)
                    changeFilter(filtersValues.size._type, filtersValues.size.DEFAULT)
                  }}
                >
                  <span className="checkmark" /> All Sizes{" "}
                </button>
              </div>
            </li>
            {demoSizes.map((size, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className="text-uppercase"
                      onClick={e => {
                        getSortParams("size", size)
                        setActiveSort(e)
                        changeFilter(filtersValues.size._type, size)
                      }}
                    >
                      {" "}
                      <span className="checkmark" />
                      {size}{" "}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          "No sizes found"
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  filter: state.productReducer.filter
})

ShopSize.propTypes = {
  getSortParams: PropTypes.func,
  sizes: PropTypes.array
}

export default connect(mapStateToProps, { changeFilter })(ShopSize)
