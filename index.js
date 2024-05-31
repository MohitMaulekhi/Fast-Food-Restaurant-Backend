import {app} from "./app.js"
import connectDb from "./src/db/index.db.js"

connectDb()
    .then(() => {
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server is running on at Port: ${port}`)
        })
        app.on('error', (error) => {
            console.log("ERRR", error);
            throw error;
        })

    })
    .catch((err) => {
        console.log("MONGODB connection failed !!! in index.js", err)
    })