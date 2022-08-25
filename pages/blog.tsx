import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import { NextPage, GetStaticProps } from "next";
import matter from "gray-matter";

interface Post {
  title: string;
  date: string;
  category: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="font-semibold text-lg mb-10 text-center mt-5">
        Latest Posts
      </h1>
      <ul>
        {posts.map((post, i) => (
          <div key={i} className="mb-5">
            <span className="text-lg text-red-500">{post.title}</span>
            <div>
              <span>
                {post.date} / {post.category}
              </span>
            </div>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const posts = readdirSync("./posts").forEach((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return matter(content).data;
  });
  return {
    props: {
      posts,
    },
  };
};

export default Blog;
