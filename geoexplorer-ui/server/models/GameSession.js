/**
 * GameSession model — stores each completed round.
 */
import mongoose from 'mongoose'

const latlngSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false },
)

const gameSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    imageUrl: { type: String, required: true },
    imageCredit: { type: String, default: '' },
    options: [{ type: String }],
    correctCountry: { type: String, required: true },
    userGuess: { type: String, default: '' },
    isCorrect: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    timeLimit: { type: Number, required: true },
    timeLeft: { type: Number, default: 0 },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    // Map data
    guessLatlng: { type: latlngSchema, default: undefined },
    correctLatlng: { type: latlngSchema, default: undefined },
    distance: { type: Number, default: undefined }, // km
  },
  { timestamps: true },
)

const GameSession = mongoose.model('GameSession', gameSessionSchema)
export default GameSession
