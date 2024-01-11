import admin, {
  ServiceAccount,
  credential,
  initializeApp,
} from 'firebase-admin';
const a: ServiceAccount = {
  clientEmail: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL,
  privateKey: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY,
  projectId: process.env.GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID,
};

export const firebaseApp = admin.initializeApp({
  credential: credential.cert(a),
});
