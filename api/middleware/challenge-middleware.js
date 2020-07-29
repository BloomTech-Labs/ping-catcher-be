module.exports = (req, res, next) => {
  console.log("middleware", req.body.event);
  if (req.body.challenge) {
    res.status(200).contentType("text/plain").send(req.body.challenge);
  } else {
    next();
  }
};
