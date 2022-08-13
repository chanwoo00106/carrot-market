import { NextPage } from "next";
import Button from "@components/Button";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useMutation } from "@libs/index";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface CreateForm {
  name: string;
  price: number;
  description: string;
}

interface StreamResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const { register, handleSubmit } = useForm<CreateForm>();
  const [create, { data, loading }] =
    useMutation<StreamResponse>("/api/streams");
  const router = useRouter();

  const onValid = async (form: CreateForm) => {
    await create(form);
    router.replace(`/stream/${data?.stream.id}`);
  };

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <div className="rounded-md relative flex  items-center shadow-sm">
            <input
              {...register("name", { required: true })}
              id="name"
              type="text"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
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
              {...register("price", { required: true })}
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              id="price"
              type="text"
              placeholder="0.00"
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
            {...register("description", { required: true })}
            className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
            rows={4}
          />
        </div>
        <Button>{loading ? "Loading..." : "Go Live"}</Button>
      </form>
    </Layout>
  );
};

export default Create;
