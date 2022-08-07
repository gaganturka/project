const express = require("express")
const router = express.Router()

router.get("/test-me", (req,res) => {
    console.log('Hi, setup done')
    res.send('Done')

})


module.exports = router