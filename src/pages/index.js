import React, { useContext } from "react";
import { ThemeContext } from "../components/Context";
import Layout from "../components/Layout";
import PortfolioSVG from "../components/svgs/PortfolioSVG/PortfolioSVG";
import { StaticImage } from "gatsby-plugin-image";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { graphql } from "gatsby";
import { PLarge, Title } from "../components/Typography/Text";
import { motion as M } from "framer-motion";
import { fadeIn, spin } from "../styles/animations";
import SEOHead from "../services/metadata/SEO";
import strings from "../static_strings/index.strings";

export default function Home({ data }) {
  const { isDarkMode } = useContext(ThemeContext);
  // const introText = data.contentfulIntroText.text.text;
  // const resumeUrl = data.contentfulFile.file.file.url;
  const profile = getImage(isDarkMode ? data.dark : data.light);

  const LINKEDIN_LINK = "LinkedIn link";
  const GITHUB_LINK = "Github link";
  const INSTAGRAM_LINK = "Instagram link";
  const RESUME_LINK = "Résumé link";

  return (
    <Layout>
      <M.div
        className="flex flex-col w-full pt-16 lg:pt-32 xl:pt-44"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
        exit={fadeIn.exit}
      >
        <div className="flex flex-wrap-reverse items-center justify-center mx-5 overflow-hidden">
          <div className="flex-col">
            <Title className="text-center">
              MTE Capstone: The SensiTouch Glove
            </Title>
            <div className="mt-6">
              <PLarge className="text-center">
                The SensiTouch Glove allows for user for hand and arm prostetics
                to regain feeling again.
              </PLarge>
            </div>
          </div>
          <M.div
            animate={spin.animate}
            transition={spin.transition}
            className="rounded-full border-r-2 m-12 border-secondary-500 dark:border-secondary-dark-500"
          >
            <M.div
              animate={spin.reverse.animate}
              transition={spin.reverse.transition}
              className="p-4"
            >
              {/* <StaticImage
                quality={90}
                src="../assets/images/profile_picture.webp"
                width={256}
                className="rounded-full"
                alt={strings.PROFILE_HEADSHOT}
              /> */}
              <GatsbyImage
                image={profile}
                alt={strings.PROFILE_HEADSHOT}
                className="rounded-full"
              />
            </M.div>
          </M.div>
        </div>
        {/* <div className="flex flex-row flex-wrap justify-center">
          <div className="flex flex-row my-12 md:mt-6">
            <M.a
              href="https://www.linkedin.com/in/zishu-alex-li-54b35718b/"
              target="_blank"
              rel="noreferrer"
              initial={fadeIn.icons.initial}
              animate={fadeIn.icons.animate}
              transition={{ ...fadeIn.icons.transition, delay: 1 }}
              className="group mx-7 p-3 rounded-full border-2 border-primary-200 dark:border-primary-dark-200 hover:border-secondary-200 dark:hover:border-secondary-dark-400"
              aria-label={LINKEDIN_LINK}
            >
              <FaLinkedin className="text-typography dark:text-typography-dark text-3xl transform transition duration-200 group-hover:scale-110" />
            </M.a>
            <M.a
              href="https://github.com/LiAlex-CS"
              target="_blank"
              rel="noreferrer"
              initial={fadeIn.icons.initial}
              animate={fadeIn.icons.animate}
              transition={{ ...fadeIn.icons.transition, delay: 1.3 }}
              className="group mx-7 p-3 rounded-full border-2 border-primary-200 dark:border-primary-dark-200 hover:border-secondary-200 dark:hover:border-secondary-dark-400"
              aria-label={GITHUB_LINK}
            >
              <FaGithub className="text-typography dark:text-typography-dark text-3xl transform transition duration-200 group-hover:scale-110" />
            </M.a>
          </div>
          <div className="flex flex-row my-12 md:mt-6">
            <M.a
              href="https://www.instagram.com/li__alexx/"
              target="_blank"
              rel="noreferrer"
              initial={fadeIn.icons.initial}
              animate={fadeIn.icons.animate}
              transition={{ ...fadeIn.icons.transition, delay: 1.6 }}
              className="group mx-7 p-3 rounded-full border-2 border-primary-200 dark:border-primary-dark-200 hover:border-secondary-200 dark:hover:border-secondary-dark-400"
              aria-label={INSTAGRAM_LINK}
            >
              <FaInstagram className="text-typography dark:text-typography-dark text-3xl transform transition duration-200 group-hover:scale-110" />
            </M.a>
            <M.a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              initial={fadeIn.icons.initial}
              animate={fadeIn.icons.animate}
              transition={{ ...fadeIn.icons.transition, delay: 1.9 }}
              className="group mx-7 p-3 rounded-full border-2 border-primary-200 dark:border-primary-dark-200 hover:border-secondary-200 dark:hover:border-secondary-dark-400"
              aria-label={RESUME_LINK}
            >
              <HiOutlineDocumentText className="text-typography dark:text-typography-dark text-3xl transform transition duration-200 group-hover:scale-110" />
            </M.a>
          </div>
        </div> */}
      </M.div>
    </Layout>
  );
}

export const Head = () => <SEOHead />;

export const query = graphql`
  query ProfileQuery {
    dark: file(relativePath: { eq: "profile_dark.png" }) {
      childImageSharp {
        gatsbyImageData(width: 256, quality: 95)
      }
    }
    light: file(relativePath: { eq: "profile_light.png" }) {
      childImageSharp {
        gatsbyImageData(width: 256, quality: 95)
      }
    }
  }
`;
