var rtc = {
    // Set up local audio tracks and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
};
export async function startBasicCallPublive(options) {
    const Publive = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    Publive.setClientRole(options.role);
    await Publive.join(options.appId, options.channel, options.token, options.uid);
    console.log(AgoraRTC)
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await Publive.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    const localPlayerContainer = document.createElement("div");
    localPlayerContainer.id = options.uid;
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    document.body.append(localPlayerContainer);

    rtc.localVideoTrack.play(localPlayerContainer);

    alert("publish success!");

    Publive.on("user-published", async(user, mediaType) => {
        await Publive.subscribe(user, mediaType);
        alert("subscribe success");

        if (mediaType === "video") {
            const remoteVideoTrack = user.videoTrack;
            const remotePlayerContainer = document.createElement("div");
            remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
            remotePlayerContainer.style.width = "640px";
            remotePlayerContainer.style.height = "480px";
            document.body.append(remotePlayerContainer);
            remoteVideoTrack.play(remotePlayerContainer);

        }

        if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
        }

        Publive.on("user-unpublished", user => {
            const remotePlayerContainer = document.getElementById(user.uid);
            remotePlayerContainer.remove();
        });

    });

    // Roger that token-privilege-will-expire When calling back, re-apply for a Token from the server and call renewToken to pass the new Token to the SDK
    Publive.on("token-privilege-will-expire", async function() {
        let token = await fetchToken(uid, options.channel, 1);
        await Publive.renewToken(token);
    });

    // Roger that token-privilege-did-expire When calling back, request a new one from the server Token，and call joinRejoin the channel
    Publive.on("token-privilege-did-expire", async function() {
        console.log("Fetching the new Token")
        let token = await fetchToken(uid, options.channel, 1);
        console.log("Rejoining the channel with new Token")
        await Publive.join(options.appId, options.channel, token, uid);
    });

}