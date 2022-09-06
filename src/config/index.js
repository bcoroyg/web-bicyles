if (process.env.NODE_ENV !== 'production') {
  (await import('dotenv')).config();
}

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  host: process.env.HOST,
  secretSession: process.env.SECRET_SESSION,
  keySession: process.env.KEY_SESSION,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

export default config;
