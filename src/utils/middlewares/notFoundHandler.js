const notFoundHandler = (req, res) => {
  res.status(404);
  res.render('error', {
    title: `Error ${res.statusCode}`,
    error: '¡No encontrado!'
  });
};

export default notFoundHandler;
