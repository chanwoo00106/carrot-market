import Layout from "@components/layout";
import { NextPage } from "next";

const Blog: NextPage = () => {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="font-semibold text-lg">Latest Posts</h1>
    </Layout>
  );
};

export default Blog;
