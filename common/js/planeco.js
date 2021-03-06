/*
 * jQuery CHAT v.1.00
 * 
 * Copyright(C)2014 STUDIO KEY Allright reserved.
 * http://studio-key.com
 * MIT License
 */

/*
 * loading
 */
jQuery.event.add(window,"load",function() { 
    jQuery("#fade").css("height", '100%').delay(900).fadeOut(800);
    jQuery("#loader").delay(600).fadeOut(300);
    jQuery("#container").css("display", "block");
});

var allgood = 0;
var allcost = 0;
var allitem = 0;
var ufilename = "";
$pcanvas = $('#planetcanvas');

(function($){
  $.fn.jqueryChat = function(options) {
    var opt = $.extend( {
        'reload'     : 5000,
        'readlog'    : true,
        'delcookie'  : false,
        'log_login'  : true,
        'log_logof'  : true,
        'bt_name'    : 'Send your name (max 8 letters)',
        'bt_chat'    : 'Write your message',
        'mes_logout' : 'Are you going to leave PLANECO?',
        'err_name'   : 'What is your name?',
        'err_upload' : 'Fail to upload',
        'err_write'  : 'No message to write',
        'err_wnig'   : 'Error!!',
        'login'      : ' joined to PLANECO',
        'logout'     : ' leaved from PLANECO',
        'cmdmes'     : 'Wrong command',
        'flaggmap'   : false,
        'gmap'       : 'Your global position will be revealed. Is is Ok?',
        'color'      : 'FF0004,0A00FF,FF00D6,2B9700,FF7600,666666',
        'terms'      : '<h1>Terms</h1>'+
'- You can not post any statements, images, contraries that against to public order and morals, or contents prohibited by law.<br>'+
'- Inappropriate posting is subject to deletion and subject to access restriction by Web Coockie and IP address.<br>'+
'- Do not use this application for political and/or religeous propaganda operations.'+
'<h1>Story</h1>- You are a planet incubator. You can design your own planet by making good actions for the earth.<br>'+
'PLANECO provides SNS community for sharing the good-for-earth actions.<br>'+
'- You can share your action by sharing chat messages, photos, stamps, and geo-locations.<br>'+
'- You can earn points by receiving Good! votes from other users.<br>'+
'- You can design and share your own customized planet by decorating it using Good! points.'+
'<h1>How to use</h1>'+
'<img src="common/images/talk.png" style="background-color:#000;"/> Open chat window. You can chat your messages. In this window, you can use the following functions.<br>'+
'<img src="common/images/sys.png" width="25" style="background-color:#000;"/> Open the function menu. You can use the following four functions inside. <br>'+
'<img src="common/images/map.png" width="25" style="background-color:#000;"/> Share your GPS location. You may configure the setting menu of your smartphone to use.<br>'+
'<img src="common/images/stamp.png" width="25" style="background-color:#000;"/> Share ECO stamps.<br>'+
'<img src="common/images/color.png" width="25" style="background-color:#000;"/> Change the color of your chat name and chat messages.<br>'+
'<img src="common/images/syss.png" width="25" style="background-color:#000;"/> Change the number of lines to show in the chat window.<br>'+
'<img src="common/images/planet.png" style="background-color:#000;"/> Open the planet design window. You can design your own planet. If you earn planet ornaments in the nurturing window, you can move and rotate it in this window to decorate your planet.<br>'+
'- Bring to Top: Bring the selected planet ornament to the top hierarchy of the layer.<br>'+
'- Save: Save your planet design into the server. Don\'t forget to save if you finish your decoration.<br>'+
'- Image: Download the image of your current planet design as a PNG imnage.<br>'+
'- Upload: Upload the image of your current planet design as your Chat message.<br>'+
'<img src="common/images/nurture.png" style="background-color:#000;"/> Get planet ornaments. It shows your total Good! points and used number of items and Good! points to get planet ornaments. Push the blue points icon, then it shows various fancy planet ornaments. Push it and get it.<br>'+
'<img src="common/images/logof.png" style="background-color:#000;"/> Log off PLANECO<br>'+
'<img src="common/images/planeconew-mini1.png" /> Change chat room. You can select various chat room of ECO topics to tap the top left corner of PLANECO screen.<br>'+
'<br>Please press CONFIRM if you observe the terms above.',
        'chatroom'      : '<h1>Chat Rooms</h1>'+
'<ul><li>PLANECO Chat-room 1<br>Main PLANECO Chat ROOM<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/index.html\'" value="ENTER ROOM#1"/></li>'+
'<ul><li>PLANECO Chat-room 2<br>For beginners<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/r2.html\'" value="ENTER ROOM#2"/></li>'+
'<ul><li>PLANECO Chat-room 3<br>For discussion of air pollution<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/r3.html\'" value="ENTER ROOM#3"/></li>'+
'<ul><li>PLANECO Chat-room 4<br>For discussion of water pollution<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/r4.html\'" value="ENTER ROOM#4"/></li>'+
'<ul><li>PLANECO Chat-room 5<br>For discussion of the red list<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/r5.html\'" value="ENTER ROOM#5"/></li>'+
'<ul><li>PLANECO Chat-room 6<br>For discussion of abnormal climate/weather<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/r6.html\'" value="ENTER ROOM#6"/></li>'+
'<ul><li>PLANECO Chat-room 7<br>For discussion of increasing sea level<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/r7.html\'" value="ENTER ROOM#7"/></li>'+
'<ul><li>PLANECO Chat-room 8<br>For discussion of global ecological destruction<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/r8.html\'" value="ENTER ROOM#8"/></li>'+
'<ul><li>PLANECO Chat-room 9<br>For discussion of other topics<br><input type="button" onclick="location.href=\'https://westclan.jp/PLANECO/r9.html\'" value="ENTER ROOM#9"/></li>'
    }, options);

/*
 * 名前と個人判別キーをルーム固有にする
 * jquery_chat_name
 * jquery_chat_unique
 */
    jquery_chat_name   = 'jquery_chat_name'+opt.room_id;
    jquery_chat_unique = 'jquery_chat_unique'+opt.room_id;
    
/*****************************************************
 * 初回ロード時にDB接続を確認する
 *****************************************************/
    $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=db_check&room="+opt.room_id,
        success: function(xml){
          var error = $(xml).find("error").text();
          if(error){
            $("#log").html('<span style="color:red;font-size:90%">Cannot connect Database<br />'+error+'</span>');
          }
        }
    });

/*****************************************************
 * HTMLなんかを挿入する
 *****************************************************/

  /* システム設定拡張用
   *------------------------------------*/
      var html  = '';
          html += '  <div id="sys_setting" class="pc">';
          html += '    <div id="sys_row">';
          html += '      <div id="sys_th">過去ログ</div>';
          html += '      <div id="sys_td">';
          html += '        <select id="log_len">';
          html += '          <option value="100">100</option>';
          html += '          <option value="150">150</option>';
          html += '          <option value="200">200</option>';
          html += '          <option value="250">250</option>';
          html += '          <option value="300">300</option>';
          html += '          <option value="350">350</option>';
          html += '          <option value="400">400</option>';
          html += '          <option value="450">450</option>';
          html += '          <option value="500">500</option>';
          html += '        </select>';
          html += '      </div>';
          html += '    </div>';
          html += '  </div>';
          $(this).after(html);

  /* カラーパレット
   *------------------------------------*/
      var color = opt.color.split(",");
      var html  = '';
          html += '<div id="setting" class="pc">';
          html += '<div>';
          html += '<p>Name</p>';
          for(var i=0; i<color.length; i++){
            html += '<span style="color:#'+color[i]+'" class="n" title="'+color[i]+'">■</span>';
          }
          html += '</div>';
          html += '<div>';
          html += '<p>Log</p>';
          for(var i=0; i<color.length; i++){
            html += '<span style="color:#'+color[i]+'" class="l" title="'+color[i]+'">■</span>';
          }
          html += '</div>';
          html += '</div>';
          $(this).after(html);
          
  /* すたんぷ
   *------------------------------------*/
          $(this).after('<div id="stamp_wrap" class="pc"></div>'); 
          
  /* message
   *------------------------------------*/
          $(this).after('<div id="message" class="pc"></div>');

  /* camera
   *------------------------------------*/
var html = '';
          html +='<div id="camera" class="pc">';
          html +='  <span class="btn btn-success fileinput-button">';
          html +='    <i class="glyphicon glyphicon-plus"></i>';
          html +='    <span>Select files...</span>';
          html +='    <input id="fileupload" type="file" name="files[]" multiple>';
          html +='  </span>';
          html +='  <div id="progress" class="progress">';
          html +='    <div class="progress-bar progress-bar-success"></div>';
          html +='  </div>';
          html +='  <div id="files" class="files"></div>';
          html +='</div>';
          $(this).after(html);

  /* ログ移動位置
   *------------------------------------*/
          $(this).after('<div id="end"></div>');

  /* 送信フォーム
   *------------------------------------*/
      var html  = '';
          html += '<div id="chat" class="pc">';
          html += '  <form id="form" name="form">';
          html += '    <input name="c" id="c"  type="hidden" value="">';
          html += '    <input name="l" id="l"  type="hidden" value="">';
          html += '    <input name="var" type="text" id="var" maxlength="8">';
          html += '    <a href="#" id="button"></a>';
          html += '    <div id="camera_icon"><img src="common/images/camera.png" width="30" height="30" /></div>';
          html += '  </form>';
          html += '</div>';
          $(this).after(html);
          
  /* スタンプの読み込み
   *------------------------------------*/
    $("#stamp_wrap").html('');
          $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=stamp",
              success: function(xml){
                $(xml).find("item").each(function(){
                  var stp = $(this).find("stp").text();
                  $('#stamp_wrap').append('<img src="stamp/thumbnail/'+stp+'" id="'+stp+'" class="stmp" />');
                });
              }
          });
          
