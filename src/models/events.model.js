import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    qvendidas: {type: Number, default:0},
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'finished', 'soldout'],
      default: 'draft',
    },
  },
  { timestamps: true },
);

export const EventModel = mongoose.model('events', eventSchema);