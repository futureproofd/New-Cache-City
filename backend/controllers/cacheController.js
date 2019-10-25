exports.caches = (req, res) => {
  res.status(200).send('yo');
};

exports.addCache = (req, res) => {
  // todo feed address info into maps API
  res.status(201).send('success, cache added');
};
