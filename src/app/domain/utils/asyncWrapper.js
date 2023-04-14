const asyncWrapper = (fn) => {
  return (req, res, next) => {
    return fn.call(this, req, res, next).catch(next);
  };
};

module.exports = {
  asyncWrapper,
};
