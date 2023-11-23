import React, { useContext, useState } from "react";
import { ThemeContext } from "../Context";
import { FaBars } from "react-icons/fa";
import { graphql, Link, useStaticQuery } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { H4 } from "../Typography/Text";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const [navbarOpen, setNavbarOpen] = useState(false);

  const LOGO_ALT = "Alex Li Logo";

  const data = useStaticQuery(graphql`
    query LogoQuery {
      dark: file(relativePath: { eq: "logo_dark.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      light: file(relativePath: { eq: "logo_light.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `);

  const logo = getImage(isDarkMode ? data.dark : data.light);
  return (
    <nav className="sticky bg-primary-400 dark:bg-primary-dark-200 top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <GatsbyImage
            image={logo}
            alt={LOGO_ALT}
            className="w-10 transform transition duration-200 hover:scale-110"
          />
        </Link>
        <div className="md:hidden flex items-center">
          <ThemeButton className="mr-2" />
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {
              setNavbarOpen(!navbarOpen);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        <div
          className={`${
            navbarOpen ? "" : "hidden"
          } w-full md:w-auto md:flex md:flex-row`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 items-center">
            <li>
              <Link to="/" aria-current="page">
                <H4 className="hover:text-secondary-300 dark:hover:text-secondary-dark-300">
                  Home
                </H4>
              </Link>
            </li>
            <li>
              <Link to="/about" aria-current="page">
                <H4 className="hover:text-secondary-300 dark:hover:text-secondary-dark-300">
                  About Me
                </H4>
              </Link>
            </li>
            <li>
              <Link to="/experience" aria-current="page">
                <H4 className="hover:text-secondary-300 dark:hover:text-secondary-dark-300">
                  Experience
                </H4>
              </Link>
            </li>
            <li>
              <Link to="/contact" aria-current="page">
                <H4 className="hover:text-secondary-300 dark:hover:text-secondary-dark-300">
                  Contact
                </H4>
              </Link>
            </li>
          </ul>
          <ThemeButton className="hidden md:block" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
