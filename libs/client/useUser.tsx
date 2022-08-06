import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type User = {
  id: number;
  phone: string | null;
  email: string | null;
  name: string;
  avatar: string | null;
  createAt: Date;
  updateAt: Date;
};

export default function useUser() {
  const [user, setUser] = useState<User | undefined>();
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/users/me").then((res) => {
      if (!res.data.ok) router.push("/enter");

      setUser(res.data.profile);
    });
  }, [router]);
  return user;
}
