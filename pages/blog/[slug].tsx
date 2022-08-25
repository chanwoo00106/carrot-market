import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

const Post: NextPage<{ post: string }> = ({ post }) => {
  return <h1>{post}</h1>;
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = readdirSync("./posts").map((i) => {
    const [name, _] = i.split(".");
    return { params: { slug: name } };
  });

  return {
    paths: posts,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content } = matter.read(`./posts/${ctx.params?.slug}.md`);

  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: { post: value },
  };
};

export default Post;
