const buildImageUrl = (subfolder) => (req, res, next) => {
  if (!req.file) return next();

  const id  = req.params.id;
  const url = `${req.protocol}://${req.get('host')}/uploads/${subfolder}/${id}/${req.file.filename}`;
  req.imageUrl = url;
  next();
};

module.exports = buildImageUrl;

