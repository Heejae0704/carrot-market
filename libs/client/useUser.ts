import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface ProfileResponse {
  ok: boolean;
  profile?: User;
}

//SWR config did not cover the useUser used outside of the provider... -_-;;;
const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser(isPublic = false) {
  const { data, error } = useSWR<ProfileResponse>('/api/users/me', fetcher);
  const router = useRouter();
  useEffect(() => {
    if (isPublic) return;
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router, isPublic]);

  return { user: data?.profile, isLoading: !data && !error };
}
