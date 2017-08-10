const moment = require("moment");
const thirdparty_api = require("./../index");

const APP_ID = "ab54b298-a776-4ca7-85b0-9f47080d1c05"; //填入正确的app_id
const SECRET_KEY = "0e6830e4-162f-41d4-afc1-919ab38e7ada"; // 填入正确的secret_key

const thirdparty = new thirdparty_api(APP_ID, SECRET_KEY);

(async () => {
	await thirdparty.requestToken(); // 请求token

	//拼装data数据
	const dataArray = {
		partner_remark: "商户备注信息",
		partner_order_code: "1604583867121212", // 第三方订单号, 需唯一
		notify_url: "http://vpcb-anubis-web-base-2.vm.elenet.me:5000", //第三方回调 url地址
		order_type: 1, //订单类型 1: 蜂鸟配送，支持90分钟内送达
		transport_info: {
			transport_name: "青否科技", //门店名称
			transport_address: "河南郑州金水区北三环文化路瀚海北金B座7楼7021", //取货点地址
			transport_longitude: 113.66684139, //取货点经度，取值范围0～180
			transport_latitude: 34.80913468, //取货点纬度，取值范围0～90
			position_source: 3, //取货点经纬度来源, 1:腾讯地图, 2:百度地图, 3:高德地图
			transport_tel: "18538753627", //取货点联系方式, 只支持手机号,400开头电话以及座机号码
			transport_remark: "测试" //取货点备注
		},
		order_add_time: moment().valueOf(), //下单时间(毫秒)
		order_total_amount: 50.0, //订单总金额（不包含商家的任何活动以及折扣的金额）
		order_actual_amount: 48.0, //客户需要支付的金额
		order_weight: 12.0, //订单总重量（kg），营业类型选定为果蔬生鲜、商店超市、其他三类时必填，大于0kg并且小于等于6kg
		order_remark: "用户备注", //用户备注
		is_invoiced: 1, //是否需要发票, 0:不需要, 1:需要
		invoice: "饿了么", //发票抬头, 如果需要发票, 此项必填
		order_payment_status: 1, //订单支付状态 0:未支付 1:已支付
		order_payment_method: 1, //订单支付方式 1:在线支付
		is_agent_payment: 1, //是否需要ele代收 0:否
		require_payment_pay: 50.0, //需要代收时客户应付金额, 如果需要ele代收 此项必填
		goods_count: 4, //订单货物件数
		require_receive_time: moment().add(2, "hours").valueOf(), //需要送达时间（毫秒).
		serial_number: "5678", //商家订单流水号, 方便配送骑手到店取货, 支持数字,字母及#等常见字符. 如不填写, 蜂鸟将截取商家订单号后4位作为流水号.
		receiver_info: {
			receiver_name: "李明", //收货人姓名
			receiver_primary_phone: "13900000000", //收货人联系电话, 只支持手机号, 只支持手机号
			receiver_second_phone: "13911111111", //收货人备用联系电话
			receiver_address: "上海市近铁广场", //收货人地址
			receiver_longitude: 130.0, //收货人经度，取值范围0～180
			receiver_latitude: 30.0, //收货人纬度，取值范围0～90
			position_source: 1 //收货人经纬度来源, 1:腾讯地图, 2:百度地图, 3:高德地图
		},
		items_json: [
			{
				item_id: "fresh0001", //商品编号
				item_name: "苹果", //商品名称
				item_quantity: 5, //商品数量
				item_price: 10.0, //商品原价
				item_actual_price: 9.5, //商品实际支付金额
				item_size: 1, //商品尺寸
				item_remark: "苹果，轻放", //商品备注
				is_need_package: 1, //是否需要ele打包 0:否 1:是
				is_agent_purchase: 1, //是否代购 0:否
				agent_purchase_price: 10.0 //代购进价, 如果需要代购 此项必填
			},
			{
				item_id: "fresh0002",
				item_name: "香蕉",
				item_quantity: 1,
				item_price: 20.0,
				item_actual_price: 19.0,
				item_size: 2,
				item_remark: "香蕉，轻放",
				is_need_package: 1,
				is_agent_purchase: 1,
				agent_purchase_price: 10.0
			}
		]
	};

	//下订单
	// const res = await thirdparty.sendOrder(dataArray);
	// console.log(res);
	//查询订单
	// const res = await thirdparty.queryOrder("1604583867121212");
	// console.log(res);
	//取消订单
	// const res = await thirdparty.cancelOrder("1604583867121212");
	// console.log(res);
	//取消投诉
	// const res = await thirdparty.orderComplaint("1604583867121212");
	// console.log(res);
})();
