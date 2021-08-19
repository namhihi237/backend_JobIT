import Pusher from 'pusher';

const pusher = new Pusher({
	appId: '1252171',
	key: '8b94f31b5cb93338e859',
	secret: 'be5da6f36e920488ecab',
	cluster: 'ap1',
	useTLS: true,
});

export default pusher;
