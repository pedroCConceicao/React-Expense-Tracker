const model = require('../models/model.js')

// post: http://localhost:8080/api/categories
async function create_Categories(req, res) {
    const Create = new model.Categories({
        type: 'Poupança',
        color: '#1F3B5C',
    })

    function catchError(err){
        if(!err) return res.json(Create);
        return res.status(400).json({ message: `Erro ao criar categorias ${err}` });
    }

    await Create.save(catchError());
}

// get: http://localhost:8080/api/categories
async function get_Categories(req, res) {
    let data = await model.Categories.find({})

    let filter = await data.map(v => Object.assign({}, { type: v.type, color: v.color }))
    return res.json(filter);
}

// post: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let { name, type, amount } = req.body;

    const create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date: new Date()
        }
    );

    function catchError(err) {
        if(!err) return res.json(create);
        return res.status(400).json({ message: `Erro ao criar transação ${err}` })
    }

    create.save(catchError());
    
}

// get: http://localhost:8080/api/transaction
async function get_Transaction(req, res) {
    let data = await model.Transaction.find({})
    return res.json(data);
}

// delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
    if(!req.body) res.status(400).json({ message: "Request body not Found" });

    function catchError(err) {
        if(!err) res.json("Transação deletada!");
    }

    await model.Transaction.deleteOne(req.body, catchError()).catch(function(err){res.json("Erro ao deletar transação.")})
}

// get: http://localhost:8080/api/labels     --- Aqui acontecerá um JOIN entre os models Transaction e Caegories para enviarmos ao Front-End
async function get_Labels(req, res) {
    model.Transaction.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, {_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}))
        res.json(data)
    }).catch(err => {
        res.status(400).json("Lookup Collection Error");
    })
}


module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}