/*****************************************************
 * 設定で表示・非表示を変更
 *****************************************************/
  /* Gmap機能
   *------------------------------------*/
    if(opt.flaggmap == true){
			if (!navigator.geolocation) {
				$("#map").hide();
			}
    }else{
      $("#map").hide();
    }
  /* 初回ログ表示
   *------------------------------------*/
    if( opt.readlog === true ){
      readLog(false,'');
    }
  /* 初回にcookieを消すか
   *------------------------------------*/
    if( opt.delcookie === true ){
      $.removeCookie(jquery_chat_name);
      $.removeCookie(jquery_chat_unique);
    }
    
/*****************************************************
 * HTMLの挿入が終わったら
 * ウインドサイズによって幅を変更する
 *****************************************************/
      width_change($(window).width());
      $(window).resize(function(){
        width_change($(window).width());
      });

  /* 画面を最下部へ移動 
   * ロード時は少し遅延させ、ゆったり移動
   *------------------------------------*/
      setTimeout(function(){
           var pos = $("#end").offset().top; 
           $("html, body").animate({ 
              scrollTop:pos 
           }, 1000, "swing");
      },3000);


  /* COOKIEに名前があるかどうか
   *------------------------------------*/
      var name = $.cookie(jquery_chat_name);
      if(!name){
        $("#form a").text(opt.bt_name);
      }else{
        $("#form a").text(opt.bt_chat);
        $("#var").attr("maxlength","500");
      }
      
