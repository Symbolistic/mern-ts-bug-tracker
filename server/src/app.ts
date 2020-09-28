import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { checkUser, requireAuth } from './middleware/authMiddlware';

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

// View Engine
app.set('view engine', 'ejs');

// Database Connection
// URI For the Database
const URI =
	'mongodb+srv://Symbol:test@cluster0.3t5ag.mongodb.net/Bug-Tracker?retryWrites=true&w=majority';

// MongoDB Options
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};
mongoose.set('useFindAndModify', false);

// Port
const PORT: string | number = process.env.PORT || 8000;

// Connect to MongoDB and Start the Server!
mongoose
	.connect(URI, options)
	.then(() =>
		app.listen(PORT, () =>
			console.log(
				`MongoDB has Connected!\nServer is now running on port ${PORT}!`
			)
		)
	)
	.catch((err) => console.log(err));

// Routes
app.get('*', checkUser);

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/smoothies', requireAuth, (req, res) => {
	res.render('smoothies');
});

app.use(authRoutes);
