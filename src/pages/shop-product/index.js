import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { demoProduct } from './data'

const ProductTabLeft = ({ history, location, products, product }) => {
    const { pathname } = location;

    var state = null
    if (location.state) {
      state = location.state
    } else {
      state = product
    }

    return (
        <Fragment>
            <MetaTags>
            <title>Shemsu | Product Page</title>
            <meta
                name="description"
                content="Product page of flone react minimalist eCommerce template."
            />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
            Shop Product
            </BreadcrumbsItem>

            <LayoutOne headerTop="visible">
            {/* breadcrumb */}
            <Breadcrumb />

            {/* product description with image */}
            <ProductImageDescription
                spaceTopClass="pt-100"
                spaceBottomClass="pb-100"
                product={demoProduct}
                state={state}
                galleryType="leftThumb"
            />

            {/* product description tab */}
            <ProductDescriptionTab
                spaceBottomClass="pb-90"
                productFullDesc={demoProduct.fullDescription}
            />

            {/* related product slider */}
            <RelatedProductSlider
                spaceBottomClass="pb-95"
                category={demoProduct.category[0]}
                productID={state.id}
            />
            </LayoutOne>
        </Fragment>
    );
};

ProductTabLeft.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.location.search.slice(1, ownProps.location.search.length + 1)
  return {
    product: state.productReducer.products.filter(
      (single) => single.id === parseInt(itemId)
    )[0],
    products: state.productReducer.products
  };
};

export default connect(mapStateToProps)(ProductTabLeft);