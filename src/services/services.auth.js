const bcrypt = require("bcrypt");

const signUp = async (User, name, email, password) => {
  const newUser = new User({
    name: name,
    email: email,
    password: password,
  });
  const user = await newUser.save();
  return {
    status: 201,
    data: { message: "User created successfully", user: user._id },
  };
};

const login = async (User, email, password) => {
  const user = await User.findOne({ email: email });
  if (user) {
    const response = await bcrypt
      .compare(password, user.password)
      .then((isEquals) => {
        if (isEquals) {
          return {
            status: 200,
            data: {
              message: "Credentials matched successfully",
              user: user._id,
            },
          };
        }
        return {
          status: 403,
          data: {
            message: "Invalid credentials",
          },
        };
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }
  return { status: 401, data: { message: "User does not exist" } };
};

module.exports = { signUp, login };
