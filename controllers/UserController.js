//import express
const express = require("express");

//import prisma client
const prisma = require("../prisma/client");

// function findUsers
const findUsers = async (req, res) => {
    try{
        // get semua users dari database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy : {
                id: "desc",
            },
        });

        // mengirim response
        res.status(200).send({
            success: true,
            message: "Success get all users",
            data: users,
        });
    }
    catch (error){
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }

};

module.exports = {findUsers};