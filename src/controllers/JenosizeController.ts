import axios from 'axios';
import { Router } from 'express';
import { initializeApp } from 'firebase-admin';
import { firebaseApp } from '../authentications/index';
import { isAuth, isValidApiKey } from '../middleware/auth';

const router = Router();
router.get('/', isValidApiKey, async (req, res) => {
  try {
    if (!req.query.search || req.query.search.length === 0) {
      throw new Error('Missing required field: search');
    }

    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        {
          params: {
            input: req.query.search,
            inputtype: 'textquery',
            key: process.env.GOOGLE_API_KEY,
            fields:
              'business_status,name,icon,place_id,geometry,photo,rating,formatted_address,opening_hours',
          },
        },
      )
      .then((response) => {
        res
          .status(response.data.status !== 'OK' ? 400 : 200)
          .json(response.data);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
});
// router.post('/login', async (req, res) => {
//   firebaseApp
//     .auth()
//     .verifyIdToken(
//       'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vamVub3NpemUtdGVzdC00MTA4MTUiLCJhdWQiOiJqZW5vc2l6ZS10ZXN0LTQxMDgxNSIsImF1dGhfdGltZSI6MTcwNDkxNTA2MywidXNlcl9pZCI6InBmSzA3NHM3cGhOSnltRzhyTXpGS3ZQUEN0QjIiLCJzdWIiOiJwZkswNzRzN3BoTkp5bUc4ck16Rkt2UFBDdEIyIiwiaWF0IjoxNzA0OTE1MDYzLCJleHAiOjE3MDQ5MTg2NjMsImVtYWlsIjoiamFra3JpdC5oYXJuQG91dGxvb2suY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpha2tyaXQuaGFybkBvdXRsb29rLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.nf3YXa5p24cjhWsntunA8Yq0O1hFLhIK40j_T9oZbrHfdp9hqSfARGRzi7NhnJnZeMGo_YWJnWkJCaKHcTZn-MFi4PgVNycoOW6_rGxXyHxtyD77aDXl8QiZqvLrPfxv0KSl6QTO7IOEh6l4tZyCDVzS-UKECX40LT0HQO6n9Yxdf2jY00YNMGhTBWjZrEnSARbjDdoQIjtYqwpGNuP48xp6YNV_wSUbZlsPXi_1-enjVQIWZ2YKl0x3BcejUlKgqUXkPueDa2lSIQw3DKLejbFNDpY6hu7PRosY_6_ztrg2OkI3TaTCKR7ziSou6SXGzhUdp6f5bQYtPKT6xDRGug',
//       true,
//     )
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });
// router.post('/signout', async (req, res) => {
//   firebaseApp.auth();
// });
export default router;
