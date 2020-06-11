const router = require('express').Router();

router.get('/', (req, res, next)=>{
  try{
    res.render('index');
  } catch(next){
      next();
  }
    
})


module.exports = router;