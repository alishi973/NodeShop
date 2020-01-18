module.exports = (Express) => {
    let router = Express.Router();

    router.route("/login").get((req, res) => {
        res.send("Safhe Login")
    })

    router.route("/Register").get((req, res) => {
        res.send("Safhe Register")
    })

    router.route("/SignOut").get((req, res) => {
        res.send("Safhe SignOut")
    })

    return router
}