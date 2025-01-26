const { credential } = require('firebase-admin');
const multer = require('multer');
const firebasesStorage = require('multer-firebase-storage')
const Firebase = require('./firebase.config')
//const serviceAccount =require('../firebase file name ')

const storage = firebasesStorage({
    credentials:Firebase.credential.cert(ServiceAccount),
       storageBucket :'drive-222ea.appspot.com'
})


const upload = multer({
    storage:storage,
})

module.exports= upload;