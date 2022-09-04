import crypto from 'crypto';

const tokenEmailHandler = ({ expireToken }) => {
  const token = {
    token: crypto.randomBytes(16).toString('hex'),
  };
  if (expireToken) {
    token.expireToken = Date.now() + expireToken;
  }
  return token;
};

export default tokenEmailHandler;
