import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CF_TOKEN}`,
      },
    }
  );

  const responseJson = await response.json();

  console.log(responseJson);

  res.json({
    ok: true,
    ...responseJson.result,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
