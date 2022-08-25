import { GetStaticProps, NextPage } from "next";

const Post: NextPage = () => {
  return <h1>hi</h1>;
};

const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default Post;
