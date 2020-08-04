import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../../layouts/LayoutOne";
import HeroSliderOne from "../../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../../wrappers/product/TabProduct";
import BlogFeatured from "../../../wrappers/blog-featured/BlogFeatured";
import { productCategory } from '../../../constants/categories'
import { connect } from 'react-redux'
import { getProductsByCategory } from '../../../redux/actions/Product/getByCategoryActions'

const HomeFashion = ({
  getProductsByCategory
}) => {
  useEffect(() => {
    getProductsByCategory(productCategory.FASHION)
  }, [getProductsByCategory])

  return (
    <Fragment>
      <MetaTags>
        <title>Shemsu | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  );
}

const mapStateToProps = ({ productReducer }) => ({
    products: productReducer.products,
    loadingProducts: productReducer.loadingProducts,
    success: productReducer.success,
    error: productReducer.error
})

export default connect(mapStateToProps, { getProductsByCategory })(HomeFashion)
