module.exports = (req, res, next) => {
  console.log(req.body.event);
  if (req.body.challenge) {
    res.status(200);
    res.contentType("text/plain");
    res.send(req.body.challenge);
  } else {
    next();
  }
};
