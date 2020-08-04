import PropTypes from "prop-types"
import React, { Fragment, useState, useEffect } from "react"
import { connect } from "react-redux"
import { addToCart } from "../../redux/actions/cartActions"
import { addToWishlist } from "../../redux/actions/wishlistActions"
import { addToCompare } from "../../redux/actions/compareActions"
import ProductGridListSingle from "../../components/product/ProductGridListSingle"
import { demoProduct } from '../../common/data/demoProduct'
import { changeMetaData } from '../../redux/actions/Product/changeFilter'
import filtersValues from "../../common/data/filtersValues"
import { _addToWishlist } from '../../redux/actions/Wishlist/wishlist'
import { _addToCart } from '../../redux/actions/Cart/cart'

const ProductGrid = ({
  filter,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  quantityUpdate,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
  fetchedProducts,
  changeMetaData
}) => {
  const [productItems, setProductItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  
  useEffect(() => {
    const filteredProducts = fetchedProducts.map(product => ({
      ...demoProduct,
      ...product
    }))

    setProductItems(filteredProducts)
    changeMetaData('productCount', fetchedProducts.length)
    changeMetaData('filteredCount', fetchedProducts.length)
  }, [fetchedProducts, changeMetaData])

  useEffect(() => {
    setFilteredItems(productItems)
  }, [productItems, setFilteredItems])

  useEffect(() => {
    var updatedCategories = []
    if (filter['categoryID'] !== -1) {
      updatedCategories = productItems.filter(prop => prop.categoryID === filter['categoryID'])
    } else updatedCategories = productItems

    var updatedPrices = []
    if (filter['FILTER_BY_PRICE'] === filtersValues.price.DEFAULT) {
      updatedPrices = updatedCategories
    } else if (filter['FILTER_BY_PRICE'] === filtersValues.price.HIGH_TO_LOW)  {
      updatedPrices = updatedCategories.sort((_I1, _I2) => parseInt(_I2.productPrice) - parseInt(_I1.productPrice))
    } else if (filter['FILTER_BY_PRICE'] === filtersValues.price.LOW_TO_HIGH) {
      updatedPrices = updatedCategories.sort((_I1, _I2) => parseInt(_I1.productPrice) - parseInt(_I2.productPrice))
    }

    var updatedSearches = []
    if (filter['FILTER_BY_SEARCH'] !== filtersValues.search.DEFAULT) {
      const exp = new RegExp("^" + filter['FILTER_BY_SEARCH'], "gi")
      updatedSearches = updatedPrices.filter(product => product.productName.match(exp))
    } else updatedSearches = updatedPrices

    var updatedColors = []
    if (filter['FILTER_BY_COLOR'] !== filtersValues.color.DEFAULT) {
      updatedColors = updatedSearches.filter(product => product.availableColors.find(color => color === filter['FILTER_BY_COLOR']))
    } else updatedColors = updatedSearches

    var updatedSizes = []
    if (filter['FILTER_BY_SIZE'] !== filtersValues.size.DEFAULT) {
      updatedSizes = updatedColors.filter(product => product.availableSizes.find(size => size === filter['FILTER_BY_SIZE']))
    } else updatedSizes = updatedColors

    setFilteredItems(updatedSizes)
    changeMetaData('filteredCount', updatedSizes.length)
  }, [filter, productItems, setFilteredItems, changeMetaData])

  return (
    <Fragment>
      {filteredItems.map((product, index) => {
        return (
          <ProductGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            productItem={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            cartItem={
              cartItems.filter(cartItem => cartItem.id === product.id)[0]
            }
            wishlistItem={
              wishlistItems.filter(
                wishlistItem => wishlistItem.id === product.id
              )[0]
            }
            compareItem={
              compareItems.filter(
                compareItem => compareItem.id === product.id
              )[0]
            }
            key={index}
          />
        )
      })}
    </Fragment>
  )
}

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
}

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartReducer.cart,
    quantityUpdate: state.cartReducer.quantityUpdate,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
    fetchedProducts: state.productReducer.products,
    filter: state.productReducer.filter,
    metaData: state.productReducer.metaData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      )
      dispatch(_addToCart(item))
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast))
      dispatch(_addToWishlist(item))
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast))
    },
    changeMetaData: (key, value) => dispatch(changeMetaData(key, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid)
