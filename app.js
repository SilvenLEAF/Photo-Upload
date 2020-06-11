const express = require('express');



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