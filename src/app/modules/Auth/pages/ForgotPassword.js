import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { forgotPassword } from "../_redux/authCrud";

const initialValues = {
  user: "",
};

function ForgotPassword(props) {
  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    user: Yup.string()
      .min(3, intl.formatMessage({ id: "AUTH.VALIDATION.FORGOT_MIN_CHARACTER"}))
      .max(50, intl.formatMessage({ id: "AUTH.VALIDATION.FORGOT_MAX_CHARACTER"}))
      .required(
        intl.formatMessage({ id: "AUTH.VALIDATION.REQUIRED_FIELD"})
      ),
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

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      forgotPassword(values.user)
        .then(() => {
          disableLoading();
          setIsRequested(true)
        })
        .catch((error) => {
          disableLoading();
          setIsRequested(false);
          setSubmitting(false);
          if(error.response.status === 500){
          setStatus(
              {
                message: intl.formatMessage({ id: "AUTH.VALIDATION.ERROR"}), 
                status: "failed"}
          );
          }
          else if(error.response.status === 400){
            setStatus(
              {
                message: intl.formatMessage({ id: "AUTH.VALIDATION.NOT_FOUND_USERNAME"}), 
                status: "failed"}
            );
          }
          else if(error.response.status === 200){
            setStatus(
              {
                message: intl.formatMessage({ id: "AUTH.VALIDATION.SUCCESS"}), 
                status: "success"}
            );
          }
        });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1"><FormattedMessage id="AUTH.LABEL.FORGOT_HEADING" /></h3>
            <div className="text-muted font-weight-bold">
              <FormattedMessage id="AUTH.LABEL.FORGOT_BODY" />
          </div>
          </div >
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && formik.status.status === "failed" ? (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                {formik.status.message}
                </div>
              </div>
            ) : formik.status && formik.status.status === "success" ? (
              <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status.message}
                </div>
              </div>
              ) : null }
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Username"
                type="text"
                className={`form-control form-control-solid h-auto py-3 px-6 ${getInputClasses(
                  "user"
                )}`}
                name="user"
                {...formik.getFieldProps("user")}
              />
              {formik.touched.user && formik.errors.user ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.user}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold form-control h-auto py-3 px-1"
                disabled={formik.isSubmitting}
              >
                <FormattedMessage id="AUTH.LABEL.BUTTON_SUBMIT" />
              </button>
              <Link to="/auth">
                {/* <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button> */}
              </Link>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
