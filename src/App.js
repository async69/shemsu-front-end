import PropTypes from "prop-types"
import React, { useEffect, Suspense, lazy } from "react"
import ScrollToTop from "./helpers/scroll-top"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ToastProvider } from "react-toast-notifications"
import { multilanguage, loadLanguages } from "redux-multilanguage"
import { connect } from "react-redux"
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic"
import routes from './constants/routes'

// home pages
const Fashion = lazy(() => import("./pages/home/Fashion"))
const KidsFashion = lazy(() => import("./pages/home/KidsFashion/"))
const Cosmetics = lazy(() => import("./pages/home/Cosmetics"))
const Furniture = lazy(() => import("./pages/home/Furniture"))
const Electronics = lazy(() => import("./pages/home/Electronics"))
const AutoParts = lazy(() => import("./pages/home/AutoParts"))
const Handmade = lazy(() => import("./pages/home/HandMade"))

// shop pages
const Shop = lazy(() => import("./pages/shop"))
// product pages

const ProductTabLeft = lazy(() => import("./pages/shop-product/"))
// other pages
const About = lazy(() => import("./pages/other/About"))
const Contact = lazy(() => import("./pages/other/Contact"))
const MyAccount = lazy(() => import("./pages/other/MyAccount"))
const LoginRegister = lazy(() => import("./pages/other/LoginRegister/"))

const Cart = lazy(() => import("./pages/other/Cart"))
const Wishlist = lazy(() => import("./pages/other/Wishlist"))
const Compare = lazy(() => import("./pages/other/Compare"))
const Checkout = lazy(() => import("./pages/other/Checkout"))

const NotFound = lazy(() => import("./pages/other/NotFound"))

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
          am: require("./translations/amharic.json"),
        },
      })
    )
  })

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={Fashion}
                />

                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + routes.fashion}
                  component={Fashion}
                />
               
                <Route
                  path={process.env.PUBLIC_URL + routes.kidsFashion}
                  component={KidsFashion}
                />
                <Route
                  path={process.env.PUBLIC_URL + routes.cosmetics}
                  component={Cosmetics}
                />
                
                <Route
                  path={process.env.PUBLIC_URL + routes.furniture}
                  component={Furniture}
                />
                
                <Route
                  path={process.env.PUBLIC_URL + routes.electronics}
                  component={Electronics}
                />
               
                <Route
                  path={process.env.PUBLIC_URL + routes.autoParts }
                  component={AutoParts}
                />
               
                <Route
                  path={process.env.PUBLIC_URL + routes.handMade}
                  component={Handmade}
                />
                
                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={Shop}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + routes.productItem}
                  component={ProductTabLeft}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  )
}

App.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(multilanguage(App))
