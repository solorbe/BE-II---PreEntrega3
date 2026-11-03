
import { EventRepository } from '../repositories/events.repository.js';

export class EventService {
  constructor(eventRepository = new EventRepository()) {
    this.eventRepository = eventRepository;
  }

  async getAllEvent() {
    return await this.eventRepository.getAllEvent();
  }

  async createEvent(data) {
  return this.eventRepository.create(data);
  }
}

export const serviceEvent = new EventService();