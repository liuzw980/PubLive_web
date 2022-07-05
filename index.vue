<template>
    <div id="ChatInterface">
        <van-nav-bar :title='title'
                     :fixed=true
                     :border=false
                    @click-left="onClickLeft"
                     left-arrow
                     style="height:0.88rem" />

        <div class="box">
            <div class="content">
                <van-divider v-if="charList.length == 0" :style="{ color: '#000', borderColor: '#ccc', padding: '0 16px',fontSize: '.28rem',fontWeight: '300' }">暂无聊天记录</van-divider>
                <div v-else >
                    <ul v-for="(item,index) in charList" :key="index">
                        <li :class="userInfo.member_id != item.member_id ? 'msg-other': 'msg-me'" >
                            <p v-if="item.if_show_time">{{item.insert_time_date}}</p>
                            <div class="message">
                                <div class="message_i">
                                    <img class="message_image" :src="userInfo.member_id != item.member_id ? item.avatar: userInfo.member_avatar" alt="">
                                </div>
                                <!-- 文本 -->
                                <div class="content" v-if="item.content">{{item.content}}</div>
                                <!-- 图片 -->
                                <img class="image_con" v-if="item.image" :src="item.image" alt="">
                                <!-- 文件 -->
                                <div class="document" v-if="item.document" @click="godownFile(item.document)">
                                    <div class="doc_one">
                                        <p class="file_title">{{item.fileName}}</p>
                                        <p class="file_size"></p>
                                    </div>
                                    <img class="file_image" :src="downFile" alt="">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="Bottom">
                <div class="replyInput">
                    <img :src="images.comment" />
                    <van-field
                            v-model="currentValue"
                            rows="1"
                            autosize
                            ref="testArea"
                            type="textarea"
                            placeholder="发消息..."
                    />
                </div>
                <div class="sendclick" v-if="currentValue?false:true">
                    <!-- 发送文件 -->
                    <van-uploader class="save" :after-read="afterRead" accept=".txt, .pdf, .doc, .docx, .xls, .xlsx">
                        <img :src="images.file" />
                    </van-uploader>
                    <!-- 发送图片 -->
                    <van-uploader class="save" :after-read="afterPicture" accept="image/*">
                        <img :src="images.picture" />
                    </van-uploader>
                </div>
                <div @click="submit" v-if="currentValue?true:false" class="send">发送</div>

            </div>
        </div>


        <!--路由的出口-->
        <transition name="router-slider"
                    mode="out-in">
            <router-view></router-view>
        </transition>

    </div>

</template>

