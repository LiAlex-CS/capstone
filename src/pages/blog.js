import React from "react";
import Layout from "../components/Layout";
import { H2, H3, Title, P, PLarge } from "../components/Typography/Text";
import { motion as M } from "framer-motion";
import { fadeIn } from "../styles/animations";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import { twMerge } from "tailwind-merge";
import strings from "../static_strings/experience.strings";
import SEOHead from "../services/metadata/SEO";

const seperateParagraphs = (text) => {
  let paragraphs = [];
  let currentParagraph = "";
  let index = 0;
  while (index < text.length) {
    const currentChar = text[index];
    if (
      currentChar === "\\" &&
      index + 1 < text.length &&
      text[index + 1] === "n"
    ) {
      paragraphs.push(currentParagraph);
      currentParagraph = "";
      index += 2;
    } else {
      currentParagraph += currentChar;
      index += 1;
    }
  }
  paragraphs.push(currentParagraph);
  return paragraphs;
};

const BlogSection = ({ header, date, body, imageData, caption, className }) => {
  const formattedDate = new Date(`${date} EDT`).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={twMerge(
        "flex flex-col justify-center items-center w-full",
        className
      )}
    >
      <div className="rounded-3xl flex flex-col text-start flex-wrap my-8 w-11/12 lg:w-3/4 2xl:w-1/2 p-8 bg-primary-400 dark:bg-primary-dark-200">
        <H2 className="mb-4">{header}</H2>
        <P className="mb-4">{formattedDate}</P>
        {seperateParagraphs(body).map((paragraph, index) => (
          <PLarge className="my-3" key={`${header}-${index}`}>
            {paragraph}
          </PLarge>
        ))}
      </div>
      {imageData ? (
        <div className="rounded-3xl flex flex-col my-10 bg-primary-400 dark:bg-primary-dark-200 max-w-2xl mx-7">
          <GatsbyImage
            image={getImage(imageData)}
            alt={imageData.description}
            className="rounded-t-3xl"
          />
          <P className="m-4 text-gray-400 dark:text-zinc-400">{caption}</P>
        </div>
      ) : null}
    </div>
  );
};

export default function Blog({ data }) {
  const blogs = data.allContentfulBlog.nodes;
  const sortedBlogs = blogs.sort((a, b) =>
    a.entryDate > b.entryDate ? 1 : b.entryDate > a.entryDate ? -1 : 0
  );

  return (
    <Layout>
      <M.div
        className="flex flex-col w-full text-center items-center overflow-x-hidden"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
        exit={fadeIn.exit}
      >
        <Title className="my-16 lg:my-28 xl:my-36">{strings.TITLE}</Title>
        <M.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
          className="w-full flex flex-col items-center"
        >
          <H3 className="max-w-lg my-4">{strings.UPDATES}</H3>
          {sortedBlogs.map((blog, index) => (
            <BlogSection
              key={index}
              header={blog.header}
              date={blog.entryDate}
              body={blog.body.body}
              imageData={blog.image}
              caption={blog.imageCaption}
            />
          ))}
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
  query BlogQuery {
    allContentfulBlog {
      nodes {
        header
        entryDate
        image {
          gatsbyImageData(width: 1024)
          description
        }
        imageCaption
        body {
          body
        }
      }
    }
  }
`;
