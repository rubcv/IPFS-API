const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const uploadIPFS = require('./upload-ipfs')
const app = express()
const PATH = 'uploads/';
const PORT = 8888;


// GET index
app.get('/', async (req, res) => {

    res.sendFile(__dirname + '/index.html');

});

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
app.listen(PORT, () =>
    console.log(`Server is listening on port: ${PORT}.`)
);
