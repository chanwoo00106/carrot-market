import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import { NextPage, GetStaticProps } from "next";
import matter from "gray-matter";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="font-semibold text-lg mb-10 text-center mt-5">
        Latest Posts
      </h1>
      <ul>
        {posts.map((post, i) => (
          <Link key={i} className="mb-5" href={`/blog/${post.slug}`}>
            <a>
              <span className="text-lg text-red-500">{post.title}</span>
              <div>
                <span>
                  {post.date} / {post.category}
                </span>
              </div>
            </a>
          </Link>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const posts = readdirSync("./posts").forEach((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });
  return {
    props: {
      posts,
    },
  };
};

export default Blog;
