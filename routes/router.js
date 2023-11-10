const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {DBURL} = require('../config/dbConfig')

const {UserModel} = require('../model/UserModel')

mongoose.connect(DBURL)

router.post('/register', async (req,res) => {
    try {
        let user = await UserModel.findOne({email: req.body.email})
        if(user)
        {
            res.status(400).send({message: `User of ${req.body.email} already exist`})
        }
        else
        {
            let newUser = await UserModel.create(req.body)
            res.status(200).send({message: 'Registered Successfully'})
        }
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error', error: error?.message})
    }
})

router.get('/all', async (req,res) => {
    try {
        let users = await UserModel.find()
        if(users)
        {
            res.status(200).send({message: 'Data Fetched Successfully', users})
        }
        else
        {
            res.status(404).send({message: 'User did not exist'})
        }
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error', error: error?.message})
    }
})

router.get('/:id', async (req,res) => {
    try {
        let data = await UserModel.findById(req.params.id)
        if(data)
        {
            res.status(200).send({message: "Data get succesfully", data})
        }
        else
        {
            res.status(404).send({message: "Not found"})
        }
    } catch (error) {
        res.status(500).send({message: "Internal Server Error", error: error?.message})
    }
})

router.delete('/:id', async (req,res) => {
    try {
        let data = await UserModel.deleteOne({id: req.params._id})
        res.status(200).send({message: "Deleted Successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Errror", error: error?.message})
    }
})

module.exports =  router