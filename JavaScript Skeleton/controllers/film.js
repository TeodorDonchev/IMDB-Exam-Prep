const Film = require('../models/Film');

module.exports = {
	index: (req, res) => {
        Film.find().then(films => {
        	res.render('film/index' , {'films' : films})
		});
	},
	createGet: (req, res) => {
        res.render("film/create");

	},
	createPost: (req, res) => {

		let filmArgs = req.body;

		if (!filmArgs){
			res.redirect("/");
			return;
		}

		Film.create(filmArgs).then(
			res.redirect("/")

		);

	},
	editGet: (req, res) => {

		let id = req.params.id;
		Film.findById(id).then(film =>{
			if (film === null){
				res.redirect("/");
				return;
			}
			return res.render("film/edit", film);
		})


	},
	editPost: (req, res) => {

		let id = req.params.id;
		let film = req.body;

		if (Film.finById(id) === null){
			res.redirect("/");
			return;
		}

        Film.findByIdAndUpdate(id, film, {runValidators: true}).then(
            res.redirect('/')
        )
	},
	deleteGet: (req, res) => {
        let id = req.params.id;

        if (Film.findById(id) === null){
        	res.redirect('/');
        	return;
		}

        Film.findById(id).then(film =>{
            if (film === null){
                res.redirect("/");
                return;
            }
            return res.render("film/delete", film);
        })
	},
	deletePost: (req, res) => {
        let id = req.params.id;

        Film.findByIdAndRemove(id).then(film => {
        	res.redirect("/");
        	})
	}
};