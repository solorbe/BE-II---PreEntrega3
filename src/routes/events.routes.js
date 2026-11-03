
import { Router } from 'express';
import { getAllEvent, createEvent } from '../controllers/events.controller.js';

const router = Router();

router.get('/', getAllEvent);
router.post('/', createEvent);


export default router;
