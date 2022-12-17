export default (req, res) => {
  if (!req.body) {
    res.status(400);
    res.send({
      name: "bodyBlank",
    });
    return false;
  }
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.send({
      name: "bodyBlank",
    });
    return false;
  }
  return true;
};
