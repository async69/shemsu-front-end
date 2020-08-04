import React from "react";
import { connect } from "react-redux"
import { changeFilter } from '../../redux/actions/Product/changeFilter'
import filterValues from '../../common/data/filtersValues'

const ShopSearch = ({ changeFilter }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input
            type="text"
            placeholder="Search here..."
            onChange={e => changeFilter(filterValues.search._type, e.target.value)}
          />
          <button>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  filter: state.productReducer.filter
})

export default connect(mapStateToProps, { changeFilter })(ShopSearch)
