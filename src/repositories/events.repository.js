import { EventDao } from '../dao/events.dao.js';

export class EventRepository {
  constructor(dao = new EventDao()) {
    this.dao = dao;
  }
  async getAllEvent() {
    return this.dao.getAllEvent();
  }
  async create(data) {
    return this.dao.create(data);
  }
}

