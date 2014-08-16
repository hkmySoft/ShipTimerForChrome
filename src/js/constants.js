/**
 * constants.js
 * 固定値
*/
var Constants = {
	Hanyou : {
		DEFAULT_TOOL_TIP: "艦これタイマー連携ツール Beta",
		OAUTH_ERR_TOOL_TIP: "クリックしてGoogleとの連携を許可してください",
		DEVICE_ERR_TOOL_TIP: "iPhoneを認証してください。",
		DEVICE_ERR_MESSAGE: "iPhoneの認証に失敗しました。\n先にiPhone版「艦これタイマー」から\n認証を行ってください。\nまたは、下記の「使い方を見る」動画をご覧ください。",
		WGDT_NOTHING_ERR_MESSAGE: "艦これウィジェットが見つかりません。\nChromeウェブストアからダウンロードして下さい。",
		WGDT_CANCEL_ERR_MESSAGE: "データの要求を許可しない場合は\n艦これウィジェットの機能は使用できません。",
		WGDT_SOME_ERR_MESSAGE: "何らかのエラーが発生したため、\n設定できませんでした。",
		MAX_REPEAT: 10,
		YT_URL : "y-4hTrLgh9Adc"
	},
	StWin : {
		KANCOLLE: "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/",
		SUFFIX: "?shiptimer=true",
		WIDTH: 750,
		HEIGHT: 470,
		TOP: 50,
		LEFT: 50,
		TYPE: 'popup'
	},
	Strage : {
		OAUTH_COMP_KEY: "OAuth_Complete",
		AWS_SNS_COMP_KEY: "AwsSNS_Complete",
		MONITOR_FLG: "Monitor_Flg",
		LOCAL_DEVICE_ID: "AwsSNS_Device_ID",
		LOCAL_ENDPOINT: "AwsSNS_End_Point"
	},
	Apns : {
		T_ENSEI  : "mission",
		T_NYUKYO : "nyukyo",
		T_BUILD  : "createship"
	},
	WgdtSet : {
		B_USE    : "Wgdt_Use",
		B_ENSEI  : "Wgdt_Mission",
		B_NYUKYO : "Wgdt_Nyukyo",
		B_BUILD  : "Wgdt_CreateShip",
		WGDT_ID  : "eecngmillminbdldimjbknhakcljolpk",
		DL_URL   : "https://chrome.google.com/webstore/detail/%E8%89%A6%E3%81%93%E3%82%8C%E3%82%A6%E3%82%A3%E3%82%B8%E3%82%A7%E3%83%83%E3%83%88/iachoklpnnjfgmldgelflgifhdaebnol?hl=ja"
	},
	AwsConst : {
		CONFIG_REGION: 'us-east-1',
		IAM_ROLE: "arn:aws:iam::348287904183:role/KanColleRole",
		PLAT_APP : "arn:aws:sns:us-east-1:348287904183:app/APNS/ShipTimer",
		APS_NAME : "APNS",
		DB_TABLE : "DevTokTbl"
	},
	OAuthConst : {
		CLIENT_ID: "596857451248-ink6lpctnh0h6h2ttkoljvp7punvij1n.apps.googleusercontent.com",
		CLIENT_SECRET: "47vDh2PG73aaFXM7Ir8zuODw",
		API_SCOPE : "https://www.googleapis.com/auth/userinfo.profile",
		XML_URL : "https://www.googleapis.com/oauth2/v1/tokeninfo"
	}
};
