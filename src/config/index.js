if (process.env.NODE_ENV !== 'production') {
  (await import('dotenv')).config();
}

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
};

export default config;
