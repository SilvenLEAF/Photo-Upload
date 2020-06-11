const express = require('express');
const multer = require('multer');
const path = require('path');



/* ---------------------------
.            upload
--------------------------- */
//set up storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb)=>{
        checkFileType(file, cb);
    }
}).single('myImage');

/* --------checkFileType-------- */
function checkFileType(file, cb) {
    //allowed ext
    const fileTypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = fileTypes.test(file.mimetype);


    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error: Images ONLY');
    }
}
//--------------------------------


//firing express app
const app = express();
//set up view engine
app.set('view engine', 'ejs');



/* ---------------------------
.        middlewares
--------------------------- */
//routes handling
app.use(require('./routes/home-routes'));

//errors handling
app.use((err, req, res, next)=>{
    console.error(err);
    res.send({alert: `There's an ERROR!!!`});
})



const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`listening for requests from port ${PORT}`);
})