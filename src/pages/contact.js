import React, { useState, useRef } from "react";
import Layout from "../components/Layout";
import { H3, P, Title } from "../components/Typography/Text";
import { motion as M } from "framer-motion";
import { fadeIn } from "../styles/animations";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { graphql } from "gatsby";
import Button from "../components/Button/Button";
import { useSendEmail } from "../services/emailJs/useEmail";
import {
  handleValidation,
  formContainsErrors,
  resetErrorValidation,
} from "../services/form_validation/validation";
import { FiAlertCircle } from "react-icons/fi";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import Recaptcha from "../services/recaptchaV2/recaptcha";
import strings from "../static_strings/contact.strings";
import SEOHead from "../services/metadata/SEO";

const FormInput = ({
  label,
  id,
  type,
  placeholder,
  value,
  setValue,
  isTextArea,
}) => {
  return (
    <div className="my-6 text-start">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        <H3>{label}</H3>
      </label>
      {isTextArea ? (
        <textarea
          type="text"
          rows={6}
          className="block p-2.5 w-full text-sm text-typography bg-gray-100 rounded-lg border border-gray-300 focus:ring-secondary-500 focus:border-secondary-500 focus:outline-none font-[Urbanist]"
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
          value={value}
          placeholder={placeholder}
          id={id}
        />
      ) : (
        <input
          type={type ?? "text"}
          className="bg-gray-100 border border-gray-300 text-typography text-sm rounded-lg focus:ring-secondary-500 focus:border-secondary-500 block w-full p-2.5 focus:outline-none font-[Urbanist]"
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
          value={value}
          placeholder={placeholder}
          id={id}
        />
      )}
    </div>
  );
};

const ValidationError = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div className="flex flex-row items-center">
        <FiAlertCircle className="text-red-500 dark:text-red-600 mx-3" />
        <P className="text-red-500 dark:text-red-600">{errorMessage}</P>
      </div>
    );
  }
};

const EmailSentResponseMessage = ({ response }) => {
  if (response) {
    if (response.status === 200) {
      return (
        <div className="flex flex-row items-center my-4">
          <BsCheckCircle className="text-green-500 dark:text-green-600 mx-3" />
          <P className="text-green-500 dark:text-green-600">
            {strings.VALIDATION.SUCCESS}
          </P>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row items-center my-4">
          <BsXCircle className="text-red-500 dark:text-red-600 mx-3" />
          <P className="text-red-500 dark:text-red-600">
            {strings.VALIDATION.FAILURE}
          </P>
        </div>
      );
    }
  }
};

