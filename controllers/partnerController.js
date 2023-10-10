const catchAsync = require("../utils/catchAsync.js");
const Partner = require("../models/partnerModel.js");
const AppError = require("../utils/AppError.js");

exports.getAllPartners = catchAsync(async (req, res, next) => {
  const partners = await Partner.find();

  res.status(200).json({
    status: "success",
    results: partners.length,
    data: {
      partners,
    },
  });
});

exports.getPartner = catchAsync(async (req, res, next) => {
  const partner = await Partner.findById(req.params.id);

  if (!partner)
    return next(new AppError("There is no partner with this ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      partner,
    },
  });
});

exports.getNearestPartner = catchAsync(async (req, res, next) => {
  const { longitude, latitude } = req.body;

  // console.log(longitude, latitude);

  if (!longitude || !latitude)
    return next(new AppError("Please provide valid latitude and longitude"));

  const nearPartner = await Partner.findOne({
    address: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      nearPartner,
    },
  });
});

// exports.deleteAllPartners = catchAsync(async (req, res, next) => {
//   await Partner.deleteMany();

//   res.status(204).json({
//     message: "success",
//     data: null,
//   });
// });
