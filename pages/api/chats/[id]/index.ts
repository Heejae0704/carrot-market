import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const chatroom = await client.chatroom.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      buyer: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      seller: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      chatMessages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    chatroom,
  });
}
export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
