const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

const STORE_CORS = process.env.STORE_CORS || "http://localhost:3000";

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store";

const DATABASE_TYPE = process.env.DATABASE_TYPE || "postgres";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      capture: true,
    },
  },
  /*{
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },*/
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: "medusa-file-s3",
    options: {
      s3_url: process.env.S3_URL,
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      access_key_id: process.env.S3_ACCESS_KEY_ID,
      secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
      aws_config_option: {},
    },
  },
];

const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  // jwtSecret: process.env.JWT_SECRET,
  // cookieSecret: process.env.COOKIE_SECRET,
  redis_url: REDIS_URL,
  database_url: DATABASE_URL,
  database_type: DATABASE_TYPE,
  admin_cors: ADMIN_CORS,
  store_cors: STORE_CORS,
  database_extra:
    process.env.NODE_ENV !== "development"
      ? { ssl: { rejectUnauthorized: false } }
      : {},
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
  featureFlags: {
    product_categories: true,
  }
};
