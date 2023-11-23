import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "./config";

const Recaptcha = ({ onCompleted, onRendered, innerRef }) => {
  return (
    <ReCAPTCHA
      sitekey={RECAPTCHA_SITE_KEY}
      onChange={onCompleted}
      asyncScriptOnLoad={onRendered}
      ref={innerRef}
    />
  );
};

export default Recaptcha;
