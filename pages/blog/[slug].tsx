import { readdirSync, readFileSync } from "fs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Post: NextPage = () => {
  return <h1>hi</h1>;
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = readdirSync("./posts").map((i) => {
    const [name, extention] = i.split(".");
    return { params: { slug: name } };
  });

  return {
    paths: posts,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default Post;
