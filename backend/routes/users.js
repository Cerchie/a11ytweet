'use strict'
const jsonschema = require('jsonschema')

const express = require('express')
const { ensureCorrectUserOrAdmin, ensureAdmin } = require('../middleware/auth')
const { BadRequestError } = require('../expressError')
const User = require('../models/user')
const { createToken } = require('../helpers/tokens')
const userNewSchema = require('../schemas/userNew.json')
const userUpdateSchema = require('../schemas/userUpdate.json')

const router = express.Router()