/*****************************************************
 * システム設定色々 len_change_button log_len
 * @len_change_button -> 表示件数の変更(過去ログ閲覧) 
 *****************************************************/
      $(document).on('change','#log_len',function(e){
        var len = $("#log_len").val();
        
        $("#log").data("slide",'off'); //スライド機能をオフ
        readLog('',len); //全ログ書き変えで指定件数を表示 *下段には追加されていくが、下段へスライドはしない 次の発言でスライドON
        
        $("#sys_setting").hide();
        $("#header").hide();
        e.preventDefault();
      });

/*****************************************************
 * logout
 *****************************************************/
      $(document).on('click','#logof',function(e){
        if($.cookie(jquery_chat_name)){
          $.confirm({
            title: 'Logout',
            content: opt.mes_logout,
            buttons: {
              confirm: function () {
                $("#planetwin").slideUp(600);
                $("#nurturewin").slideUp(600);
                $("#chat").slideDown(600);
                $("#log").slideDown(600);
                logWrite(null,true);
                $.removeCookie(jquery_chat_name);
                $.removeCookie(jquery_chat_unique);
//  console.log("Logout");
                $("#form a").text(opt.bt_name);
                location.href=location.href;
              },
                cancel: function () {
              },
            }
          });
          e.preventDefault();
        }
      });
      
/*****************************************************
 * 現在位置情報
 *****************************************************/

  /* クリックで現在地を取得
   *------------------------------------*/
      $(document).on('click','#map img',function(e){
        if($.cookie(jquery_chat_name)){
          $.confirm({
            title: 'GPS',
            content: opt.gmap,
            buttons: {
              confirm: function () {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
              },
                cancel: function () {
              },
            }
          });
        e.preventDefault();
      }
    });

  /* [ログ記録処理] Geolocation API
   *------------------------------------*/
        function successCallback(position) {
          var lon = position.coords.latitude;
          var lat = position.coords.longitude;
// console.log("LON:"+lon+" LAT:"+lat);
          if(lon && lat){
            var val = lon+','+lat;
              $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=gmap&room="+opt.room_id+"&val="+val,
                  success: function(xml){
                    readLog(true,'');
                    cs_top();
                  }
              });
          }
        }
        function errorCallback(error) {
          switch(error.code) {
            case 1:
              $("#message").slideDown(200).text('Location aquisition denied');
              setTimeout(function(){
                $('#message').slideUp(100).text("");
              },3000);
              break;
            case 2:
              $("#message").slideDown(200).text('Location aquisition failed');
              setTimeout(function(){
                $('#message').slideUp(100).text("");
              },3000);
              break;
            case 3:
              $("#message").slideDown(200).text('Location aquisition timeout');
              setTimeout(function(){
                $('#message').slideUp(100).text("");
              },3000);
              break;
          }
        }

/*****************************************************
 * セッティングボックスの開閉 
 *****************************************************/
      $("#system").click(function (e) {
        if($('#log').is(':visible')){
          $("#stamp_wrap").slideUp();
          $("#setting").slideUp();
          $("#sys_setting").hide();
          
          if($.cookie(jquery_chat_name)){
            $("#header").slideToggle();
          }
          e.preventDefault();
        }
      });
      
/*****************************************************
 * セッティング色々ぼっくす
 *****************************************************/
      $("#setup").click(function (e) {
        $("#stamp_wrap").slideUp();
        $("#setting").slideUp();
        
        if($.cookie(jquery_chat_name)){
          $("#sys_setting").slideToggle();
        }
        
        e.preventDefault();
      });

/*****************************************************
 * カラーカスタマイズ
 *****************************************************/
      $("#custom").click(function (e) {
        $("#stamp_wrap").hide();
        $("#sys_setting").hide();
        
        if($.cookie(jquery_chat_name)){
          $("#setting").slideToggle();
        }
        e.preventDefault();
      });

      $(document).on('click','.n',function(e){
        $("#c").val( $(this).attr('title') );
        $("#setting").slideUp();
        $("#header").slideUp();
        e.preventDefault();
      });
      $(document).on('click','.l',function(e){
        $("#l").val( $(this).attr('title') );
        $("#setting").slideUp();
        $("#header").slideUp();
        e.preventDefault();
      });

/*****************************************************
 * スタンプボックス
 *****************************************************/
      $("#stamp").click(function (e) {
        $("#setting").hide();
        $("#sys_setting").hide();
        if($.cookie(jquery_chat_name)){
          $("#stamp_wrap").slideToggle();
        }
        e.preventDefault();
      });

  /* [ログ記録処理] スタンプ送信
   *------------------------------------*/
      $(document).on('click','.stmp',function(e){
        var img = $(this).attr("id");
        $("#stamp_wrap").slideUp();
        $("#header").slideUp();
        
          $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=gostamp&room="+opt.room_id+"&stamp="+img,
              success: function(xml){
                var limit = $(xml).find("limit").text();
                if(!limit){
                  readLog(true,'');
                  cs_top();
                }else{
                  $("#message").slideDown(200).text(limit);
                  setTimeout(function(){
                    $('#message').slideUp(100).text("");
                  },3000);
                }
              }
          });
      });

