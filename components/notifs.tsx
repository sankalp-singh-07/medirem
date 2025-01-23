// import PushBullet from 'pushbullet';

// const pusher = new PushBullet('YOUR_PUSHBULLET_ACCESS_TOKEN');

// export const sendPushNotification = async (title: string, body: string) => {
// 	try {
// 		await new Promise((resolve, reject) => {
// 			pusher.note({}, title, body, (error, response) => {
// 				if (error) {
// 					console.error(
// 						'Error sending Pushbullet notification:',
// 						error
// 					);
// 					reject(error);
// 				} else {
// 					console.log('Pushbullet notification sent:', response);
// 					resolve(response);
// 				}
// 			});
// 		});
// 	} catch (error) {
// 		console.error('Push notification failed:', error);
// 	}
// };
