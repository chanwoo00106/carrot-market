import { useState } from "react";

type MutationType<T> = [
  (data?: any) => void,
  { loading: boolean; data: undefined | T; error: undefined | any }
];

export function useMutation<T>(url: string): MutationType<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<undefined | T>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  const mutation = (data: any) => {};

  return [mutation, { loading, data, error }];
}
