const { User } = require("../models");

exports.login = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    where: body,
  });
  if (user) {
    res.redirect(`/users/${user.id}/booking`);
  } else {
    res.redirect(`/?error=wrongcredentials`);
  }
};
