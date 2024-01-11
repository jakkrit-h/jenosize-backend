import axios from 'axios';
import { Router } from 'express';

import { isValidApiKey } from '../middleware/auth';
import { xoBot } from '../services/JenosizeService';

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
router.get('/gamexo', isValidApiKey, async (req, res) => {
  try {
    const slotsParams = req.query.slots;
    if (
      !slotsParams ||
      !Array.isArray(slotsParams) ||
      slotsParams.length !== 9
    ) {
      throw new Error('Invalid Slots Param');
    } else {
      const slots = slotsParams.map((s) => {
        const cs = s ? Number(s) : 0;
        return cs === 1 ? 1 : cs === 2 ? 2 : 0;
      });
      const response = await xoBot(slots);

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
});

export default router;