export default function Contact({ data }) {
  const resumeUrl = data.contentfulFile.file.file.url;

  const LINKEDIN_LINK = "LinkedIn link";
  const GITHUB_LINK = "Github link";
  const INSTAGRAM_LINK = "Instagram link";
  const RESUME_LINK = "Résumé link";

  const recaptchaRef = useRef();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [formFieldErrors, setFormFieldErrors] = useState({
    name: null,
    email: null,
    phoneNumber: null,
    subject: null,
    message: null,
  });
  const [sendingEmailResponse, setSendingEmailResponse] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const setFormField = (field, value) => {
    const newFormFields = { ...formFields };
    newFormFields[field] = value;
    setFormFields(newFormFields);
  };

  const filterOnlyAlphanumeric = (phoneNumber) => {
    return phoneNumber.replace(/[^a-zA-Z0-9]/g, "");
  };

  const formatPhoneNumber = (phoneNumber) => {
    const hasLetters = /[A-Za-z]/.test(phoneNumber);
    const alphanumericPhoneNumber = filterOnlyAlphanumeric(phoneNumber);

    const phoneNumberLength = alphanumericPhoneNumber.length;

    if (hasLetters || phoneNumberLength <= 3 || phoneNumberLength > 15) {
      return alphanumericPhoneNumber.toUpperCase();
    } else if (phoneNumberLength <= 7) {
      const phoneNumberWithDash = `${alphanumericPhoneNumber.substring(
        0,
        3
      )}-${alphanumericPhoneNumber.substring(3, phoneNumberLength)}`;
      return phoneNumberWithDash;
    } else if (phoneNumberLength <= 10) {
      const fullFormatedPhoneNumber = `(${alphanumericPhoneNumber.substring(
        0,
        3
      )}) ${alphanumericPhoneNumber.substring(
        3,
        6
      )}-${alphanumericPhoneNumber.substring(6, phoneNumberLength)}`;
      return fullFormatedPhoneNumber;
    } else if (phoneNumberLength <= 13) {
      const countryCodeEndIndex = phoneNumberLength - 10;
      const fullPhoneNumber = `+${alphanumericPhoneNumber.substring(
        0,
        countryCodeEndIndex
      )} (${alphanumericPhoneNumber.substring(
        countryCodeEndIndex,
        countryCodeEndIndex + 3
      )}) ${alphanumericPhoneNumber.substring(
        countryCodeEndIndex + 3,
        countryCodeEndIndex + 6
      )}-${alphanumericPhoneNumber.substring(
        countryCodeEndIndex + 6,
        phoneNumberLength
      )}`;
      return fullPhoneNumber;
    } else {
      const countryCodeEndIndex = phoneNumberLength - 10;

      const unformattedCountryCode = alphanumericPhoneNumber.substring(
        0,
        countryCodeEndIndex
      );
      const countryCodePrefixEndIndex = unformattedCountryCode.length - 3;
      const formattedCountryCode = `+${unformattedCountryCode.substring(
        0,
        countryCodePrefixEndIndex
      )}-${unformattedCountryCode.substring(
        countryCodePrefixEndIndex,
        unformattedCountryCode.length
      )}`;

      const unformattedPhoneNumber = alphanumericPhoneNumber.substring(
        countryCodeEndIndex,
        phoneNumberLength
      );
      const formattedPhoneNumber = `(${unformattedPhoneNumber.substring(
        0,
        3
      )}) ${unformattedPhoneNumber.substring(
        3,
        6
      )}-${unformattedPhoneNumber.substring(6, unformattedPhoneNumber.length)}`;

      const fullPhoneNumber = `${formattedCountryCode} ${formattedPhoneNumber}`;
      return fullPhoneNumber;
    }
  };

  const { sendingEmailLoading, sendEmail } = useSendEmail();

  const handleSubmitForm = async () => {
    handleValidation(
      formFields.name,
      formFields.email,
      formFields.phoneNumber,
      formFields.subject,
      formFields.message,
      setFormFieldErrors
    );
    if (
      !formContainsErrors(
        formFields.name,
        formFields.email,
        formFields.phoneNumber,
        formFields.subject,
        formFields.message
      )
    ) {
      try {
        const sentEmailResponse = await sendEmail({
          name: formFields.name,
          email: formFields.email,
          phoneNumber: formatPhoneNumber(formFields.phoneNumber),
          subject: formFields.subject,
          message: formFields.message,
          "g-recaptcha-response": recaptchaToken,
        });
        setFormFields({
          name: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
        recaptchaRef.current.reset();
        setSendingEmailResponse(sentEmailResponse);
      } catch (error) {
        setSendingEmailResponse(error);
        setFormFields({
          name: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
        recaptchaRef.current.reset();
      }
    }
  };

  const resetResponse = () => {
    if (sendingEmailResponse) {
      setSendingEmailResponse(null);
    }
  };

  const FORM_INPUT_ENUM = {
    NAME: "name",
    EMAIL: "email",
    PHONE_NUMBER: "phoneNumber",
    SUBJECT: "subject",
    MESSAGE: "message",
  };

  return (
    <Layout>
      <M.div
        className="flex flex-col w-full text-center items-center"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
        exit={fadeIn.exit}
      >
        <div className="my-20">
          <Title>{strings.TITLE}</Title>
        </div>
        <M.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
          className="flex flex-row flex-wrap justify-center"
        >
          <div className="flex flex-row my-12 md:mt-6">
            <a
              href="https://www.linkedin.com/in/zishu-alex-li-54b35718b/"
              target="_blank"
              rel="noreferrer"
              className="group mx-7 p-3 rounded-full border-2 border-primary-200 dark:border-primary-dark-200 hover:border-secondary-200 dark:hover:border-secondary-dark-400"
              aria-label={LINKEDIN_LINK}
            >
              <FaLinkedin className="text-typography dark:text-typography-dark text-3xl transform transition duration-200 group-hover:scale-110" />
            </a>
            <a
              href="https://github.com/LiAlex-CS"
              target="_blank"
              rel="noreferrer"
              className="group mx-7 p-3 rounded-full border-2 border-primary-200 dark:border-primary-dark-200 hover:border-secondary-200 dark:hover:border-secondary-dark-400"
              aria-label={GITHUB_LINK}
            >
              <FaGithub className="text-typography dark:text-typography-dark text-3xl transform transition duration-200 group-hover:scale-110" />
            </a>
          </div>
          <div className="flex flex-row my-12 md:mt-6">
            <a
              href="https://www.instagram.com/li__alexx/"
              target="_blank"
              rel="noreferrer"
              className="group mx-7 p-3 rounded-full border-2 border-primary-200 dark:border-primary-dark-200 hover:border-secondary-200 dark:hover:border-secondary-dark-400"
              aria-label={INSTAGRAM_LINK}
            >
              <FaInstagram className="text-typography dark:text-typography-dark text-3xl transform transition duration-200 group-hover:scale-110" />
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="group mx-7 p-3 rounded-full border-2 border-primary-200 dark:border-primary-dark-200 hover:border-secondary-200 dark:hover:border-secondary-dark-400"
              aria-label={RESUME_LINK}
            >
              <HiOutlineDocumentText className="text-typography dark:text-typography-dark text-3xl transform transition duration-200 group-hover:scale-110" />
            </a>
          </div>
        </M.div>
        <M.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.6 }}
          className="w-11/12 lg:w-3/4 2xl:w-1/2"
        >
          <form>
            <FormInput
              label={strings.FORM.NAME.label}
              placeholder={strings.FORM.NAME.placeholder}
              value={formFields.name}
              setValue={(name) => {
                resetErrorValidation(
                  FORM_INPUT_ENUM.NAME,
                  formFieldErrors,
                  setFormFieldErrors
                );
                resetResponse();
                setFormField(FORM_INPUT_ENUM.NAME, name);
              }}
              id="input-name"
            />
            <ValidationError errorMessage={formFieldErrors.name} />
            <FormInput
              label={strings.FORM.EMAIL.label}
              type="email"
              placeholder={strings.FORM.EMAIL.placeholder}
              value={formFields.email}
              setValue={(email) => {
                resetErrorValidation(
                  FORM_INPUT_ENUM.EMAIL,
                  formFieldErrors,
                  setFormFieldErrors
                );
                resetResponse();
                setFormField(FORM_INPUT_ENUM.EMAIL, email);
              }}
              id="input-email"
            />
            <ValidationError errorMessage={formFieldErrors.email} />
            <FormInput
              label={strings.FORM.PHONE_NUMBER.label}
              type="tel"
              placeholder={strings.FORM.PHONE_NUMBER.placeholder}
              value={formatPhoneNumber(formFields.phoneNumber)}
              setValue={(phoneNumber) => {
                resetErrorValidation(
                  FORM_INPUT_ENUM.PHONE_NUMBER,
                  formFieldErrors,
                  setFormFieldErrors
                );
                resetResponse();
                setFormField(
                  FORM_INPUT_ENUM.PHONE_NUMBER,
                  filterOnlyAlphanumeric(phoneNumber)
                );
              }}
              id="input-phone-number"
            />
            <ValidationError errorMessage={formFieldErrors.phoneNumber} />
            <FormInput
              label={strings.FORM.SUBJECT.label}
              placeholder={strings.FORM.SUBJECT.placeholder}
              value={formFields.subject}
              setValue={(subject) => {
                resetErrorValidation(
                  FORM_INPUT_ENUM.SUBJECT,
                  formFieldErrors,
                  setFormFieldErrors
                );
                resetResponse();
                setFormField(FORM_INPUT_ENUM.SUBJECT, subject);
              }}
              id="input-subject"
            />
            <ValidationError errorMessage={formFieldErrors.subject} />
            <FormInput
              label={strings.FORM.MESSAGE.label}
              placeholder={strings.FORM.MESSAGE.placeholder}
              value={formFields.message}
              setValue={(message) => {
                resetErrorValidation(
                  FORM_INPUT_ENUM.MESSAGE,
                  formFieldErrors,
                  setFormFieldErrors
                );
                resetResponse();
                setFormField(FORM_INPUT_ENUM.MESSAGE, message);
              }}
              isTextArea
              id="input-message"
            />
            <ValidationError errorMessage={formFieldErrors.message} />
          </form>
        </M.div>
        <M.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.9 }}
        >
          <Recaptcha
            onCompleted={(token) => {
              setRecaptchaToken(token);
            }}
            onRendered={() => {
              setRecaptchaLoaded(true);
            }}
            innerRef={recaptchaRef}
          />
        </M.div>
        <M.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 1.2 }}
        >
          <Button
            label={strings.SUBMIT}
            type="submit"
            onClick={handleSubmitForm}
            loading={sendingEmailLoading}
            disabled={!recaptchaLoaded || !recaptchaToken}
          />
          <EmailSentResponseMessage response={sendingEmailResponse} />
        </M.div>
      </M.div>
    </Layout>
  );
}

export const Head = () => (
  <SEOHead
    title={strings.SEO_TITLE}
    description={strings.SEO_DESCRIPTION}
    pathname={strings.PATH}
  />
);

export const query = graphql`
  query ResumeQuery {
    contentfulFile(name: { eq: "Resume" }) {
      file {
        file {
          url
        }
      }
    }
  }
`;
