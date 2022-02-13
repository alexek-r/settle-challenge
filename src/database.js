const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/settledb', {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => console.log("Database is Connected"))
.catch( err => console.log(err));