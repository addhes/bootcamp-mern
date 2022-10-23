const Categories = require('../../api/v1/categories/model')
const { BadRequestError, NotFoundError } = require('../../errors')

const getAllCategories = async () => {
    const result = await Categories.find();

    return result;
}

const createCategories = async (req) => {
    const { name } = req.body;

    // cari categories dengan field name
    const check = await Categories.findOne({ name });

    // apa bila check true / data categories sudah ada maka kita kasih pesan error
    if (check) throw new BadRequestError('Kategori nama duplicate')

    const result = await Categories.create({ name });

    return result;
}

const getOneCategories = async (req) => {
    const { id } = req.params;

    const result = await Categories.findOne({ _id:id});

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)
    
    return result;
}

const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    // cari categories dengan field name dan id selain dari yang dikirim dari params
    // fungsi ne, mencari semua id kecuali id yang yang dimasukan
    const check = await Categories.findOne({
        name,
        _id: { $ne: id },
    });

    if (check) throw new BadRequestError('Kategori nama duplikat');

    const result = await Categories.findOneAndUpdate(
        { _id : id},
        { name },
        { new: true , runValidators: true}
    );

    if (!result) throw new NotFoundError(`Tidak ada kategorie dengan id : ${id}`);

    return result;
}

const deleteCategories = async (req) => {
    const { id } = req.params;

    const result = await Categories.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

    await result.remove();

    return result;
}

const checkingCategories = async (id) => {
    const result = await Categories.findOne({ _id: id });
  
    if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);
  
    return result;
  };

module.exports = { 
    getAllCategories, 
    createCategories, 
    getOneCategories,
    updateCategories,
    deleteCategories,
    checkingCategories,
}