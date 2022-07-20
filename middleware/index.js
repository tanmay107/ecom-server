const admin = require('../config/firebase-config');
const { getAuth } = require('firebase-admin/auth');

class Middleware {
	async decodeToken(req, res, next) {
		if (!req.headers.authorization) return res.json({message: "un authorised"});
		const token = req.headers.authorization.split(' ')[1];
		try {
			const decodeValue = await getAuth().verifyIdToken(token);
			console.log(decodeValue);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'Un authorize' });
		} catch (e) {
			return res.json({ message: 'Internal Error' });
		}
	}
}

module.exports = new Middleware();