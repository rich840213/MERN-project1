const Patient = require("../models/patient");
const Order = require("../models/order");

exports.resetTestData = async (req, res, next) => {
  const patientList = [
    Patient({
      id: "1",
      name: "甲",
      orderId: 1,
    }),
    Patient({
      id: "2",
      name: "乙 ",
      orderId: 2,
    }),
    Patient({
      id: "3",
      name: "丙",
      orderId: 3,
    }),
    Patient({
      id: "4",
      name: "丁",
      orderId: 4,
    }),
    Patient({
      id: "5",
      name: "戊",
      orderId: 5,
    }),
  ];
  const orderList = [
    Order({
      id: "1",
      message: "超過120請施打8u",
    }),
    Order({
      id: "2",
      message: "無心跳請施行CPR與AED",
    }),
  ];

  try {
    await Patient.deleteMany({});
    await Order.deleteMany({});
    patientList.forEach((obj) => {
      obj.save();
    });
    orderList.forEach((obj) => {
      obj.save();
    });

    res.send({ success: true });
  } catch (e) {
    next(e);
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const result = await Patient.find({}, { __v: 0 });
    res.send(result);
  } catch (e) {
    next(e);
  }
};
