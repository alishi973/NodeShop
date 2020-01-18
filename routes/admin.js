module.exports = (Express) => {
    let router = Express.Router()

    router.get('/', (req, res) => {
        /*res.send('this is admin page');*/
        res.render('admin/index')
    });


    return router;
}
