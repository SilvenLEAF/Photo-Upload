const router = require('express').Router();
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



/* ---------------------------
.            routes
--------------------------- */

router.get('/', (req, res, next)=>{
  try{
    res.render('index');
  } catch(next){
      next();
  }
    
});

router.post('/upload', (req, res, next)=>{
    upload(req, res, (err)=>{
        if(err){
            res.render('index', {msg: err});
        }else{
            if(req.file == undefined){
                res.render('index', {msg: 'No file Selected'});
            }else{
                console.log(req.file);
                res.render('index', {
                    msg: 'Image uploaded',
                    file: `/uploadsURL/${req.file.filename}`
                })
            }
        }
    })
})


module.exports = router;