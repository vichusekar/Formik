const mongodb = require('mongodb')
const DBNAME = process.env.DbName
const DBURL = `${process.env.DbUrl}/${DBNAME}`

module.exports = {mongodb, DBNAME, DBURL}