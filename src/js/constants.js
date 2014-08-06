/**
 * constants.js
 * 固定値
*/
var Constants = {
	Hanyou : {
		DEFAULT_TOOL_TIP: "艦これタイマー連携ツール Beta",
		OAUTH_ERR_TOOL_TIP: "クリックしてGoogleとの連携を許可してください",
		DEVICE_ERR_TOOL_TIP: "iPhoneを登録してください。",
		DEVICE_ERR_MESSAGE: "iPhoneの認証に失敗しました。\n先にiPhone版「艦これタイマー」で\n登録を行ってください。\nまたは、下記の「使用方法」をご参照下さい。",
		MAX_REPEAT: 10,
	},
	StWin : {
		KANCOLLE: "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/",
		SUFFIX: "?shiptimer=true",
		WIDTH: 765,
		HEIGHT: 560,
		TOP: 50,
		LEFT: 50,
		TYPE: 'normal'
	},
	Strage : {
		OAUTH_COMP_KEY: "OAuth_Complete",
		AWS_SNS_COMP_KEY: "AwsSNS_Complete",
		MONITOR_FLG: "Monitor_Flg",
		LOCAL_DEVICE_ID: "AwsSNS_Device_ID",
		LOCAL_ENDPOINT: "AwsSNS_End_Point"
	},
	AwsConst : {
		CONFIG_REGION: 'us-east-1',
		IAM_ROLE: "arn:aws:iam::348287904183:role/KanColleRole",
		PLAT_APP : "arn:aws:sns:us-east-1:348287904183:app/APNS_SANDBOX/ShipTimer_SANDBOX",
		APS_NAME : "APNS_SANDBOX",
		DB_TABLE : "DevTokTbl"
	},
	OAuthConst : {
		CLIENT_ID: "596857451248-ink6lpctnh0h6h2ttkoljvp7punvij1n.apps.googleusercontent.com",
		CLIENT_SECRET: "47vDh2PG73aaFXM7Ir8zuODw",
		API_SCOPE : "https://www.googleapis.com/auth/userinfo.profile",
		XML_URL : "https://www.googleapis.com/oauth2/v1/tokeninfo"
	}
};
