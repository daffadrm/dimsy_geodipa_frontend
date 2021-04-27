/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  useSelector, 
  shallowEqual, 
  connect, 
  // useDispatch 
} from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
// import SVG from "react-inlinesvg";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
// import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import * as auth from "../Auth";
import { updatePassword } from "./_redux/authCrud";
import { 
  FormattedMessage, 
  injectIntl 
} from "react-intl";
import {Alert} from "react-bootstrap";

function ChangePassword(props) {
  // Fields
  const { intl } = props;
  const [loading, setloading] = useState(false);
  const [alert, setAlert] = useState({status: false, message:"", variant: "primary"});
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  useEffect(() => {}, [user]);
  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    const updatedUser = Object.assign(user);
    var params = `?authn_token=${updatedUser.authn_token}&username=${updatedUser.username}`;
    setTimeout(() => {
      // Do request to your server for user update, we just imitate user update there, For example:
      updatePassword(params, values)
      .then(({ data: { data } }) => {
        setloading(false);
        setSubmitting(false);
        setAlert({status: true, message: "REQ.UPDATE", variant: "primary"});
        setTimeout(() => {
          setAlert({status: false, message: "REQ.UPDATE", variant: "primary"})
        }, 3000);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setSubmitting(false);
        setStatus(error);
          setAlert({status: true, message: "REQ.FAILED", variant: "danger"});
          setTimeout(() => {
            setAlert({status: false, message: "REQ.FAILED", variant: "danger"})
          }, 3000);
     });
    }, 1000);
  };
  // UI Helpers
  const initialValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };
  
  const Schema = Yup.object().shape({
    current_password: Yup.string()
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
    )
    ,
    password: Yup.string()
    .min(8, intl.formatMessage({
      id: "AUTH.INPUT.PASSWORD.VALIDATION.MATCHE",
    }))
    .max(50, intl.formatMessage({
      id: "AUTH.VALIDATION.MAX_LENGTH_FIELD",
    }, {length: 50}))
    .required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    )
    .test(
      "regex",
      intl.formatMessage({
        id: "AUTH.INPUT.PASSWORD.VALIDATION.MATCHE",
      }),
      val => {
        let regExp = new RegExp(
          "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
        );
        // console.log(regExp.test(val), regExp, val);
        return regExp.test(val);
      }
    )
    ,
    password_confirmation: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.INPUT.CONFIRM_PASSWORD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          intl.formatMessage({
            id: "AUTH.INPUT.CONFIRM_PASSWORD_NOT_MATCH",
          })
        ),
      }),
  });
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
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    onReset: (values, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <form className="card card-custom" onSubmit={formik.handleSubmit}>
      <Alert variant={alert.variant} show={alert.status} onClick={() => setAlert({status: false, message: "REQ.UPDATE"})} dismissible>
        <FormattedMessage id={alert.message} />
      </Alert>
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            <FormattedMessage id="TITLE.CHANGE_PASSWORD" />
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            <FormattedMessage id="TITLE.CHANGE_PASSWORD.SPAN" />
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className="btn btn-success mr-2"
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
            <FormattedMessage id="TITLE.USER_PROFILE.PERSONAL_INFORMATION.SUBMIT_BUTTON.SAVE_CHANGES" />
            {formik.isSubmitting}
          </button>
          <Link
            to="/user-profile/personal-information"
            className="btn btn-secondary"
          >
          <FormattedMessage id="TITLE.USER_PROFILE.PERSONAL_INFORMATION.SUBMIT_BUTTON.CANCEL_CHANGES" />
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        <div className="card-body">
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
              <FormattedMessage id="CHANGE_PASSWORD.INPUT.CURRENT_PASSWORD" />
              <span className="text-danger">*</span>
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder={intl.formatMessage({
                  id: "CHANGE_PASSWORD.INPUT.CURRENT_PASSWORD",
                })}
                className={`form-control form-control-lg form-control-solid mb-2 ${getInputClasses(
                  "current_password"
                )}`}
                name="current_password"
                {...formik.getFieldProps("current_password")}
              />
              {formik.touched.current_password &&
              formik.errors.current_password ? (
                <div className="invalid-feedback">
                  {formik.errors.current_password}
                </div>
              ) : null}
              {/* <a href="#" className="text-sm font-weight-bold">
                Forgot password ?
              </a> */}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
              <FormattedMessage id="CHANGE_PASSWORD.INPUT.NEW_PASSWORD" />
              <span className="text-danger">*</span>
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder={intl.formatMessage({
                  id: "CHANGE_PASSWORD.INPUT.NEW_PASSWORD",
                })}
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
            <FormattedMessage id="AUTH.INPUT.CONFIRM_PASSWORD" />
              <span className="text-danger">*</span>
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder={intl.formatMessage({
                  id: "AUTH.INPUT.CONFIRM_PASSWORD",
                })}
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "password_confirmation"
                )}`}
                name="password_confirmation"
                {...formik.getFieldProps("password_confirmation")}
              />
              {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                <div className="invalid-feedback">
                  {formik.errors.password_confirmation}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}

export default injectIntl(connect(null, auth.actions)(ChangePassword));
