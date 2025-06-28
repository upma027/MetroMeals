const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User = require("../models/User.js")
const dotenv=require("dotenv");
dotenv.config();

const jwtSecret=process.env.JWT_Secret;

router.post("/createuser",
    [body('name', 'Name must be at least 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('location', 'Location is required').notEmpty()]
    , async (req, res) => {

        // console.log("Incoming signup data:", req.body);

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, errors: result.array() }); 
        }
        const salt= await bcrypt.genSalt(10);
        let secPassword=await bcrypt.hash(req.body.password,salt);
        try {

            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({
                success: false,
                errors: [{ msg: "Email already registered. Please log in instead." }]
                });
            }

            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location
            })
            let userData = await User.findOne({ email: req.body.email });
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            res.status(200).json({ success: true, authToken: authToken }); 
        } catch (error) {
            // console.log(error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    })

router.post("/loginuser",
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
    , async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, errors: result.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({email:email});
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct input" });
            }
            const jwtCompare=await bcrypt.compare(req.body.password,userData.password)
            if (!jwtCompare) {
                return res.status(400).json({ errors: "Try logging with correct input" });
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken= jwt.sign(data,jwtSecret);
            res.status(200).json({ success: true, authToken });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error" });
        }
    })

module.exports = router;