/*****************************************************
 * チャット(ちょっと変更)
 *****************************************************/
      $("#talk").click(function (e) {
        if($.cookie(jquery_chat_name)){
          $("#planetwin").slideUp(600);
          $("#nurturewin").slideUp(600);
          $("#chat").slideDown(600);
          $("#log").slideDown(600);
	  readLog();
          $(function(){
            setTimeout(function(){
              cs_top();
            },600);
          });
        }
        e.preventDefault();
      });

/*****************************************************
 * 惑星のアレンジ(新規作成)
 *****************************************************/
      $("#planet").click(function (e) {
        if($.cookie(jquery_chat_name)){
            $("#log").slideUp(600);
            $("#nurturewin").slideUp(600);
            $("#chat").slideUp(600);
            $("#header").slideUp(600);
            $("#camera").slideUp(600);
            $("#stamp_wrap").slideUp(600);
            $("#sys_setting").slideUp(600);
            $("#setting").slideUp(600);
            $("#message").hide(600);
            $("#planetwin").slideDown(600);
        }
        e.preventDefault();
      });

/*****************************************************
 * 惑星の育成:ショップみたいなもの(新規作成)
 *****************************************************/
      $("#nurture").click(function (e) {
        $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=allgood&room="+opt.room_id+"&chatunique="+$.cookie(jquery_chat_unique),
          success: function(xml){
            allgood = parseInt($(xml).find("allgood").text());
	    $('#allgoodp').text(allgood);
	    $('#allcostp').text(allcost);
	    $('#allitemp').text(allitem);
            if($.cookie(jquery_chat_name)){
              $("#log").slideUp(600);
              $("#planetwin").slideUp(600);
              $("#chat").slideUp(600);
              $("#header").slideUp(600);
              $("#camera").slideUp(600);
              $("#stamp_wrap").slideUp(600);
              $("#sys_setting").slideUp(600);
              $("#setting").slideUp(600);
              $("#message").hide(600);
              $("#nurturewin").slideDown(600);
              cs_down();
            }
            e.preventDefault();
	  }
        });
      });

/*****************************************************
 * カメラ
 * 入室していない場合は開かない
 *****************************************************/
      $("#camera_icon img").click(function (e) {
        $("#message").hide();
        if($.cookie(jquery_chat_name)){
          $("#camera").slideToggle();
          e.preventDefault();
        }
      });

/*****************************************************
 * 書いてないよー等のメッセージ部分はクリックで消す
 *****************************************************/
      $(document).on('click','#message',function(e){
        $(this).slideUp();
      });

/*****************************************************
 * いいね(新規作成)
 *****************************************************/
      $(document).on('click','.lil,.lir,.lili,.liri',function(e){
        var gid = $(this).attr("id");
//  console.log("GOOD!:",gid);
        $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=good&room="+opt.room_id+"&hash="+gid+"&goodfrom="+$.cookie(jquery_chat_unique),
          success: function(xml){
           var good = $(xml).find("good").text();
           var goodwho = $(xml).find("goodwho").text();
//  console.log(good, goodwho);
// なんか星と数字とか飛ばすかいな。goodの数だけ
           }
        });
	readLog();
      });

/*****************************************************
 * ボタン送信!!
 *****************************************************/
      $(document).on('click','#button',function(e){
        clearTimeout(timer_id);
        $("#message").hide();
        var val = $("#var").val();
            val = $.trim(val); //空白だけはダメ
            val = sanitize( val ); //送信された値をサニタイズ

  /* 入室時 (名前送信) 
   *------------------------------------*/
        if($(this).text() === opt.bt_name){
          $.confirm({
            title: 'Notes and How to Use',
            content: '<img src="common/images/planeco-icon-mini.png" width="64"><br><span class="quizans">'+opt.terms+'</span>',
            buttons: {
              confirm: function () {
                text: 'Accept'
                  if( val ){
                    $.cookie(jquery_chat_name, val, { expires: 7 }); //名前をcookieに記録
                    $("#var").val(''); //inputを空に
                    $("#form a").text(opt.bt_chat); //ボタンを変更
                    $("#var").attr("maxlength","500"); //maxlengthを変更
                    if(opt.log_login === true) logWrite(val,null);
                  }else{
                    $("#var").val('');
                    $("#message").slideDown(200).text(opt.err_name);//空の場合はエラー
                  }
              },
              cancel: function () {
                  text: 'Ignore'
              },
            }
          });
        }
  /* チャット送信!!
   *------------------------------------*/
        else{
          if( val ){
            if( $.cookie(jquery_chat_name) ){
              logWrite(null,null);
            }else{
              $("#message").slideDown(200).text(opt.err_wnig); //入室しているのにログを空にした場合など
              setTimeout(function(){
                location.href=location.href;
              },3000);
            }

          }else{
            $("#var").val('');
            $("#message").slideDown(200).text(opt.err_write);//空の場合はエラー
          }
        }
        e.preventDefault();
      });

