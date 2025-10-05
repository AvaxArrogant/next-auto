import { validateAddDomain, validateSession } from '@/config/api-validation';
import api from '@/lib/common/api';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const session = await validateSession(req, res);
    await validateAddDomain(req, res);
    const { domainName } = req.body;
  // TODO: Implement Netlify domain creation logic here
  res.status(501).json({ error: 'Netlify domain API not implemented yet.' });
  } else if (method === 'PUT') {
    const session = await validateSession(req, res);
    const { domainName } = req.body;
  // TODO: Implement Netlify domain verification logic here
  res.status(501).json({ error: 'Netlify domain verification not implemented yet.' });
  } else if (method === 'DELETE') {
    const session = await validateSession(req, res);
    const { domainName } = req.body;
  // TODO: Implement Netlify domain deletion logic here
  res.status(501).json({ error: 'Netlify domain deletion not implemented yet.' });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
