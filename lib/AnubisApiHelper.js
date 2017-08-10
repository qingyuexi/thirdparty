const md5 = require("md5");
module.exports = {
	//生成随机数
	randomNum(minNum, maxNum) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * minNum + 1, 10);
				break;
			case 2:
				return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
				break;
			default:
				return 0;
				break;
		}
	},
	//url编码
	urlencode(str) {
		str = (str + "").toString();

		return encodeURIComponent(str)
			.replace(/!/g, "%21")
			.replace(/'/g, "%27")
			.replace(/\(/g, "%28")
			.replace(/\)/g, "%29")
			.replace(/\*/g, "%2A")
			.replace(/%20/g, "+");
	},
	// 获取签名
	generateSign(appId, salt, secretKey) {
		const seed = "app_id=" + appId + "&salt=" + salt + "&secret_key=" + secretKey;

		return md5(this.urlencode(seed));
	},

	generateBusinessSign(appId, token, urlencodeData, salt) {
		const seed = "app_id=" + appId + "&access_token=" + token + "&data=" + urlencodeData + "&salt=" + salt;

		return md5(seed);
	}
};
