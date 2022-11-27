import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
    // Done - seller cannot create a chatroom --> implement the logic in the frontend, but just in case,
    // Done - if sellerId === user?.id, do nothing. (or maybe generate error)

    // Done - buyer might have previous chat --> check!
    // Done - to check, the request should send the productId and product's userId(sellerId) as queries to API
    // Done - if there is no previous chat, create a chatroom

    // Done - else, tell the frontend the chatroom ID so that the user can be redirected to the chatroom
    const {
      query: { productId, sellerId },
      session: { user },
    } = req;

    if (sellerId === user?.id) return;

    const existingChatroom = await client.chatroom.findFirst({
      where: {
        productId: Number(productId),
        buyerId: Number(user?.id),
        sellerId: Number(sellerId),
      },
    });

    if (existingChatroom) {
      res.json({
        ok: true,
        chatroomId: existingChatroom.id,
      });
    } else {
      const chatroom = await client.chatroom.create({
        data: {
          product: {
            connect: {
              id: Number(productId),
            },
          },
          buyer: {
            connect: {
              id: Number(user?.id),
            },
          },
          seller: {
            connect: {
              id: Number(sellerId),
            },
          },
        },
      });

      res.json({
        ok: true,
        chatroomId: chatroom.id,
      });
    }
  }

  if (req.method === 'GET') {
    // list the chatrooms the user is engaged in

    const {
      session: { user },
    } = req;

    const chatrooms = await client.chatroom.findMany({
      where: {
        OR: [{ buyerId: user?.id }, { sellerId: user?.id }],
      },
      include: {
        chatMessages: {
          select: {
            message: true,
            createdAt: true,
            userId: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
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
      },
    });

    res.json({
      ok: true,
      chatrooms,
    });
  }
}
export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