/*****************************************************
 * ログを書き込む
 *****************************************************/
    function logWrite(name,logout){
    /* [ログ記録処理]
     * 名前送信の場合は入室メッセージ
     *------------------------------------*/
      if(name){
       //個人を特定するユニークな値をCOOKIEに記録
          var unique = Math.round( Math.random()*10000 )+'_'+$.now();
          $.cookie(jquery_chat_unique, unique, { expires: 7 });

          $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=login&room="+opt.room_id+"&mes="+opt.login+"&str="+name,
              success: function(xml){
                readLog(true,'');
                cs_top();
              }
          });
      }

    /* [ログ記録処理]
     * 退室ならば
     *------------------------------------*/
      else if(logout){
        if(opt.log_logof === true) {
          $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=logout&room="+opt.room_id+"&name="+$.cookie(jquery_chat_name)+"&mes="+opt.logout,
              success: function(xml){
                redraw(true);
// console.log("Logout and Planet Data Erased");
                readLog(true,'');
                cs_top();
              }
          });
        }else{
        }
      }

    /* 
     * チャット
     *------------------------------------*/
      else{
          var val    = $("#var").val();
          $("#log").data("slide",'on'); //発言をしたらスライドをON

       //コマンド処理
       //=========================================
          //テーマを変える 
            if(val === '#theme'){
              Theme();
              $("#var").val('');
              return ;
            }
            if(val === '#help'){
              var str  = '<li class="li3" id="setumei">';
                  str += '[#quiz]<br />Challenge to an ECO quiz. PLANECO will teach you the answer!<br />';
                  str += '[#theme]<br />Background color will change randomly.<br />';
                  str += '[#fortune]<br />Draw a fortune slip<br />';
                  str += '[#health]<br />Draw a fortune slip of health.<br />';
                  str += '[#love]<br />Draw a fortune slip of love.<br />';
                  str += '</li>';
                  $('#log ul').append( str );
                  cs_top();
                  $("#var").val('');
                  return ;
            }
        
          $.ajax({ type: "POST",url: "common/php/chat.php",data: "mode=send&room="+opt.room_id+"&str="+val+'&c='+$("#c").val()+'&l='+$("#l").val(),
              success: function(xml){
                var limit = $(xml).find("limit").text();
                if(!limit){
                  readLog(true,'');
                  cs_top();
                }else{
                  $("#message").slideDown(200).text(limit);
                  setTimeout(function(){
                    $('#message').slideUp(100).text("");
                  },3000);
                }
                
              }
          });
          $("#var").val(''); //inputを空に
      }
    }

/*****************************************************
 * ログ配列(画像表示のため改変)
 *****************************************************/
    function logRow(xml){
      var cls  = $(xml).find("cls").text();
      var unq  = $(xml).find("unq").text();
      var name = $(xml).find("name").text();
      var log  = $(xml).find("log").text();
      var date = $(xml).find("date").text();
      var col1 = $(xml).find("col1").text();
      var col2 = $(xml).find("col2").text();
      var img  = $(xml).find("img").text();
      var hash = $(xml).find("hash").text();
      var good = $(xml).find("good").text();
      var myunq = $.cookie(jquery_chat_unique);
      log = sanitize( log ); 
      log = getLink(log);
      var dstyle = '';

/* ここから新構成 */

      if(cls === 'li3'){
        return html = '<li class="li3" id="'+hash+'">'+name+':'+log+'</li>';
      }else if(cls === 'li4'){
        var mlog = log.split('|');
        if(mlog[1]){
          var log = mlog[0]+'<button class="quiz" name="Ans" value="'+mlog[1]+'">Ans</button>';
        }else{
          var log = mlog[0];
        }
        return html = '<li class="li4" id="'+hash+'">'+log+'</li>';
      }else{
        if(myunq === unq){
          // 本人
          dstyle = ' style="text-align:right"';
          if(img === 'IMG'){
            // 本人で画像
            var log = '<a href="upload/'+log+'" target="_blank"><img src="upload/thumbnail/'+log+'" /></a>';
            return html = '<li class="lir" id="'+hash+'"><p class="name" style="color:'+col1+'">'+name+'/'+good+'Gd</p><p class="logr" style="color:'+col2+'">'+log+'<span'+dstyle+'>'+date+'</span></p></li>';
           }else if(img === 'STAMP'){
            // 本人でスタンプ
            var log = '<img src="stamp/img/'+log+'" />';
            cls = 'li6';
            return html = '<li class="liri" id="'+hash+'"><p class="name" style="color:'+col1+'">'+name+'/'+good+'Gd</p><p class="logr" style="color:'+col2+'">'+log+'<span'+dstyle+'>'+date+'</span></p></li>';
          }else if(img === 'GMAP'){
            // 自分で位置
            var log = '<a href="common/php/gmap.php?map='+log+'" target="_blank">I am here!</a>';
            return html = '<li class="lir" id="'+hash+'"><p class="name" style="color:'+col1+'">'+name+'/'+good+'Gd</p><p class="logr" style="color:'+col2+'">'+log+'<span'+dstyle+'>'+date+'</span></p></li>';
          }else{
            // 自分で発言
            return html = '<li class="lir" id="'+hash+'"><p class="name" style="color:'+col1+'">'+name+'/'+good+'Gd</p><p class="logr" style="color:'+col2+'">'+log+'<span'+dstyle+'>'+date+'</span></p></li>';
          }
        }else{
          // 他人
          if(img === 'IMG'){
            // 他人で画像
            var log = '<a href="upload/'+log+'" target="_blank"><img src="upload/thumbnail/'+log+'" /></a>';
            return html = '<li class="lil" id="'+hash+'"><p class="name" style="color:'+col1+'">'+name+'/'+good+'Gd</p><p class="logl" style="color:'+col2+'">'+log+'<span'+dstyle+'>'+date+'</span></p></li>';
          }else if(img === 'STAMP'){
            // 他人でスタンプ
            var log = '<img src="stamp/img/'+log+'" />';
            return html = '<li class="lili" id="'+hash+'"><p class="name" style="color:'+col1+'">'+name+'/'+good+'Gd</p><p class="logl" style="color:'+col2+'">'+log+'<span'+dstyle+'>'+date+'</span></p></li>';
          }else if(img === 'GMAP'){
            // 他人で位置
            var log = '<a href="common/php/gmap.php?map='+log+'" target="_blank">I am here!</a>';
            return html = '<li class="lil" id="'+hash+'"><p class="name" style="color:'+col1+'">'+name+'/'+good+'Gd</p><p class="logl" style="color:'+col2+'">'+log+'<span'+dstyle+'>'+date+'</span></p></li>';
          }else{
            // 他人で発言
            return html = '<li class="lil" id="'+hash+'"><p class="name" style="color:'+col1+'">'+name+'/'+good+'Gd</p><p class="logl" style="color:'+col2+'">'+log+'<span'+dstyle+'>'+date+'</span></p></li>';
          }
        }
      } 
    }
    $(document).on("click", ".quiz", function () {
      $.confirm({
        title: 'Answer',
        content: '<img src="common/images/planeco-icon-mini.png" width="64"><br><span class="quizans">'+$(this).val()+'</span>',
        buttons: {
          confirm: {
            text: 'CLOSE'
          }
        }
      });
    });

