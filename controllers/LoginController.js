//import express
const express = require("express");

//import validationResult from express-validator
const { validationResult } = require("express-validator");

//import bcrypt
const bcrypt = require("bcryptjs");

//import jsonwebtoken
const jwt = require("jsonwebtoken");

//import prisma client
const prisma = require("../prisma/client");

//function login
const login = async (req, res) => {
    //periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        //mencari user berdasarkan email
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        //jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        //validasi password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        //jika password salah
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        //generate token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Destructure to remove from user object
        const { password, ...userWithoutPassword } = user;

        // return response 
        res.status(200).send({
            success: true,
            message: "Login berhasil!",
            data: {
                user: userWithoutPassword,
                token,
            },
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

module.exports = {login};