const mongoose = require("mongoose");
const Order = require("../models/order");

exports.getOrders = async (req, res, next) => {
  try {
    const result = await Order.find({ id: req.params.id }, { __v: 0 });
    res.send(result);
  } catch (e) {
    next(e);
  }
};

exports.updateOrders = async (req, res, next) => {
  try {
    let errMsg;
    if (JSON.stringify(req.body) !== "{}" && req.body.data.length != 0) {
      const data = req.body.data;
      await Order.deleteMany({ id: data[0].id });
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === undefined || typeof data[i]._id !== "string") {
          data[i]._id = mongoose.Types.ObjectId();
        }
        await Order.updateMany(
          { _id: data[i]._id },
          { ...data[i] },
          { runValidators: true, upsert: true }
        ).catch((e) => {
          errMsg = e.message;
        });
      }
    }
    if (errMsg) res.status(400).send({ error: errMsg });
    else res.send({ success: true });
  } catch (e) {
    next(e);
  }
};

exports.deleteOrders = (req, res, next) => {
  try {
    Order.deleteMany({ id: req.params.id }, (err, result) => {
      if (err) {
        res.status(400).send({ error: err.message });
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteAllOrders = (req, res, next) => {
  try {
    Order.deleteMany({}, (err, result) => {
      if (err) {
        res.status(400).send({ error: err.message });
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    next(e);
  }
};
