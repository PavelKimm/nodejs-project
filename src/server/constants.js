import dotenv from "dotenv";
dotenv.config();

//GENERAL
export const { NODE_ENV = "development", APP_PORT = 5000 } = process.env;
const IN_PROD = NODE_ENV === "production";

// REDIS
const {
  REDIS_PORT = 6379,
  REDIS_HOST = "localhost",
  REDIS_PASSWORD = "secret",
} = process.env;

export const REDIS_OPTIONS = {
  port: +REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
};

// SESSION
const HALF_HOUR = 1000 * 60 * 30;

const {
  SESSION_SECRET = `MY SECRET KEY`,
  SESSION_NAME = "sid",
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env;

export const SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
  secret: "keyboard cat",
};
