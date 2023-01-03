const StaticPage = require("../structure/StaticPage");

module.exports = class Home extends StaticPage {
    constructor() {
        super("/")
    }

    async load(req, res) {
        let protocol;

        if (req.get("host") === "localhost") {
			protocol = "http"
		} else {
			protocol = "http"
		}

        res.render("rootPage", {
            cssUrl: `${protocol}://${req.get("host")}/static/css`,
            svgUrl: `${protocol}://${req.get("host")}/static/svg`,
            avatarUrl: "https://cdn.discordapp.com/emojis/585938576907305004.png"
        })
    }
}