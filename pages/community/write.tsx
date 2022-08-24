import { NextPage } from "next";
import Button from "@components/Button";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useMutation } from "@libs/index";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { longitude, latitude } = useCoords();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
  const onValid = async (data: WriteForm) => {
    if (loading) return;
    await post({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) router.push(`/community/${data.post.id}`);
  }, [data, router]);

  return (
    <Layout canGoBack seoTitle="community write">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
        <textarea
          {...register("question", { required: true, minLength: 5 })}
          className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
          rows={4}
          placeholder="Ask a question!"
        />
        <Button>{loading ? "Loading..." : "Submit"}</Button>
      </form>
    </Layout>
  );
};

export default Write;
