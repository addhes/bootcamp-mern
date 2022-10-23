const Images = require('../../api/v1/images/model')
const { NotFoundError } = require('../../errors')

// 1. cara pertama
const createImage = async (req) => {
    const result = await Images.create({
        name: req.file
        ? `uploads/${req.file.filename}`
        : 'uploads/avatar/default_profile.png'
    });

    return result
};

// cara ke 2
const generateUrlImage = async (req) => {
    const result = `uploads/${req.file.filename}`

    return result
}

// tambahkan function checking Image 
const checkingImage = async (id) => {
    const result = await Images.findOne({ _id: id });
    console.log(result);
  
    if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);
  
    return result;
  };
  // jangan lupa export checkingImage
  module.exports = { createImage, checkingImage };