const { where } = require("sequelize");
const { User } = require("../models");
const bycript = require('bcrypt')
const saltRound = 10

const getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "age", "numberPhone", "role"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(404).json({ error: "Failed to fetch data!" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "email", "age", "numberPhone", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "user id not found!" });
  }
};

const createUser = async (req, res) => {
  const { name, email, age, password, numberPhone, role } = req.body;
  try {
    const hashPassword = await bycript.hash(password, saltRound)
    const users = await User.create({
      name,
      email,
      age,
      password: hashPassword,
      numberPhone,
      role,
    });
    res.status(200).json(`create user successfully!`);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "create user failed!"});
  }
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.destroy({
        where: {
            id
        }
    })
    res.status(200).json('delete user successfully!')
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "delete user failed!"})
  }
};
const updateUserById = async (req, res) => {
    const id = req.params.id;
    const { name, email, password, numberPhone, age } = req.body;

    try {
        // Cek apakah password baru diberikan
        let hashPassword;
        if (password) {
            hashPassword = await bycript.hash(password, saltRound);
        }

        // Temukan pengguna berdasarkan ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json('User not found');
        }

        // Update data pengguna
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = hashPassword;
        }
        user.numberPhone = numberPhone || user.numberPhone;
        user.age = age || user.age;
        user.updatedAt = new Date();

        // Simpan perubahan
        await user.save();

        return res.status(200).json('User updated successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user!' });
    }
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById
};
