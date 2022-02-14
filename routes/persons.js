const express = require('express');
var fs = require('fs');
const router = express.Router();
const Person = require('../models/person');


router.get('/', (req, res) => {
    Person.find()
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.send(err);
        });
});

router.get('/excel', (req, res) => {
    Person.find()
        .then((result) => {
            const header = "Name" + "\t" + " Age" + "\n";
            fs.writeFileSync("file.xls",header);
            for (let i = 0; i < result.length; i++) {
                const row = result[i].name + "\t" + result[i].age + "\n";
                fs.writeFileSync("file.xls",row, {
                    flag: "a+",
                  });
            }
        }).then(() => {
            res.setHeader('Content-disposition', 'attachment; filename=file.xls');
            var filestream = fs.createReadStream(__dirname + '/../file.xls');
            filestream.pipe(res);
        }).catch((err) => {
            res.send(err);
        });
});

router.get('/:id', (req, res) => {
    Person.findById(req.params.id)
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.send(err);
        });
});

router.post('/', (req, res) => {
    const person = new Person({
        name: req.body.name,
        age: req.body.age
    });

    person.save()
        .then((result) => {
            res.json(result)
        }).
        catch((err) => {
            res.send(err)
        });
});

router.delete('/:id', (req, res) => {
    Person.findById(req.params.id)
        .then((result) => {
            const name = result.name;
            Person.findByIdAndDelete(result.id)
                .then(() => res.send(`${name} deleted`))

        }).catch((err) => {
            res.send(err);
        });
})

router.patch('/:id', async (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.send(err);
        });

});

module.exports = router;