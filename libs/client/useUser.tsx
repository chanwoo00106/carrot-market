import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export type User = {
  id: number;
  phone: string | null;
  email: string | null;
  name: string;
  avatar: string | null;
  createAt: Date;
  updateAt: Date;
};

const fetcher = async (url: string) => (await axios.get(url)).data;

export default function useUser() {
  const { data, error } = useSWR("/api/users/me", fetcher);
  const router = useRouter();
  return data;
}
