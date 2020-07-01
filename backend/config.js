import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/goshop',
  JWT_SECRET: process.env.JWT_SECRET || 'jwtsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'paypalClientId',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessId',
};
