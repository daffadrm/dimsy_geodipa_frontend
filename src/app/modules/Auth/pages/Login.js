import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  username: "adyt",
  password: "Test1234",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, intl.formatMessage({
        id: "AUTH.VALIDATION.MIN_LENGTH_FIELD",
      }, {length: 3}))
      .max(50, intl.formatMessage({
        id: "AUTH.VALIDATION.MAX_LENGTH_FIELD",
      }, {length: 50}))
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(8, intl.formatMessage({
        id: "AUTH.VALIDATION.MIN_LENGTH_FIELD",
      }, {length: 8}))
      .max(50, intl.formatMessage({
        id: "AUTH.VALIDATION.MAX_LENGTH_FIELD",
      }, {length: 50}))
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.username, values.password)
          .then(({ data: { data } }) => {
            disableLoading();
            props.login(data.authn_token);
          })
          .catch((e) => {
            // console.log(e.response);
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      }, 1000);
    },
  });

  return (
    
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">

      <img src="/media/logos/logo-dimsy.png" alt="Logo"/> 
      
      </div>
      <div className="text-center mb-10 mb-lg-20">
     
        <h3 className="font-size-h2">
          <span>
            {/* <FormattedMessage id="AUTH.LOGIN.TITLE" /> */}
          </span>

        </h3>
        <p className="text-muted font-weight-bold">
          {/* Enter your username and password */}
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : null}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Username"
            type="text"
            className={`form-control form-control-solid border border-info h-auto py-3 px-6 ${getInputClasses(
              "username"
            )}`}
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid border border-info h-auto py-3 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}

          <Link
            to="/auth/forgot-password"
            className="text-primary-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <br />
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">

          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold form-control h-auto py-3 px-6`}
          >
            <span><FormattedMessage id="AUTH.LOGIN.BUTTON" /></span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>

        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <div className="mx-auto mb-2 col-md-12 text-primary">
           <p className="text-center mb-0">
              <i className="fa fa-headphones text-primary font-16" aria-hidden="true"></i>
              <span>&nbsp;</span>
              <span className="font-16"><b>Support</b></span>
            </p>
          </div>
          <div className="mx-auto mb-2 col-md-12">
            <p className="text-center mb-0">Divisi Procurement</p>
            <p className="text-center mb-0">PT. Geo DIpa Energi (Persero)</p>
          </div>
          <div className="mx-auto mb-2 col-md-12 text-primary">
            <p className="text-center mb-0">Gedung Aldevco Octagon 2th Floor</p>
            <p className="text-center mb-0">Jalan Warung Jati Barat No. 75</p>
            <p className="text-center mb-0">Jakarta Selatan 12740 - Indonesia</p>
            <p className="text-center mb-0">E.procurement@geodipa.co.id</p>
            <p className="text-center mb-0">T. +62 21 7982925</p>
            <p className="text-center mb-0">F. +62 21 7982930</p>
          </div>
        </div>
      </form>
      {/*end::Form*/}
    </div>

  );
}

export default injectIntl(connect(null, auth.actions)(Login));
