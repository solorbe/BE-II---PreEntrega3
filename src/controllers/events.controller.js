// import { EventModel } from '../models/events.model.js';
import {serviceEvent} from '../services/events.services.js';

export const getAllEvent = async (req, res) => {
  try {
    const result = await serviceEvent.getAllEvent(req.query);

    res.status(200).json({
      status: 'success',
      payload: result
    });

  } catch (error) {
    res.status(error.statusCode ?? 500).json({
      status: 'error',
      message: error.message
    });
  }
};


export const createEvent = async (req, res) => {
  try {
    const {title,
    description,
    date,
    location,
    capacity,
    status} = req.body

    if (!title || !location || !capacity) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Faltan campos obligatorios' });
    }

    const newEvent = await serviceEvent.createEvent(req.body);
    return res.status(201).json({
      status: 'success',
      payload: newEvent
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
