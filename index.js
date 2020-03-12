const server = require('./server.js')

PORT = 7000
server.listen(PORT, ()=>{
    console.log(`\n ** Server Running on http://localhost:${PORT} ** \n`)
})