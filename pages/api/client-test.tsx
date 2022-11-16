import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/server/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      email: 'test@test.com',
      name: 'testuser',
    },
  });

  res.json({
    ok: true,
  });
}
