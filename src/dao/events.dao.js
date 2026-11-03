//import mongoose from 'mongoose';
import { EventModel } from '../models/events.model.js';

export class EventDao {
  async getAllEvent() {
    return EventModel.find();
  }
  async create(data) {
    return EventModel.create(data);
  }
}