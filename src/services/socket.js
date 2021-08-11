import { verifyToken } from '../utils';
import { NotificationService } from '../services';
const notificationService = new NotificationService();

export const socketServer = (io) => {
	io.on('connection', (socket) => {
		const token = socket.handshake.query.token;
		if (!token || token == 'null' || token == '' || token == null || token == undefined) {
			console.log('token invalid:', token);
		} else {
			let decodedToken;
			try {
				decodedToken = verifyToken(token);
				socket.userId = decodedToken._id;
			} catch (error) {
				io.emit(socket.id, 'token-invalid');
				return;
			}

			socket.on('client-get-notifications', async () => {
				const notifications = await notificationService.getNotifications(socket.userId);
				io.to(socket.id).emit('server-send-notifications', notifications);
			});

			io.on('disconnect', (reason) => {
				console.log('disconnected', reason);
			});
		}
	});
};
