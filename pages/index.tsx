import type { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Link from "next/link";
import useSWR from "swr";
import { Product } from "@prisma/client";

interface ProductsResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");
  console.log(data);

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5">
        {data?.products?.map((product) => (
          <Link href={`/items/${product.id}`} key={product.id}>
            <a>
              <div className="flex px-4 border-b last:border-0 pb-4 cursor-pointer justify-between">
                <div className="flex space-x-4">
                  <div className="w-20 h-20 bg-gray-400 rounded-md" />
                  <div className="pt-2 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <span className="font-medium text-sm mt-1 text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-end space-x-2">
                  <div className="flex space-x-0.5 items-center text-sm text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    <span>1</span>
                  </div>
                  <div className="flex space-x-0.5 items-center text-sm text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    <span>1</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <Link href="/items/upload">
        <a>
          <button className="fixed hover:bg-orange-500 transition-colors bottom-24 right-5 shadow-xl bg-orange-400 rounded-full p-4 text-white">
            <svg
              className="h-6 w-6"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </a>
      </Link>
    </Layout>
  );
};

export default Home;
