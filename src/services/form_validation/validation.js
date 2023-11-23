const isFieldEmpty = (field) => {
  return field.length === 0;
};

const isInvalidEmail = (email) => {
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  return !isValidEmail;
};

const isInvalidPhoneNumber = (phoneNumber) => {
  const isValidPhoneNumber = /^[0-9]{7,15}$/.test(phoneNumber);
  return !isValidPhoneNumber;
};

export const handleValidation = (
  name,
  email,
  phoneNumber,
  subject,
  message,
  setValidationErrors
) => {
  let newValidationErrors = {
    name: null,
    email: null,
    phoneNumber: null,
    subject: null,
    message: null,
  };

  const EMPTY_FIELD_ERROR = "This field cannot be empty.";
  const INVALID_PHONE_NUMBER_ERROR =
    "The provided phone number is invalid. Please enter a valid phone number.";
  const INVALID_EMAIL_ERROR =
    "The provided email is invalid. Please provide a valid email.";

  if (isInvalidEmail(email)) {
    newValidationErrors.email = INVALID_EMAIL_ERROR;
  }
  if (isInvalidPhoneNumber(phoneNumber)) {
    newValidationErrors.phoneNumber = INVALID_PHONE_NUMBER_ERROR;
  }
  if (isFieldEmpty(name)) {
    newValidationErrors.name = EMPTY_FIELD_ERROR;
  }
  if (isFieldEmpty(email)) {
    newValidationErrors.email = EMPTY_FIELD_ERROR;
  }
  if (isFieldEmpty(phoneNumber)) {
    newValidationErrors.phoneNumber = EMPTY_FIELD_ERROR;
  }
  if (isFieldEmpty(subject)) {
    newValidationErrors.subject = EMPTY_FIELD_ERROR;
  }
  if (isFieldEmpty(message)) {
    newValidationErrors.message = EMPTY_FIELD_ERROR;
  }

  setValidationErrors(newValidationErrors);
};

export const formContainsErrors = (
  name,
  email,
  phoneNumber,
  subject,
  message
) => {
  return (
    isInvalidEmail(email) ||
    isInvalidPhoneNumber(phoneNumber) ||
    isFieldEmpty(name) ||
    isFieldEmpty(email) ||
    isFieldEmpty(phoneNumber) ||
    isFieldEmpty(subject) ||
    isFieldEmpty(message)
  );
};

export const resetErrorValidation = (
  field,
  formFieldErrors,
  setFormFieldErrors
) => {
  if (formFieldErrors[field]) {
    let newFormFieldErrors = { ...formFieldErrors };
    newFormFieldErrors[field] = null;
    setFormFieldErrors(newFormFieldErrors);
  }
};
