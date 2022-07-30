import axios from "axios";
import { useState } from "react";

type MutationType<T> = [
  (data?: any) => Promise<void>,
  { loading: boolean; data?: T; error?: any }
];

export function useMutation<T>(url: string): MutationType<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<undefined | T>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  const mutation = async (data: any) => {
    setLoading(true);
    try {
      setData((await axios.post(url, data)).data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return [mutation, { loading, data, error }];
}
