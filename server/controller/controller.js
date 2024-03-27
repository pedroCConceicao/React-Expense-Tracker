const model = require('../models/model.js')

// post: http://localhost:8080/api/categories
function create_Categories(req, res) {
    const Create = new model.Categories({
        type: 'Savings',
        color: '#1F3B5C',
    })

    Create.save(function(error){
        if(!error) return res.json(Create);
        return res.status(400).json({ message: `Erro ao criar categorias ${error}` });
    })
}

module.exports = {
    create_Categories
}