import mongoose, { Schema } from "mongoose";

const siteSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "processing", "success", "failed"]
  },
  Location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  PhoneNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  sitePlan: {
    type: String,
    required: true
  },
  labourInvolved: {
    type: Number,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  documents: [
    {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true // e.g., 'pdf', 'svg', 'docx'
      },
      url: {
        type: String,
        required: true // URL or path to the document
      },
      uploadedAt: {
        type: Date,
        default: Date.now // Timestamp for when the document was uploaded
      }
    }
  ]
});

const Site = mongoose.models.Site || mongoose.model('Site', siteSchema);
export { Site };
