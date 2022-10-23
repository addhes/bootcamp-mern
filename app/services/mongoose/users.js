const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model')
const { BadRequestError } = require('../../errors');

const createOrganizer = async (req) => {
    const { organizer, role, email, password, confirmPassword, name} = req.body;

    console.log('req.body');
    console.log(req.body)

    if (password !== confirmPassword) {
        throw new BadRequestError('Password dan confirmPassword tidak cocok');
    }

    const result = await Organizers.create({ organizer });

    console.log('result')
    console.log(result)

    const users = await Users.create({
        email,
        name,
        password,
        organizer: result._id,
        role,
    });

    console.log('users')
    console.log(users)

    delete users._doc.password

    return users;
};

module.exports = {createOrganizer};