const got = require("got");
const AnubisApiHelper = require("./lib/AnubisApiHelper");
const API_URL = "https://exam-anubis.ele.me/anubis-webapi";
class thirdparty {
	constructor(APP_ID, SECRET_KEY) {
		this.APP_ID = APP_ID;
		this.SECRET_KEY = SECRET_KEY;
	}
	//生成token
	async requestToken() {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		// 获取签名
		const sig = AnubisApiHelper.generateSign(this.APP_ID, salt, this.SECRET_KEY);
		const url = API_URL + "/get_access_token" + "?app_id=" + this.APP_ID + "&salt=" + salt + "&signature=" + sig;

		// const res = await got.get(url);
		// if (res.statusCode == 200) {
		// 	const data = JSON.parse(res.body);
		// 	this.access_token = data.data.access_token;
		// }
		this.access_token = "4130dbe4-05a4-4093-9b83-9424d22a340b"; //测试
	}
	//下订单
	async sendOrder(dataArray) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify(dataArray);

		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.access_token, urlencodeData, salt); //生成签名

		const url = API_URL + "/v2/order";
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
	async cancelOrder(partner_order_code) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify({
			partner_order_code: partner_order_code, //商户订单号
			order_cancel_reason_code: 2, //订单取消原因代码(2:商家取消)
			order_cancel_code: 0, //订单取消编码（0:其他, 1:联系不上商户, 2:商品已经售完, 3:用户申请取消, 4:运力告知不配送 让取消订单, 5:订单长时间未分配, 6:接单后骑手未取件）
			order_cancel_description: "货品不新鲜", //订单取消描述（order_cancel_code为0时必填）
			order_cancel_time: new Date().getTime() //订单取消时间（毫秒）
		});
		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.access_token, urlencodeData, salt); //生成签名

		const url = API_URL + "/v2/order/cancel";
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
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.access_token, urlencodeData, salt); //生成签名

		const url = API_URL + "/v2/order/query";
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
	async orderComplaint(partner_order_code) {
		const salt = AnubisApiHelper.randomNum(1000, 9999);
		const dataJson = JSON.stringify({
			partner_order_code: partner_order_code, //商户订单号
			order_complaint_code: 150, //订单投诉编码（230:其他, 150:未保持餐品完整, 160:服务态度恶劣, 190:额外索取费用, 170:诱导收货人或商户退单, 140:提前点击送达, 210:虚假标记异常, 220:少餐错餐, 200:虚假配送, 130:未进行配送）
			order_complaint_desc: "未保持餐品完整", //订单投诉描述（order_complaint_code为230时必填）
			order_complaint_time: new Date().getTime() //订单投诉时间（毫秒）
		});
		const urlencodeData = AnubisApiHelper.urlencode(dataJson);
		const sig = AnubisApiHelper.generateBusinessSign(this.APP_ID, this.access_token, urlencodeData, salt); //生成签名

		const url = API_URL + "/v2/order/complaint";
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
