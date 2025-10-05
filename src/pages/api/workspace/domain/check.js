import { validateSession } from '@/config/api-validation';
import api from '@/lib/common/api';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    await validateSession(req, res);
    const { domain } = req.query;
  const { checkNetlifyDomain } = require('@/lib/server/netlify');
  const accessToken = process.env.NETLIFY_ACCESS_TOKEN;
  const valid = await checkNetlifyDomain(domain, accessToken);
  res.status(200).json({ data: { valid } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
