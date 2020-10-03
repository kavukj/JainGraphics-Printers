var express         = require("express"),
	mongoose        = require("mongoose"),
	bodyParser		= require("body-parser"),
	flash           = require("connect-flash"),
	passport 		= require("passport"),
	passLocal		= require("passport-local"),
	passLocalMon	= require("passport-local-mongoose"),
	UserModel		= require("./models/user"),
	fileUpload		= require("express-fileupload"),
	app 			= express();

var indexRoute      = require("./routes/index"),
	authRoute     	= require("./routes/auth"),
	ProdRoute  		= require("./routes/product"),
	IFrameRoute		= require("./routes/iframes"),
	SeedDBC			= require("./seed/certificate"),
	SeedDBS			= require("./seed/stationery"),
	ContactRoute	= require("./routes/contact"),
	ProfileRoute    = require("./routes/profile");

app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//mongoose.connect("mongodb://localhost/JGP");
mongoose.connect("mongodb+srv://KavyaJain:Kavya@1998@jgp.ec2u4.mongodb.net/JGP?retryWrites=true&w=majority", {
	useNewUrlParser : true,
	useCreateIndex : true,
	useUnifiedTopology: true
	
});
mongoose.connection.on('connected',() => {
	console.log("Connected to db");
});

SeedDBS();
SeedDBC();

//Passport Configuration
app.use(require("express-session")({
    secret: "Welcome to JGP",
    resave: false,
    saveUninitialized: false
}));
app.use(fileUpload({
	useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passLocal(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(function(req,res,next){
	res.locals.CurrentUser=req.user; // this will pass current user to every template
	res.locals.error=req.flash("Error");
		res.locals.success=req.flash("Success");
	res.locals.session=req.session;
	//And then move to next part of our code
	next();
})

app.use(indexRoute);
app.use(authRoute);
app.use(ProdRoute);
app.use(ProfileRoute);
app.use(ContactRoute);
app.use(IFrameRoute);

app.listen(process.env.PORT,process.env.IP,function(err,res){
	console.log("Sever Started");
});

