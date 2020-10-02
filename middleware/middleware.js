var middlewareObj ={};

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
        return next();
    }
	//Here we want to add a flash message when user is not loggedin
	req.flash("Error","Please login first !!")
    res.redirect("/login");	
}

module.exports= middlewareObj;