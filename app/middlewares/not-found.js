const notfound = (req, res) => {
    res.status(404).send({ msg: 'Router does not exist'});
}

module.exports = notfound