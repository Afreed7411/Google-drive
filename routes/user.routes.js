const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const userModel = require('../modles/user.model'); // Fix spelling: 'modles' to 'models'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Route to render the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Registration POST route
router.post(
  '/register',
  // Validation rules
  [
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data',
      });
    }

    // Destructure the validated data from the request body
    const { email, username, password } = req.body;
    
    const hashPassword = await bcrypt.hash(password,10);
    try {
      // Create a new user in the database
      const newUser = await userModel.create({
        username,
        email,
        password :hashPassword,
      });

      // Respond with the created user
      res.json({
        message: 'User registered successfully',
        user: newUser,
      });

      //console.log('New user created:', newUser);
    } catch (error) {
      console.error('Error creating user:', error);

      // Handle duplicate email error (unique constraint violation)
      if (error.code === 11000) {
        return res.status(400).json({
          message: 'Email already exists',
        });
      }

      // Handle other server errors
      res.status(500).json({
        message: 'Server error',
      });
    }
  }
);

router.get('/login',(req,res)=>{
     res.render('login')
})

router.post('/login',
  body('email').trim().isLength({min :13}),
  body('password').trim().isLength({min :5}),
  
  
 async (req,res)=>{
   const errors = validationResult(req);

   if(!errors.isEmpty()){
    return res.status(400).json({
       errors: errors.array(),
       message:'Invalid data'
    })
   }

   const {email,password} = req.body;

   const user = await userModel.findOne({
    email:email
   })
   if(!user){
    return res.status(400).json({
       message:'email or password is incorrect'
    })
   }
   const isMatch = await bcrypt.compare(password,user.password);

   if(!isMatch){
    return res.status(400).json({
      message :'email or password is incorrect'
    })
   }

   const token =jwt.sign({
     userId: user._id,
     email:user.email,
     username:user.username

   },
   process.env.JWT_SECRET,
  )
  res.cookie('token',token)
  res.send('Logged in')

})
module.exports = router;
