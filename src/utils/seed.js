import { UserPer, Permission, Admin } from '../models';
import bcrypt from 'bcryptjs';
import log from 'datalog';
import csv from 'csv-parser';
import fs from 'fs';

export const initAccountAmin = async () => {
	try {
		const countPermission = await Permission.countDocuments();
		if (countPermission == 0) await initPermission();
		else log.info('Permissions are already');
		let admin = await Admin.findOne({ userName: 'admin' });
		if (admin) {
			log.info('Account admin is already');
			return;
		}
		const password = '123456';
		const hash = await bcrypt.hash(password, 12);
		admin = await Admin.create({
			userName: 'admin',
			password: hash,
			role: 'admin',
		});
		let permissions = await Permission.find({ role: 'admin', check: true });
		permissions = permissions.map((e) => {
			return UserPer.create({
				userId: admin._id,
				perId: e._id,
				perName: e.perName,
				actionCode: e.actionCode,
				check: true,
			});
		});
		await Promise.all(permissions);
		log.info(`Account admin has been created.`);
	} catch (error) {
		log.error(error);
	}
};

const initPermission = async () => {
	try {
		let filePath = './src/utils/per.csv';
		if (!fs.existsSync(filePath)) {
			log.warn('File do not exist!');
			return;
		}
		const results = [];
		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', (data) => results.push(data))
			.on('end', async () => {
				log.info('read file csv success');
				const pers = results.map((item) => {
					item.check = parseInt(item.check);
					Permission.create(item);
				});
				await Promise.all(pers);
				log.info(`Create ${pers.length} permission success`);
			});
	} catch (error) {
		log.error(error);
	}
};