<script type="text/javascript">
import { Toast } from 'vant';
import { memberMessageList,memberLeaveMessage,memberChatFiles } from '../../../api/notificationChat'
import ChatMessage from './ChatMessage.vue'
import { mapState } from 'vuex'
import axios from "axios";
    export default {
        name: "chatInterface",
        data(){
            return{
                currentValue:'',//输入内容
                title: this.$route.query.member_name ? this.$route.query.member_name : '聊天名称',
                messageBy_id: this.$route.query.by_id ? this.$route.query.by_id : '',   //聊天发送消息传入聊天列表页的by_id
                charList:[],
                fileImg:'',   //文件
                $imconn: {},
                $imoption: {},
            }
        },
        created(){
            //声明调用
            this.$imconn = this.$imconn;
            this.$imoption = this.$imoption;
            this.loginWebIM()
            //调用聊天记录接口
            that.messageList(this.detailId,this.chatId)
            
        },
        watch:{
            //监听接收页面传过来的动态值
            '$route.query': function(){
                //判断聊天窗口的title是否为空
                this.title = this.$route.query.member_name;
                this.messageBy_id = this.$route.query.by_id
                if (this.source == 1) {
                    //调用聊天记录接口
                    this.messageList('',this.chatId)
                }else if(this.source == 2){
                    this.messageList(this.detailId,'')   //获取聊天记录
                }
            },

        },
        //进入页面滑动到底部
        updated(){
            this.scrollToBottom();
        },
        methods: {
            //登录环信
            loginWebIM(){
                //拿到存储后的账号密码赋值
                this.$imoption.user = this.name
                this.$imoption.pwd = this.word
                this.$imconn.open(this.$imoption);
                // open方法，传入挂载在vue实例上的配置对象
                let _this = this;
                this.$imconn.listen({
                    onOpened: function (message) {
                        console.log('用户已接收') // 控制台打印出这句证明连接成功啦
                    },
                    onClosed: function (message) {
                        console.log('用户未接收')
                    },
                    // 集成收到文本信息方法
                    onTextMessage: function ( message ) {
                        // console.log(message)
                        _this.charList.push({
                            avatar: message.ext.avatar,
                            content: message.data,
                            imgUrl: message.ext.url,
                            member_id: message.ext.member_id,
                            insert_time_date: message.ext.insert_time_date,
                            insert_time: message.ext.insert_time,
                            member_name: message.ext.member_name
                        });
                    },
                    //收到图片消息
                    onPictureMessage: function ( message ) {
                        // console.log(message)
                        _this.charList.push({
                            avatar: message.ext.avatar,
                            member_id: message.ext.member_id,
                            insert_time_date: message.ext.insert_time_date,
                            insert_time: message.ext.insert_time,
                            member_name: message.ext.member_name,
                            image: message.ext.url
                        });
                    },
                    //收到文件消息
                    onFileMessage: function ( message ) {
                        // console.log(message)
                        _this.charList.push({
                            avatar: message.ext.avatar,
                            member_id: message.ext.member_id,
                            insert_time_date: message.ext.insert_time_date,
                            insert_time: message.ext.insert_time,
                            member_name: message.ext.member_name,
                            document: message.ext.fileUrl,
                            fileName:message.ext.fileName,
                            fileLength: message.ext.fileLength
                        });
                    },    

                })
            },
            // 返回
            onClickLeft () {
                this.$router.back();
            },
            //文件按钮
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                let formData = new FormData()
                formData.append('file',file.file)
                formData.append('id',this.detailId)
                formData.append('chat_id',this.chatId)
                formData.append('image','')
                // 添加请求头
                memberChatFiles (formData).then(res => {
                    if (res.data.status == 1) {
                        let filedata = res.data.data
                        var id = this.$imconn.getUniqueId();        // 生成本地消息id
                        var msg = new WebIM.message('file', id);        // 创建文件消息
                        var time = +new Date()
                        let _this = this;    // 创建文本消息
                        msg.set({
                            file: file,
                            chatType: 'singleChat',    //单聊
                            ext: {          //ext扩展   将参数可放置这里
                                time: time,
                                fileUrl: filedata.document,
                                fileName: filedata.fileName,
                                fileLength: file.file.size,
                                avatar: filedata.avatar,
                                member_id: filedata.member_id,
                                member_name: filedata.member_name,
                                insert_time_date: filedata.insert_time_date,
                                insert_time: filedata.insert_time
                            },
                            to: this.title,  // 接收消息对象 （指的是跟你会话的人存入环信的账号）
                            onFileUploadError: function () {      // 消息上传失败
                                console.log('onFileUploadError');
                            },
                            onFileUploadProgress: function (e) { // 上传进度的回调
                                console.log(e)
                            },
                            onFileUploadComplete: function () {   // 消息上传成功
                                console.log('文件上传成功');
                            },
                            success: function () {                // 消息发送成功
                                console.log('文件已发送')
                                _this.charList.push({            //将数据push数组内，展示在页面（指自己发送的这方）
                                    avatar: filedata.avatar,
                                    member_id: filedata.member_id,
                                    insert_time_date: filedata.insert_time_date,
                                    insert_time: filedata.insert_time,
                                    member_name: filedata.member_name,
                                    document: filedata.document,
                                    fileName: filedata.fileName
                                });
                                _this.keepbottom();
                            },
                            fail: function(e){
                                console.log("Fail");              //如禁言、拉黑后发送消息会失败
                            },
                            flashUpload: WebIM.flashUpload,
                        });
                        msg.body.chatType = "singleChat";
                        this.$imconn.send(msg.body);
                    }else{
                        Toast(res.message)
                    }
                })
            },
            //图片
            afterPicture(file){
                let formData = new FormData()
                formData.append('file','')
                formData.append('id',this.detailId)
                formData.append('chat_id',this.chatId)
                formData.append('image',file.file)
                // 添加请求头
                memberChatFiles (formData).then(res => {
                    if (res.data.status == 1) {
                        this.fileImg = res.data.data.image
                        let imagedata = res.data.data
                        var id = this.$imconn.getUniqueId();        // 生成本地消息id
                        var msg = new WebIM.message('img', id);        // 创建图片消息
                        var time = +new Date()
                        let _this = this;    // 创建文本消息
                        msg.set({
                            body:{
                                type: 'image',
                                url: this.fileImg,
                                filename: file.file.name,
                                filetype: file.file.type
                            },
                            ext: {
                                time: time,
                                url: this.fileImg,
                                avatar: imagedata.avatar,
                                member_id: imagedata.member_id,
                                insert_time_date: imagedata.insert_time_date,
                                insert_time: imagedata.insert_time,
                                member_name: imagedata.member_name
                            },
                            to: this.title,  // 接收消息对象
                            success: function(){
                                console.log('图片已发送')
                                _this.charList.push({
                                    avatar: imagedata.avatar,
                                    image: imagedata.image,
                                    member_id: imagedata.member_id,
                                    insert_time_date: imagedata.insert_time_date,
                                    insert_time: imagedata.insert_time,
                                    member_name: imagedata.member_name
                                });
                                _this.keepbottom();
                            },
                            flashUpload: WebIM.flashUpload 
                        });
                        msg.body.chatType = "singleChat";
                        this.$imconn.send(msg.body);
                    }else{
                        Toast(res.data.message)
                    }
                })
            },
            //获取聊天记录
            messageList(id,chat_id){
                //获取聊天记录
                memberMessageList(id,chat_id).then(res => {
                    // console.log(res)
                    if(res.status == 1){
                        this.charList = res.data;
                    }
                    if(res.status == '-1'){
                        Toast(res.message)
                        this.$router.go(-1)
                    }
                })
            },
            getMessage (item, index) {
                this.getTime(item, index)
                return this.charList[index]
            },
            //处理时间5分钟内不展示
            getTime (item, index) {
                let time = item.insert_time
                //定义一个if_show_time默认false  不显示
                this.charList[index]['if_show_time'] = false
                if (index) {
                    if (Math.abs(this.charList[index - 1]['show_time'] - time) > 30) {
                        this.charList[index]['show_time'] = time
                        this.charList[index]['if_show_time'] = true
                    } else {
                        this.charList[index]['show_time'] = this.charList[index - 1]['show_time']
                    }
                } else {
                    this.charList[index]['show_time'] = time
                    this.charList[index]['if_show_time'] = true
                }
            },
            //进入页面滑动到底部
            scrollToBottom() {
                this.$nextTick(() => {
                    var container = this.$el.querySelector('.content');
                    //content
                    container.scrollTop = container.scrollHeight
                })
            },
            //发送
            submit(){
                if (this.currentValue=='') {
                    Toast('请填写内容')
                    return
                }
                memberLeaveMessage(this.detailId,this.messageBy_id,this.currentValue).then(res => {
                    // console.log(res)
                    if (res.status == 1) {
                        let receivemsg = res.data

                        var id = this.$imconn.getUniqueId();        // 生成本地消息id
                        var msg = new WebIM.message('txt', id);
                        var time = +new Date()
                        let _this = this;    // 创建文本消息
                        //生成本地消息id
                        msg.set({
                            msg: this.currentValue, // 消息内
                            from: this.name,
                            to: this.title, // 接收消息对象（用户id）
                            roomType: true,
                            // ext表示拓展对象，这个会随着你发送而发送过去，你接收时同样可以拿到这个数据
                            ext: {
                                time: time,
                                avatar: receivemsg.avatar,
                                member_id: receivemsg.member_id,
                                insert_time_date: receivemsg.insert_time_date,
                                insert_time: receivemsg.insert_time,
                                member_name: receivemsg.member_name
                            },
                            success: function(id, serverMsgId) {
                                //  追加本地缓存处理
                                // console.log(msg);
                                //发送成功数据
                                console.log("消息发送成功");
                                //把发送者的头像和文本数据push到数组中在页面上展示
                                _this.charList.push({
                                    avatar: receivemsg.avatar,
                                    content: msg.value,
                                    member_id: receivemsg.member_id,
                                    insert_time_date: receivemsg.insert_time_date,
                                    insert_time: receivemsg.insert_time,
                                    member_name: receivemsg.member_name
                                });
                                
                                _this.keepbottom();
                            },
                            fail: function(e) {
                                // 失败原因:
                                // e.type === '603' 被禁言
                                // e.type === '605' 群组不存在
                                // e.type === '602' 不在群组或聊天室中
                                // e.type === '504' 撤回消息时超出撤回时间
                                // e.type === '505' 未开通消息撤回
                                // e.type === '506' 没有在群组或聊天室白名单
                                // e.type === '501' 消息包含敏感词
                                // e.type === '502' 被设置的自定义拦截捕获
                                // e.type === '503' 未知错误
                                console.log("消息发送失败");
                            }
                        });
                        msg.body.chatType = "singleChat";
                        this.$imconn.send(msg.body);

                        this.currentValue = ''
                    }
                })
            },
            godownFile(fileUrl){
                window.open(fileUrl);
            }

        },

    }
</script>