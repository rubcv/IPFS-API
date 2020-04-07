var express = require('express')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var uploadIPFS = require('./upload-ipfs')
var app = express()


// GET index
app.get('/', async (req, res) => {

    res.sendFile(__dirname + '/index.html');

});

const PATH = 'uploads/';

app.post('/file', upload.single('doc'), async function (req, res, next) {
    try {
        console.log(req.file);
        const file = req.file;

        // make sure file is available
        if (!file) {
            res.status(400).send({
                status: false,
                data: 'No file is selected.'
            });
        } else {
            // send response

            var HASH = await uploadIPFS(PATH + req.file.filename);

            console.log(HASH);

            res.send({
                status: true,
                message: 'File is uploaded.',
                data: {
                    name: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }

    } catch (err) {
        res.status(500).send(err);
    }
})


// start the app 
const port = 8888;

app.listen(port, () =>
    console.log(`Server is listening on port ${port}.`)
);
