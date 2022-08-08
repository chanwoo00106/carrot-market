import Button from "@components/Button";
import type { NextPage } from "next";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Product } from "@prisma/client";
import Link from "next/link";

interface UserAndProduct extends Product {
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

interface ItemDetailResponse {
  ok: boolean;
  product: UserAndProduct;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ItemDetailResponse>(
    router.query.id && `/api/products/${router.query.id}`
  );

  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`user/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product.name}
            </h1>
            <p className="text-3xl block mt-3 text-gray-900">
              ${data?.product.price}
            </p>
            <p className="text-base my-6 text-gray-700">
              {data?.product.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button>Talk to seller</Button>
              <button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mb-4 font-bold text-gray-900">
            Similar items
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts?.map((product) => (
              <div key={product.id}>
                <div className="h-56 w-full bg-slate-300" />
                <h3 className="text-sm text-gray-700 -mb-1">{product.name}</h3>
                <span className="text-sm font-medium text-gray-900">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
