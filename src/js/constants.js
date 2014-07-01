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
		LOCAL_DEVICE_ID: "AwsSNS_Device_ID",
		LOCAL_ENDPOINT: "AwsSNS_End_Point"
	},
	AwsConst : {
		CONFIG_REGION: 'us-west-2',
		IAM_ROLE: "arn:aws:iam::348287904183:role/KanColleRole",
		PLAT_APP : "arn:aws:sns:us-west-2:348287904183:app/APNS_SANDBOX/SNSApp",
		APS_NAME : "APNS_SANDBOX",
		DB_TABLE : "DevTokTbl"
	},
	OAuthConst : {
		CLIENT_ID: "798349771072.apps.googleusercontent.com",
		CLIENT_SECRET: "Gt2OU6a8M8h7v5CxSFXyVATS",
		API_SCOPE : "https://www.googleapis.com/auth/userinfo.profile",
		XML_URL : "https://www.googleapis.com/oauth2/v1/tokeninfo"
	}
};
