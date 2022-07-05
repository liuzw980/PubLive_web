// Must download the dependency of npm easemob
import websdk from "easemob-websdk"
import { Base64 } from "js-base64"
// Inherit easemob IM instant messaging
const config = {
    xmppURL: 'Ly9pbS1hcGkuZWFzZW1vYi5jb20=', // xmpp Server address, the appKey created in console.easemob.com is fixed to this value
    apiURL: 'aHR0cDovL2ExLmVhc2Vtb2IuY29t', // rest Server address, the appKey created in console.easemob.com is fixed to this value  
    appkey: '1102220607107224#key-customers', // App key
    https: false, // Whether to use https
    isHttpDNS: true, // prevent DNS hijacking to get XMPPUrl、restUrl from the server
    isMultiLoginSessions: false, // Whether to enable multiple pages to receive messages synchronously? Note that you need to contact the business department to activate this function first
    isDebug: true, // when debugging is turned on, the log will be automatically printed and can be checked in the console
    autoReconnectNumMax: 2, // Maximum number of auto reconnections
    autoReconnectInterval: 3, // Interval between auto reconnections
    heartBeatWait: 30000, // Interval for sending heartbeat when using webrtc (video chat) unit: ms
    delivery: true, // Whether to send read receipt
}

let publive = {}
let WebIM = {};
WebIM = websdk;
config.apiURL = Base64.decode(config.apiURL)
WebIM.config = config;
publive = WebIM.publive = new WebIM.connection({
    appKey: WebIM.config.appkey,
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.socketServer,
    apiUrl: WebIM.config.restServer,
    isAutoLogin: WebIM.config.isAutoLogin,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    delivery: WebIM.config.delivery,
    useOwnUploadFun: WebIM.config.useOwnUploadFun
})
publive.listen({
    onOpened: function() {}, //Connection successful callback 
    onClosed: function() {}, //Connection closed callback
    onTextMessage: function(message) { console.log(message) }, //Received text messages
    onEmojiMessage: function(message) { console.log(message) }, //Received Emoji messages
    onPictureMessage: function(message) { console.log(message) }, //Received picture messages
    onCmdMessage: function(message) { console.log(message) }, //Received command messages
    onAudioMessage: function(message) { console.log(message) }, //Received audio messages
    onLocationMessage: function(message) { console.log(message) }, //Received location messages
    onFileMessage: function(message) { console.log(message) }, //Received file messages
    onCustomMessage: function(message) { console.log(message) }, //Received custom messages
    onVideoMessage: function(message) {
        var node = document.getElementById('privateVideo');
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function(response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(publive, response);
                node.src = objectURL;
            },
            onFileDownloadError: function() {
                console.log('File down load error.')
            }
        };
        WebIM.utils.download.call(publive, option);
    }, //Received video messages
    onPresence: function(message) { console.log(message) }, //Process "broadcast" or "publish-subscription" messages, such as  subscription request, group processing, being kicked out from chat room etc.
    onRoster: function(message) { console.log(message) }, //Process friend request
    onInviteMessage: function(message) { console.log(message) }, //Process group invitation
    onOnline: function() {}, //The computer has successfully connected to the Internet
    onOffline: function() {}, //The computer has disconnected from the Internet
    onError: function(message) { console.log(message) }, //Failed callback
    onBlacklistUpdate: function(list) { //Blacklist changes
        // Querying the blacklist, blacklisting friends, and removing friends from the blacklist will call back this function. The list serves as the information of all existing friends in the blacklist
        console.log(list);
    },
    onRecallMessage: function(message) { console.log(message) }, // Received recall message receipt
    onReceivedMessage: function(message) { console.log(message) }, //Received the receipt of messages delivered to the server
    onDeliveredMessage: function(message) { console.log(message) }, //Received the receipt of messages delivered to the client
    onReadMessage: function(message) { console.log(message) }, //Received message read receipt
    onCreateGroup: function(message) { console.log(message) }, //Receipt of group created successfully (Creategroupnew needs to be called)
    onMutedMessage: function(message) { console.log(message) }, //If the user is muted in Group A, this callback will be taken when sending a message in Group A, and the message will not be delivered to other members of the group.
    onChannelMessage: function(message) { console.log(message) } //Received the entire conversation read receipt. When the other party sends a channel ack, it will receive a message in this callback.
});

export default publive