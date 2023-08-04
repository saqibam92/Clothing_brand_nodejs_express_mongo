exports.getHomePage = (req, res) => {
    const viewsData = {
        pageTitle : "Linear Lifestyle"
    }
    res.render('pages/home', viewsData )
}