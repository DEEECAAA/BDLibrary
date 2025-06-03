module.exports = (req, res, next) => {
  const user = req.body.user || req.user;
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Accesso non autorizzato' });
  }
  next();
};