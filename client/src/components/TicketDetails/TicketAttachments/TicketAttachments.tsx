import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TicketService from '../../Services/TicketService';
import { useAuthContext } from '../../Context/AuthContext';

interface AttachmentInt {
	_id: string;
	fileName: string;
	notes: string;

	// The Ticket ID this comment is for
	ticketFrom: string;

	// User's ID
	userID: string;

	userName: string;

	fileSrc: string;

	createdAt: Date;
}

interface Props {
	ticketID: string;
}

export const TicketAttachments: React.FC<Props> = ({ ticketID }) => {
	const [fileInputState] = useState('');
	const [previewSource, setPreviewSource] = useState<string>('');

	// Hold the current filename in state
	const [fileName, setFileName] = useState('');

	// This holds the notes for the file being uploaded
	const [notes, setNotes] = useState('');

	// Handle Errors
	const [error, setError] = useState('');

	// This will display status messages like "Uploading" and "Success"
	const [message, setMessage] = useState('');

	// All the Attachments for this Ticket will be stored here
	const [attachments, setAttachments] = useState<AttachmentInt[]>([]);

	// This will get me the ID of the logged in user
	const authContext = useAuthContext();

	// GET Request to grab all the attachments for this ticket
	const getAttachments = async (id: string) => {
		const response = await TicketService.getTicketAttachments(id);
		if (response.success) {
			setAttachments(response.ticketAttachments);
		}
	};

	useEffect(() => {
		getAttachments(ticketID);
	}, [ticketID, message]);

	// This will convert the file into a BASE64 Image
	const previewFile = (file: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				setFileName(file.name);
				setPreviewSource(reader.result);
			}
		};
	};

	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files) {
			const file = event.target.files[0];
			previewFile(file);
		}
	};

	// This is where we pass all the needed data to the Backend
	const uploadImage = async (
		base64EncodedImage: string | ArrayBuffer | null
	) => {
		setError('');

		try {
			const response = await TicketService.uploadTicketAttachment({
				userID: authContext.user,
				ticketID,
				fileName,
				notes,
				data: base64EncodedImage,
			});

			if (response.success) {
				setMessage('Successfully Uploaded!');
				setPreviewSource('');
				getAttachments(ticketID);
			} else {
				setError(response.Error);
			}
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	const handleSubmitFile = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setMessage('Uploading Please Wait...');

		if (!previewSource) {
			setMessage('Please choose a file');
			return;
		}

		uploadImage(previewSource);
	};

	const deleteTicketAttachment = async (attachmentID: string) => {
		setMessage('');
		setError('');

		const data = {
			userID: authContext.user,
			ticketID,
			attachmentID,
		};

		try {
			const response = await TicketService.deleteAttachment(data);
			if (response.success) {
				// Set the success message
				setMessage(response.message);

				// Now lets update the render by sending a GET Request for my tickets
				getAttachments(ticketID);
			} else {
				setError(response.errors.message);
			}
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	return (
		<Grid container spacing={2} justify='center' className='ticket-attachments'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Image Attachment History</h2>
				<p>
					All image files attached to this ticket, click the file names to view
					the image
				</p>

				{/* These are the message fields that only will show up during the
				file upload process to show the status, success, and failure messages */}
				{message ? (
					<div className='message'>
						<h3>{message}</h3>
					</div>
				) : (
					''
				)}

				{error ? (
					<div className='error'>
						<h3>{error}</h3>
						<p>Why u try 2 hek me?</p>
					</div>
				) : (
					''
				)}
				<form onSubmit={handleSubmitFile}>
					<input
						type='file'
						name='image'
						onChange={handleFileInputChange}
						value={fileInputState}
					/>

					<input
						type='text'
						onChange={(e) => setNotes(e.target.value)}
						value={notes}
						required={true}
						maxLength={200}
					/>

					<button className='btn'>Submit</button>
				</form>

				<br />
				{previewSource && (
					<img src={previewSource} alt='chosen' style={{ height: '150px' }} />
				)}
			</Grid>

			<Grid container justify='center' spacing={2}>
				{attachments &&
					attachments.map((attachment) => (
						<Grid item xs={6} md={6} lg={6} key={attachment.fileSrc}>
							<div className='attachment-card'>
								<button
									className='btn-close'
									onClick={() => deleteTicketAttachment(attachment._id)}
								>
									X
								</button>
								<Grid item xs={12} md={12} lg={12}>
									<h3>File</h3>
									<a href={attachment.fileSrc}>
										<p className='img-link'>{attachment.fileName}</p>
									</a>
								</Grid>

								<Grid item xs={12} md={12} lg={12}>
									<h3>Uploader</h3>
									<p>{attachment.userName}</p>
								</Grid>

								<Grid item xs={12} md={12} lg={12}>
									<h3>Notes</h3>
									<p>{attachment.notes}</p>
								</Grid>

								<Grid item xs={12} md={12} lg={12}>
									<h3>Created</h3>
									<p>{attachment.createdAt}</p>
								</Grid>
							</div>
						</Grid>
					))}
			</Grid>
		</Grid>
	);
};
