import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import ticketRoutes from './routes/ticketRoutes';
import notificationRoutes from './routes/notificationRoutes';
import cookieParser from 'cookie-parser';
import { checkUser, requireAuth } from './middleware/authMiddlware';
import path from 'path';

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' })); // This is for attachment uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

// View Engine
app.set('view engine', 'ejs');

// Database Connection
// URI For the Database
const URI = process.env.URI || '';

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
//app.get('*', checkUser);

app.use(authRoutes);
app.use(projectRoutes);
app.use(ticketRoutes);
app.use(notificationRoutes);

// Production Mode
if (process.env.NODE_ENV === 'production') {
	// Set Static Folder
	app.use(express.static('client/build'));
	// index.html for all page routes
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../../../client', 'build', 'index.html')
		);
	});
}
