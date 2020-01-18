module.exports = (Express) => {
    let router = Express.Router()

    router.get('/', (req, res) => {
        res.send('this is user page');
    });


    return router;
}
