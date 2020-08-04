import React, { useEffect, useState } from "react"
import { setActiveSort } from "../../helpers/product"
import { connect } from 'react-redux'
import { changeFilter } from '../../redux/actions/Product/changeFilter'

const ShopCategories = ({
  filters, setFilters, getSortParams,
  categories, changeFilter
}) => {
  const [fetchedCategories, setFetchedCategories] = useState([])

  useEffect(() => {
    setFetchedCategories(categories)
  }, [categories])

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {fetchedCategories.length > 0 ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("category", "")
                    setActiveSort(e)
                    changeFilter('categoryID', -1)
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {fetchedCategories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("category", category.name)
                        setActiveSort(e)
                        changeFilter('categoryID', category.id)
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.name}{" "}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  categories: state.categoryReducer.categories,
  loadingCategories: state.categoryReducer.loadingCategories,
  success: state.categoryReducer.success,
  error: state.categoryReducer.error,
})

export default connect(mapStateToProps, { changeFilter })(ShopCategories)