/*****************************************************
 * ログの書き変えと追加
 *****************************************************/
    function readLog(append,len){
      if(!len) len = '';

      if(append == true){
        append = 1;
      }else{
        append = '';
      }
      
    /* 
     * 全ログ書き変えの場合だけ全削除
     *------------------------------------*/
      if(append == ''){
        $('#log ul li').remove();
      }
      var lasthash = $("#log").data('lasthash'); //自分が最後に見たLIのID

      $.ajax({ type: "POST",async:false,url: "common/php/chat.php",data: "mode=readLog&room="+opt.room_id+"&append="+append+"&lasthash="+lasthash+"&len="+len,
          success: function(xml){
            if( $(xml).find("item").length > 0 ){
               $(xml).find("item").each(function(){ 
                 $('#log ul').append( logRow($(this)) );
               });
            }
           //入室していない場合、ログはリロードしない
             if( $.cookie(jquery_chat_name) ) {
                 log_reload();
             }
          }
      });
      
    /* 
     * LI 最後尾のIDを得る
     * このID以降のログを取得することで
     * 最新ログだけを追加していく
     *------------------------------------*/
      var id=null;
      $("#log li").each(function(){
        id= $(this).attr("id");
      });
      $("#log").data('lasthash',id);
    }

/*****************************************************
 * ログのリロード
 *****************************************************/
    var timer_id;
    function log_reload(){
      clearTimeout(timer_id); //setTimeoutは初期化する
      var slide = $("#log").data("slide");
    /* 
     * 最新記事を確認
     *------------------------------------*/
      $.ajax({ type: "POST",async:false,url: "common/php/chat.php",data: "mode=reload&room="+opt.room_id,
          success: function(xml){
            var flag  = $(xml).find("flag").text()|0;
            if(flag === 1) {
              readLog(false,'');
              if(slide === 'on') cs_top();
            }
          }
      });
      
    /* 
     * 指定時間で繰り返し処理
     *------------------------------------*/
      timer_id = setTimeout(function(){
        log_reload();
      },opt.reload);

    }

/*****************************************************
 * エンターキー制御
 * 入室の時は間違ってエンター押すと面倒なので
 * エンターで書き込むのはチャット送信時だけにする
 *****************************************************/
      $("#form").keypress(function(ev) {
        if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
          $("#message").hide();
          if($.cookie(jquery_chat_name)) logWrite(null,null); 
          return false;
        }
      });

/*****************************************************
 * URLぽい文字にリンクタグを
 * http://keicode.com/script/scr18.php
 * メアドは顔文字等で問題が出そうなのでパス
 *****************************************************/
    function getLink(s){
      if(!s){
        return '';
      }
      var re_url = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
      //var re_mail = /((?:\w+\.?)*\w+@(?:\w+\.)+\w+)/gi;
      s = s.replace( re_url, '<a href="$1" target="_blank">$1</a>' );
      //s = s.replace( re_mail, '<a href="mailto:$1">$1</a>');
      return s;
    }

/*****************************************************
 * PCの場合は枠の幅を350pxにする
 *****************************************************/
    function width_change(w){
      var camera = $("#container").width()-45;
      $("#form a").css({"width":camera+'px'});

      if(w > 519){
        $(".pc").css({"width":'350px'});
      }else{
        $(".pc").css({"width":'100%'});
      }
    }

/*****************************************************
 * 下へスライドする
 *****************************************************/
    function cs_top(){
         var pos = $("#end").offset().top; 
         $("html, body").animate({ 
            scrollTop:pos 
         }, 1500, "swing");
//  console.log("cs_top");
    }
    
/*****************************************************
 * 上へスライドする (追加)
 *****************************************************/
    function cs_down(){
         $("html, body").animate({ 
            scrollTop:0 
         }, 100, "swing");
//  console.log("cs_top");
    }

/*****************************************************
 * ファイルアップロード(jQuery_File_Uploadを利用するため完全入れ替え)
 *****************************************************/

    'use strict';
    // Change this to the location of your server-side upload handler:
    var ufilename = ""
    var url = 'common/php/index.php';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
