const User = require("../../users/models");

async function createUser(request, response) {
  const { firstName, lastName, age, email, password } = request.body;
  if (firstName && lastName && age && email && password) {
    await User.create({
      firstName,
      lastName,
      age,
      email,
      password,
    });
  }
  response.json({ message: "User is created" });
}

module.exports = createUser;
