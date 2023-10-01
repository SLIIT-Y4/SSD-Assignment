import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const bucketURL = process.env.REACT_APP_BUCKET_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const streamAPIId = process.env.REACT_APP_STREAM_API_KEY;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(
  app,
  bucketURL
);
export default storage;
