import PropTypes from "prop-types"
import React from "react"
import { connect } from 'react-redux'
import { setActiveSort } from "../../helpers/product"
import filterValues from '../../common/data/filtersValues'
import { demoColors } from '../../common/data/demoColors'
import { changeFilter } from '../../redux/actions/Product/changeFilter'

const ShopColor = ({ changeFilter, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Color </h4>
      <div className="sidebar-widget-list mt-20">
        {demoColors ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("color", "")
                    setActiveSort(e)
                    changeFilter(filterValues.color._type, filterValues.color.DEFAULT)
                  }}
                >
                  <span className="checkmark" /> All Colors{" "}
                </button>
              </div>
            </li>
            {demoColors.map((color, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("color", color)
                        setActiveSort(e)
                        changeFilter(filterValues.color._type, color)
                      }}
                    >
                      <span className="checkmark" /> {color}{" "}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          "No colors found"
        )}
      </div>
    </div>
  )
}

ShopColor.propTypes = {
  colors: PropTypes.array,
  getSortParams: PropTypes.func
}

const mapStateToProps = state => ({
  filter: state.productReducer.filter
})

export default connect(mapStateToProps, { changeFilter })(ShopColor)
