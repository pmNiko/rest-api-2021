import User from "../../src/models/User";
import Role from "../../src/models/Role";

export async function newUser(username, email, password, roleName) {
  const role = await Role.findOne({ name: roleName });
  new User({
    username,
    email,
    password: await User.encryptPassword(password),
    roles: [role._id],
  }).save();
}
