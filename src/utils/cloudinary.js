import cloudinary from 'cloudinary';
import { envVariables } from '../configs';

const { cloud_name, api_key, api_secret } = envVariables;
cloudinary.v2.config({
	cloud_name,
	api_key,
	api_secret,
	sign_url: true,
});

export const signFileUploadRequest = async () => {
	// grab a current UNIX timestamp
	let timestamp = Math.round(new Date().getTime() / 1000);
	let signature = await cloudinary.v2.utils.api_sign_request({ timestamp }, api_secret);
	let payload = {
		signature,
		timestamp,
	};
	return payload;
};
