if (process.env.NODE_ENV !== 'production') {
  (await import('dotenv')).config();
}

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  secretSession: process.env.SECRET_SESSION,
  keySession: process.env.KEY_SESSION,
};

export default config;
