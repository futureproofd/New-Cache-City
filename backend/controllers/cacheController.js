exports.caches = (req, res) => {
  res.status(200).send('yo');
};

exports.addCache = (req, res) => {
  res.status(201).send('success, cache added');
};
