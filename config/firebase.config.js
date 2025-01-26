const  Firebase = require('firebase-admin');

//const serviceAccount = require('file name ')

const firebase = Firebase.initializeApp({
    credential:Firebase.credential.cert(ServiceAccount),
    storageBucket :'drive-222ea.appspot.com'
})


module.exports=firebase;