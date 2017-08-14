const got = require("got");
const AnubisApiHelper = require("./lib/AnubisApiHelper");
class thirdparty {
	constructor(APP_ID, SECRET_KEY, ACCESS_TOKEN, DEBUG) {
		this.APP_ID = APP_ID;
		this.SECRET_KEY = SECRET_KEY;
		this.ACCESS_TOKEN = ACCESS_TOKEN;
		if (DEBUG) {
			this.API_URL = "https://exam-anubis.ele.me/anubis-webapi";
		} else {
			this.API_URL = "https://open-anubis.ele.me/anubis-webapi";
		}
	}

	//生成token
	async requestToken() {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		// 获取签名
		const sig = AnubisApiHelper.generateSign(this.APP_ID, salt, this.SECRET_KEY);
		const url = this.API_URL + "/get_access_token" + "?app_id=" + this.APP_ID + "&salt=" + salt + "&signature=" + sig;
		const res = await got.get(url);
		return res.body;
	}

	//下订单
	async sendOrder(dataArray) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify(dataArray);

		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.ACCESS_TOKEN, urlencodeData, salt); //生成签名

		const url = this.API_URL + "/v2/order";
		const res = await got.post(url, {
			body: {
				app_id: this.APP_ID,
				salt: salt,
				data: urlencodeData,
				signature: sig
			},
			json: true
		});

		return res.body;
	}

	//取消订单
	async cancelOrder(data) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify(data);
		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.ACCESS_TOKEN, urlencodeData, salt); //生成签名

		const url = this.API_URL + "/v2/order/cancel";
		const res = await got.post(url, {
			body: {
				app_id: this.APP_ID,
				salt: salt,
				data: urlencodeData,
				signature: sig
			},
			json: true
		});
		return res.body;
	}

	//查询订单
	async queryOrder(partner_order_code) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify({
			partner_order_code: partner_order_code //商户订单号
		});
		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.ACCESS_TOKEN, urlencodeData, salt); //生成签名

		const url = this.API_URL + "/v2/order/query";
		const res = await got.post(url, {
			body: {
				app_id: this.APP_ID,
				salt: salt,
				data: urlencodeData,
				signature: sig
			},
			json: true
		});
		return res.body;
	}

	//查看骑手位置
	async orderCarrier(partner_order_code) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify({
			partner_order_code: partner_order_code //商户订单号
		});
		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.ACCESS_TOKEN, urlencodeData, salt); //生成签名

		const url = this.API_URL + "/v2/order/carrier";
		const res = await got.post(url, {
			body: {
				app_id: this.APP_ID,
				salt: salt,
				data: urlencodeData,
				signature: sig
			},
			json: true
		});
		return res.body;
	}

	//投诉
	async orderComplaint(data) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify(data);
		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.ACCESS_TOKEN, urlencodeData, salt); //生成签名

		const url = this.API_URL + "/v2/order/complaint";
		const res = await got.post(url, {
			body: {
				app_id: this.APP_ID,
				salt: salt,
				data: urlencodeData,
				signature: sig
			},
			json: true
		});
		return res.body;
	}

	//添加门店信息
	async chainStore(data) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify(data);
		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.ACCESS_TOKEN, urlencodeData, salt); //生成签名

		const url = this.API_URL + "/v2/chain_store";
		const res = await got.post(url, {
			body: {
				app_id: this.APP_ID,
				salt: salt,
				data: urlencodeData,
				signature: sig
			},
			json: true
		});
		return res.body;
	}
}
module.exports = thirdparty;
