const fs = require("fs")

module.exports = class Webserver {
    constructor() {
        this.express = require("express")
        this.instance = this.express()
        this.config = require("./../config/Config.js")
    }

    async startListening() {
        this.instance.set('views', "D:\\Documents\\portfolio\\src\\views");
        this.instance.set('view engine', 'ejs');

        this.loadServerUtils()
        this.handlePages()

        this.instance.use((req, res) => {
            let protocol;

            if (req.get("host") === "localhost" || req.get("host") === "127.0.0.1") {
                protocol = "http"
            } else {
                protocol = "http"
            }

            res.status(404).render("404", {
                cssUrl: `${protocol}://${req.get("host")}/static/404css`,
                css2Url: `${protocol}://${req.get("host")}/static/css`
            })
        })
        // Start listening with the port and address that we gived in Config.js
        this.instance.listen(this.config.port, this.config.address, () => {
            console.log(`PORT ${this.config.port}\nADDRESS ${this.config.address}\nWEBSERVER STARTED`)
        })
    }

    async loadServerUtils() {
        this.instance.get("/static/css", (req, res) => {
            res.sendFile("D:\\Documents\\portfolio\\src\\static\\css\\root.css")
        })
        
        this.instance.get("/static/404css", (req, res) => {
            res.sendFile("D:\\Documents\\portfolio\\src\\static\\css\\404.css")
        })

        let svg = [
            "kotlin.svg",
            "java.svg",
            "javascript.svg",
            "twitter.svg",
            "github.svg",
            "discord.svg"
        ]

        svg.forEach(item => {
            this.instance.get(`/static/svg/${item}`, (req, res) => {
                res.sendFile(`D:\\Documents\\portfolio\\src\\static\\svg\\${item}`)
            })
        })
    }

    async handlePages() {
        
        const files = fs.readdirSync("./src/page")

        files.forEach(page => {
            const pageFile = (new (require(`./../page/${page}`)))

            this.instance.get(pageFile.path, (req, res) => {
                pageFile.load(req, res)
            })
        })
    }
}