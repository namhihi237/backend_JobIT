import { ITer, Company, Code, Account, UserPer, Permission } from '../models';
import bcrypt from 'bcryptjs';
import { tokenEncode, sendEmail, generate } from '../utils';

export default class AuthThenticationService {
	async getAccount(arg) {
		const account = await Account.findOne(arg);
		return account;
	}

	async register(data, role) {
		// create new account
		const hash = await bcrypt.hash(data.password, 12);
		let acc = await Account.create({ email: data.email, password: hash, role });
		// defaul permission for account
		let permissions = await Permission.find({ role, check: true });
		permissions = permissions.map((e) => {
			return UserPer.create({
				userId: acc._id,
				perId: e._id,
				perName: e.perName,
				actionCode: e.actionCode,
				check: true,
			});
		});
		if (role == 'iter') await ITer.create({ name: data.name, accountId: acc._id, email: data.email });
		if (role == 'company')
			await Company.create({
				name: data.name,
				accountId: acc._id,
				email: data.email,
			});
		await Promise.all([...permissions]);
	}

	async updatePassword(_id, password, newPassword) {
		let user = await this.getAccount({ _id });
		const match = await bcrypt.compare(password, user.password);
		if (!match) return false;

		const hash = await bcrypt.hash(newPassword, 12);

		await Account.findByIdAndUpdate({ _id }, { password: hash });
		return true;
	}
}
