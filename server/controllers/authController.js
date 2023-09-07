const signIn = (req, res) => {
  res.send("sign in ");
};

const signOut = (req, res) => {
  res.send("sign out ");
};

module.exports = {
  signIn,
  signOut,
};
