import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser(isPublic = false) {
  const { data, error } = useSWR<ProfileResponse>('/api/users/me');
  const router = useRouter();
  useEffect(() => {
    if (isPublic) return;
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router, isPublic]);

  return { user: data?.profile, isLoading: !data && !error };
}
