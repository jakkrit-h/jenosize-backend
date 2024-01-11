import admin, {
  ServiceAccount,
  credential,
  initializeApp,
} from 'firebase-admin';
const serviceAccount: ServiceAccount = {
  clientEmail: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL ?? '',
  privateKey: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY ?? '',
  projectId: process.env.GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID ?? '',
};

export function getFirebaseApp() {
  const firebaseApp = admin.initializeApp({
    credential: credential.cert(serviceAccount),
  });
  return firebaseApp;
}
