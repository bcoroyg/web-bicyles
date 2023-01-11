export const notFoundHandler = (req, res) => {
  res.status(404).render('error', {
    title: `Error ${res.statusCode}`,
    error: '¡No encontrado!',
  });
};
