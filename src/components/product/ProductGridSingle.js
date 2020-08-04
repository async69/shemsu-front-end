import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import { getDiscountPrice } from "../../helpers/product"
import Rating from "./sub-components/ProductRating"
import ProductModal from "./ProductModal"
import Image from '../../assets/img/products/product_640-2.jpg'
import routes from '../../constants/routes'

const ProductGridSingle = ({
  productItem,
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false)
  const { addToast } = useToasts()

  const discountedPrice = getDiscountPrice(productItem.productPrice, productItem.discount)
  const finalProductPrice = +(productItem.productPrice * currency.currencyRate).toFixed(2)
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2)

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={{
              pathname: process.env.PUBLIC_URL + routes.productItem,
              state: productItem,
              search: productItem.id + ""
            }}>
              <img
                className="default-img"
                src={Image}
                alt=""
              />
              {/* When you have more than one image */}
              {false ? (
                <img
                  className="hover-img"
                  src={Image}
                  alt=""
                />
              ) : (
                ""
              )}
            </Link>
            {productItem.discount || productItem.new ? (
              <div className="product-img-badges">
                {productItem.discount ? (
                  <span className="pink">-{productItem.discount}%</span>
                ) : (
                  ""
                )}
                {productItem.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? "active" : ""}
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? "Added to wishlist"
                      : "Add to wishlist"
                  }
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {productItem.affiliateLink ? (
                  <a
                    href={productItem.affiliateLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {" "}
                    Buy now{" "}
                  </a>
                ) : productItem.variation && productItem.variation.length >= 1 ? (
                  <Link to={`${process.env.PUBLIC_URL}/product/${productItem.id}`}>
                    Select Option
                  </Link>
                ) : productItem.stock && productItem.stock > 0 ? (
                  <button
                    onClick={() => addToCart(productItem, addToast)}
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                      cartItem !== undefined ? "Added to cart" : "Add to cart"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? "Added"
                      : "Add to cart"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={{
                pathname: process.env.PUBLIC_URL + routes.productItem,
                state: productItem,
                search: productItem.id + ""
              }}>
                {productItem.productName}
              </Link>
            </h3>
            {productItem.rating && productItem.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={productItem.rating} />
              </div>
            ) : (
              ""
            )}
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                  <span className="old">
                    {currency.currencySymbol + finalProductPrice}
                  </span>
                </Fragment>
              ) : (
                <span>{currency.currencySymbol + finalProductPrice} </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={productItem}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  )
}

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object
}

export default ProductGridSingle
