const mongoose = require("mongoose");

const estimateItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discountRate: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const estimateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    customer: {
      type: String,
      required: true,
      trim: true,
    },

    taxType: {
      type: String,
      enum: ["taxable", "taxFree"],
      required: true,
    },

    items: {
      type: [estimateItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "견적 품목은 최소 1개 이상이어야 합니다.",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Estimate", estimateSchema);
