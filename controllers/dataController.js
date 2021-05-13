const Data = require('../models/dataModel');

exports.index = (req, res, next) => {
  Data.find()
    .then((datas) => {
      res.status(200).json(datas);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

exports.new = (req, res, next) => {
  const data = new Data({
    name: req.body.name,
    userId: req.body.userId,
    create_date: Date.now(),
    update_date: Date.now(),
  });
  data
    .save()
    .then((data) => {
      res.status(201).json({
        id: data.id,
        message: 'Data saved successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

exports.searchById = (req, res, next) => {
  Data.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(404).json({
        error,
      });
    });
};

exports.update = (req, res, next) => {
  const data = new Data({
    _id: req.params.id,
    name: req.body.name,
    userId: req.body.userId,
    update_date: Date.now(),
  });

  Data.updateOne({ _id: req.params.id }, data)
    .then(() => {
      res.status(202).json({
        message: 'Data updated successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

exports.delete = (req, res, next) => {
  Data.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Data deleted!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
