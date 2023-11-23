import React from "react";
import Layout from "../components/Layout";
import { Title, H3 } from "../components/Typography/Text";
import { motion as M } from "framer-motion";
import { fadeIn } from "../styles/animations";
import Button from "../components/Button/Button";
import { navigate } from "gatsby";
import strings from "../static_strings/404.strings";
import SEOHead from "../services/metadata/SEO";

export default function Missing() {
  return (
    <Layout>
      <M.div
        className="flex flex-col w-full pt-16 text-center items-center"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
        exit={fadeIn.exit}
      >
        <Title className="my-16 lg:mt-28 xl:mt-36">{strings.TITLE}</Title>
        <div className="my-8">
          <H3 className="my-2">{strings.PAGE_DOES_NOT_EXIST}</H3>
          <H3 className="my-2">{strings.NAVIGATE}</H3>
        </div>
        <Button
          label={strings.RETURN_HOME}
          onClick={() => {
            navigate("/");
          }}
        />
      </M.div>
    </Layout>
  );
}

export const Head = () => (
  <SEOHead title={strings.SEO_TITLE} description={strings.SEO_DESCRIPTION} />
);
