import type { NextPage } from "next";
import Button from "@components/Button";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useMutation } from "@libs/client/useMutation";
import { useEffect } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
  name: string;
  price: string;
  description: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");

  const onValid = async (data: UploadProductForm) => {
    if (loading) return;
    await uploadProduct(data);
  };

  useEffect(() => {
    if (!data?.ok) return;

    router.push(`/items/${data?.product.id}`);
  }, [data, router]);

  return (
    <Layout canGoBack title="Upload Product" seoTitle="items upload">
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 px-4 py-16">
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 py-6 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <div className="rounded-md relative flex  items-center shadow-sm">
            <input
              id="name"
              type="text"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              {...register("name", { required: true })}
            />
          </div>
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="price"
          >
            Price
          </label>
          <div className="rounded-md relative flex items-center shadow-sm">
            <div className="absolute pointer-events-none left-0 pl-3 flex items-center justify-center">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              id="price"
              type="text"
              placeholder="0.00"
              {...register("price", { required: true })}
            />
            <div className="absolute right-0 pointer-events-none pr-3 flex items-centerj">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
            rows={4}
            {...register("description")}
          />
        </div>
        <Button>{loading ? "Loading..." : "Upload product"}</Button>
      </form>
    </Layout>
  );
};

export default Upload;
