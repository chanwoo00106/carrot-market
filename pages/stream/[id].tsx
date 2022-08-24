import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { cls, useMutation } from "@libs/index";
import { Stream } from "@prisma/client";
import produce from "immer";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface StreamMessage {
  id: number;
  message: string;
  user: {
    avatar?: string | null;
    id: number;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    { refreshInterval: 1000 }
  );
  const [sendMessage, { loading }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );

  const onValid = async (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      produce(data, (draft) => {
        draft?.stream.messages.push({
          id: Date.now(),
          message: form.message,
          user: { id: user.id, avatar: user.avatar },
        });
      }),
      false
    );
    await sendMessage(form);
  };

  return (
    <Layout canGoBack seoTitle="stream detail">
      <div className="py-10 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="text-2xl block mt-3 text-gray-900">
            ${data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {data?.stream.messages.map((message) => (
              <div
                key={message.id}
                className={cls(
                  "flex items-center space-x-2",
                  user?.id === message.user.id &&
                    "flex-row-reverse space-x-reverse"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-slate-400" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex relative max-w-md items-center  w-full mx-auto"
            >
              <input
                type="text"
                {...register("message", { required: true })}
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