// console.log("index.php");
          $.each(data.result.files, function (index, file) {
            ufilename = file.name;
// console.log(ufilename);
            $('<p/>').text(ufilename).appendTo('#files');
            chatupimg();
          });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
    function chatupimg(){
      $.ajax({ type: "POST",
        url: "common/php/chat.php",
        data: "mode=file&room="+roomid+"&file="+ufilename,
        success: function(xml){
          readLog(true,'');
          cs_top();
        }
      });
    }
    $('#fileupload').bind('fileuploadadd', function (e, data) {
      $.each(data.files, function (index, file) {
      });
    });
    $('#fileupload').bind('fileuploadsubmit', function (e, data) {
      data.formData = {"file" : ufilename};
    });

  /* 
   * サニタイズ
   *------------------------------------*/
    function sanitize(val){
      return $('<div />').text(val).html();
    }

  /* 
   * Themeの設定と変更
   * テーマは全体の背景色と背景画像を指定する事が出来ます。
   * 数を増やした場合はその分だけ以下の設定を変更して下さい。
   * var n = Math.ceil( Math.random()*7 );
   *----------------------------------------------------------------------*/
    function Theme(){
      var Theme = new Array;
      Theme[0] = {'bgcolor':'#BCFFCE' , 'bgimage':'none' };
      Theme[1] = {'bgcolor':'#ffc0cb' , 'bgimage':'none' };
      Theme[2] = {'bgcolor':'#98fb98' , 'bgimage':'none' };
      Theme[3] = {'bgcolor':'#db7093' , 'bgimage':'none' };
      Theme[4] = {'bgcolor':'#a9a9a9' , 'bgimage':'none' };
      Theme[5] = {'bgcolor':'#e6e6fa' , 'bgimage':'none' };
      Theme[6] = {'bgcolor':'#bdb76b' , 'bgimage':'none' };
      Theme[7] = {'bgcolor':'#f0fff0' , 'bgimage':'none' };
      Theme[8] = {'bgcolor':'#778899' , 'bgimage':'none' };
      Theme[9] = {'bgcolor':'#3cb371' , 'bgimage':'none' };
      Theme[10] = {'bgcolor':'#dda0dd' , 'bgimage':'none' };
      Theme[11] = {'bgcolor':'#9370db' , 'bgimage':'none' };
      Theme[12] = {'forbgcolor':'#f0ffff' , 'bgimage':'none' };
      Theme[13] = {'bgcolor':'#800000' , 'bgimage':'none' };
      Theme[14] = {'bgcolor':'#f8e58c' , 'bgimage':'none' };
      var n = Math.ceil( Math.random()*(Theme.length));
      var set_Theme = Theme[n];
      if(!set_Theme) set_Theme = Theme[0];
      if(set_Theme.bgcolor){
        $("body").css({"background-color":set_Theme.bgcolor});
        $("#container").css({"background-color":set_Theme.bgcolor});
      }
      if(set_Theme.bgimage){
        $("#container").css({"background-image":set_Theme.bgimage});
      }
    }
    zIndex = 100;
    var canvas = new fabric.Canvas('cv');
    var selo;
    var rfname;
    var be;
    fabric.Group.prototype.lockScalingX = true;
    fabric.Group.prototype.lockScalingY = true; // グループでスケール禁止
  
    function putbimg(fname){
// console.log("putbimg:", fname);
      fabric.Image.fromURL(fname, function(pe){
        pe.set({selectable: false});
        canvas.add(pe);
        canvas.sendToBack(pe).renderAll();
      },{
        left: 80,
        top: 120,
      });
    }
    function putfimg(fname, lp, tp, ap){
//  console.log("putfimg:", fname);
      fabric.Image.fromURL(fname, function(pe){
        pe.setControlsVisibility({
  mt:false, mb:false, ml:false, mr:false, bl:false, br:false, tl:false, tr:false,
          mtr: true,
        });
        canvas.add(pe);
        canvas.renderAll();
      },{
        cornerSize: 40,
        left: lp,
        top: tp,
        angle: ap,
      });
    }
    function savejsdata(sdata){
      var sdatas = JSON.stringify(sdata);
//  console.log(sdatas);
      $.ajax({
        type:'POST',
        url:'common/php/saveplanet.php',
        contentType: "Content-Type: application/json; charset=UTF-8",
        data: sdatas,
        success: function(){
//  console.log("saveplanet.php");
  	},
      }).fail(function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
      });
    }
    function savedata(ndata){
      var loop = 0;
      var pdata = new Array();
      var cunique = $.cookie(jquery_chat_unique);
      pdata.push({unique:cunique});
      var objs = canvas.getObjects().map(function(o){
        if (o.get("type") == "image"){
  	if(o._originalElement){
            var pdent = new Object();
            var imgsrc = o._originalElement.currentSrc;
            var fname = imgsrc.split('/');
            if(fname[fname.length-3] == "img"){
              pdent.left = o.left;
              pdent.top = o.top;
              pdent.angle = o.angle;
              pdent.img = fname[fname.length-2]+"/"+fname[fname.length-1];
              pdata.push(pdent);
            }
//  console.log(o.get("type"), ",", fname[fname.length-1]);
  	}
        }
        loop++;
      });
      if(ndata){ pdata.push(ndata); }
      savejsdata(pdata);
      return loop;
    }
    function saveimage(){
      var obj = canvas.getActiveObject();
      if(obj){
        obj['hasControls'] = false;
        obj['hasBorders'] = false;
        canvas.renderAll();
      }
      var pcanvas = document.getElementById('cv');
      pcanvas.toBlob(function(blob) {
        saveAs(blob, "yourplanetimage.png");
      },"image/pg");
      if(obj){
        obj['hasControls'] = true;
        obj['hasBorders'] = true;
        canvas.renderAll();
      }
    }
    function uploadimage(){
      var obj = canvas.getActiveObject();
      if(obj){
        obj['hasControls'] = false;
        obj['hasBorders'] = false;
        canvas.renderAll();
      }
      var pcanvas = document.getElementById('cv');
      var uidata = {};
      var canvasData = pcanvas.toDataURL();
      canvasData = canvasData.replace(/^data:image\/png;base64,/, '');
      uidata.image = canvasData;
      if(obj){
        obj['hasControls'] = true;
        obj['hasBorders'] = true;
        canvas.renderAll();
      }
      $.ajax({
        url: 'common/php/upload.php',
        type: 'POST',
        data: uidata,
        success: function(xml) {
//  console.log("upload.php");
          var planetimage = $(xml).find("planetimage").text();
          $.ajax({ type: "POST",
            url: "common/php/chat.php",
            data: "mode=file&room="+roomid+"&file="+planetimage,
            success: function(xml){
//  console.log(planetimage);
            }
          });
        },
        error(jqXHR, textStatus, errorThrown) {
        },
      });
    }
    function redrawjson(rflag){
      $.getJSON(rfname+"?"+(new Date().getTime()), function(da) {
//  console.log("json:",rfname);
        var len = da.length;
        if((len <= 1)&&(rflag == true)){
//  console.log("no data:"+rfname);
          putbimg('common/images/nodata.png');
        }else{
          putbimg('common/images/originalplanet.png');
          for(var i=1; i<len; i++){
            putfimg('img/'+da[i].img, da[i].left, da[i].top, da[i].angle);
            var sfname = da[i].img.split('/');
            allcost += parseInt(sfname[sfname.length-2].substr(1));
            allitem++;
          }
        }
      }).fail(function() {
        if(rflag == false){
          putbimg('common/images/originalplanet.png');
        }else{
//  console.log("no file:"+rfname);
          putbimg('common/images/nodata.png');
        }
      });
    }
    function redraw(rflag){
      canvas.clear();
      allcost = 0;
      if($.cookie(jquery_chat_unique) !== 'undefined'){
        rfname = "save/planet"+$.cookie(jquery_chat_unique)+".json";
          $.when(redrawjson(rflag)).done(function() {
//  console.log("redraw-fin");
        });
      }
    }
    canvas.on("object:selected", function(e){
      selo = e;
    });
    canvas.on('object:moving', function (e){
      var obj = e.target;
      if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
          return;
      }
      obj.setCoords();
      if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
        obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
      }
      if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
        obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
        obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
      }
    });
    $('#ToTop').on('click', function () {
      if(selo){
        var filter = new fabric.Image.filters.Invert();
        selo.target.filters.push(filter);
        selo.target.applyFilters();
        selo.target.bringToFront();
        canvas.renderAll();
        setTimeout(function invani(){
          filter = new fabric.Image.filters.Invert();
          selo.target.filters.push(filter);
          selo.target.applyFilters();
          canvas.renderAll();},200);
      }
    });
    $('#SavePlanet').on('click', function () {
      savedata();
      $('#planetmessage').text("Planet saved");
      setTimeout(function(){
        $('#planetmessage').text("");
      },2000);
    });
    $('#PlanetImage').on('click', function () {
      saveimage();
    });
    $('#PlanetUpload').on('click', function () {
      uploadimage();
      $('#planetmessage').text("Planet image uploaded");
      setTimeout(function(){
        $('#planetmessage').text("");
      },2000);
    });
    $mc = $('#fileswin').masonry({
      itemSelector: '.item',
    });
    function setbtn(val){
      $('#'+val).on('click', function () {
//  console.log("Called");
        $mc.masonry('remove', $mc.find('.item')).masonry('layout');
        $.getJSON("img/"+val+"/files.json"+"?"+(new Date().getTime()), function(data) {
//  console.log("OK load");
          $.each(data, function(){
  		  var $item = $('<div class="item"><img src="img/'+val+'/'+this+'"/></div>');
            $mc.append($item).masonry('appended', $item).masonry('layout');
          })
        })
      });
    }
    ['p1','p5','p10','p15','p30','p50','p60','p75','p100','p300','p500','p1200'].map(function(o) { setbtn(o); });
    $mc.on('click', '.item', function(event) {
      if(imgsrc = event.target.src){
        var fname = imgsrc.split('/');
        var filen = fname[fname.length-2]+'/'+fname[fname.length-1];
//  console.log(filen);
        var pdent = new Object();
        pdent.left = 64;
        pdent.top = 64;
        pdent.angle = 0;
        pdent.img = filen;
        var sfname = filen.split('/');
        var tp = parseInt(sfname[sfname.length-2].substr(1));
        if(parseInt(allcost)+parseInt(tp) > allgood){
          $('#nurturemessage').text("Shortage of points....");
          setTimeout(function(){
            $('#nurturemessage').text("");
          },2000);
        }else{
//  console.log("allcost:"+allcost);
          if(parseInt(allcost) == 0){
            redraw(false);
          }
          allcost += tp;
          allitem++;
          putfimg('img/'+filen, 64, 64, 0);
          savedata(pdent);
  	$('#allcostp').text(allcost);
  	$('#allitemp').text(allitem);
          $('#nurturemessage').text("Let's arrange the new item on your planet!");
          setTimeout(function(){
            $('#nurturemessage').text("");
          },2000);
        }
      };
    });
    $(document).ready(function(){
      redraw(true);
    });
    $('#lg_left').on('click', function () {
      $.confirm({
        title: 'Chat Room Selection',
        content: '<img src="common/images/planeco-icon-mini.png" width="64"><br><span class="quizans">'+opt.chatroom+'</span>',
        buttons: {
          cancel: function () {
            text: 'Dismiss'
          },
        }
      });
    });
  };
})(jQuery);
