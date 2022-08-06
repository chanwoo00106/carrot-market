import { useRouter } from "next/router";
import { useEffect } from "react";
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

interface useUserType {
  user: User;
  isLoading: boolean;
}

export default function useUser(): useUserType {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
