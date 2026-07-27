const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, //_id타입 저장
      ref: "User", //User 모델 참조
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    businessNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    ceoName: {
      type: String,
      required: true,
      trim: true,
    },

    businessType: {
      type: String,
      required: true,
      trim: true,
    },

    businessItem: {
      type: String,
      required: true,
      trim: true,
    },

    manager: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    fax: {
      type: String,
      trim: true,
      default: "",
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    zipCode: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    detailAddress: {
      type: String,
      required: true,
      trim: true,
    },
    stampKey: {
      type: String,
      default: "", //직인 이미지 파일 경로
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CompanyInfo", infoSchema);
