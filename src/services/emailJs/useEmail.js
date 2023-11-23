import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAIL_PUBLIC_KEY,
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
} from "./config";

export const useSendEmail = () => {
  useEffect(() => emailjs.init(EMAIL_PUBLIC_KEY), []);
  const [sendingEmailLoading, setSendingEmailLoading] = useState(false);

  const sendEmail = async (options) => {
    try {
      setSendingEmailLoading(true);
      return await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, options);
    } catch (error) {
      throw error;
    } finally {
      setSendingEmailLoading(false);
    }
  };

  return { sendingEmailLoading, sendEmail };
};
