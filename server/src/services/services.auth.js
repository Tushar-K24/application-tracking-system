const bcrypt = require("bcrypt");

const signUp = async (User, name, email, password, universityName) => {
  const newUser = new User({
    name: name,
    email: email,
    password: password,
    universityName: universityName,
  });
  const user = await newUser.save();
  return {
    status: 201,
    data: { message: "User created successfully", user: user },
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
              user: user,
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
