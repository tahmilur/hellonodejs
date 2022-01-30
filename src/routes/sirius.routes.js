const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// app.use('/uploads123', express.static(path.join(__dirname, "./../../public/uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null); // , path.join(__dirname, "./../../public/uploads")
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage }); // , fileFilter: fileFilter

/**
 * Routes Definitions
 */
router.get("/", (req, res) => {
    res.status(200).send("Welcome to sirius utility api home");
    // res.render("index", { title: "Home", userList: userdata });
});

router.post('/upload', upload.single('photo'), function (req, res, next) {
    // req.file is the `photo` file
    // req.body will hold the text fields, if there were any
    console.log(path.join(__dirname, "./../../public/uploads"));

    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);

        return res.status(404).json({
            message: 'File failed to uploded'
        });        
    }
});
   
router.post('/uploads', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    try {
        return res.status(201).json({
            message: 'Files uploded successfully'
        });
    } catch (error) {
        console.error(error);

        return res.status(404).json({
            message: 'File failed to uploded'
        });        
    }
});

/**
 * Single file upload
 * https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
 * https://bezkoder.com/node-js-express-file-upload/
 * https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
 */
router.post('/upload-file', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./public/uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * multiple file upload
 */
router.post('/upload-files', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = []; 
            let flag = true;
            let i = 0;
            do {

                let photo = req.files.photos[i];

                if(photo) {

                    //move photo to uploads directory
                    photo.mv('./public/uploads/' + photo.name);

                    data.push({
                        name: photo.name,
                        mimetype: photo.mimetype,
                        size: photo.size
                    });
                }
                else{
                    flag = false;
                }

                i++;

            } while (flag);

            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// publish route
module.exports = router