import PropTypes from "prop-types"
import React, { Fragment, useState, useReducer } from "react"
import { Spinner } from 'react-bootstrap'
import MetaTags from "react-meta-tags"
import { Link, Redirect } from "react-router-dom"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import Tab from "react-bootstrap/Tab"
import Nav from "react-bootstrap/Nav"
import LayoutOne from "../../../layouts/LayoutOne"
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb"
import { signUpReducer, initialSignUpState } from './functions/signupReducer'
import { signUp } from './functions/signupAction'
import { loginReducer, initialLoginState } from './functions/loginReducer'
import { login } from './functions/loginAction'
import routes from '../../../config/routes'
import './css/styles.css'

const LoginRegister = ({ history, location }) => {
  const { pathname } = location
  const [register, setRegister] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: ''
  })

  const [STATE_SIGNUP, dispatchSignup] = useReducer(signUpReducer, initialSignUpState)

  const [credentials, setCredentials] = useState({
      username: '', password: ''
  })

  const [STATE_LOGIN, dispatchLogin] = useReducer(loginReducer, initialLoginState)

  const registerChange = event => {
    const { name, value } = event.target
    setRegister({ ...register, [name]: value })
  }

  const loginChange = event => {
      const { name, value } = event.target
      setCredentials({ ...credentials, [name]: value })
  }

  const registerUser = () => {
    signUp(register)(dispatchSignup)
  }

  const loginUser = () => {
      login(credentials)(dispatchLogin)
  }

  if (STATE_SIGNUP.success_signup || STATE_LOGIN.success_login) {
    return <Redirect to={routes['home']} />
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Shemsu | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={loginChange}
                                />
                                <div className="error-message">
                                    {STATE_LOGIN.username.value? STATE_LOGIN.username.message : ""}
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={loginChange}
                                />
                                <div className="error-message">
                                  {STATE_LOGIN.password.value? STATE_LOGIN.password.message : ""}
                                  {STATE_LOGIN.error.value? STATE_LOGIN.error.message: ""}
                                </div>
                                <div className="button-box">
                                <div className="login-toggle-btn">
                                    <input type="checkbox" />
                                    <label className="ml-10">Remember me</label>
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                    </Link>
                                </div>
                                <button type="button" onClick={loginUser}>
                                {STATE_LOGIN.requesting_login?
                                    <Spinner color="blue" animation="border" /> : "Login"}
                                </button>
                                </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={registerChange}
                                />
                                <div className="error-message">
                                    {STATE_SIGNUP.firstName.value? STATE_SIGNUP.firstName.message : ""}
                                </div>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={registerChange}
                                />
                                <div className="error-message">
                                    {STATE_SIGNUP.lastName.value? STATE_SIGNUP.lastName.message : ""}
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={registerChange}
                                />
                                <div className="error-message">
                                    {STATE_SIGNUP.username.value? STATE_SIGNUP.username.message : ""}
                                </div>
                                <input
                                    name="email"
                                    placeholder="Email"
                                    onChange={registerChange}
                                    type="email"
                                />
                                <div className="error-message">
                                    {STATE_SIGNUP.email.value? STATE_SIGNUP.email.message : ""}
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={registerChange}
                                />
                                <div className="error-message">
                                    {STATE_SIGNUP.password.value? STATE_SIGNUP.password.message : ""}
                                </div>
                                <div className="button-box">
                                <button type="button" onClick={registerUser}>   
                                    {STATE_SIGNUP.requesting_register?
                                    <Spinner color="blue" animation="border" /> : "Register"}
                                </button>
                                </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

LoginRegister.propTypes = {
  location: PropTypes.object,
}

export default LoginRegister
