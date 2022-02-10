var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
	// 서버의 설정된 endPoint값과 동일하게 설정
    var socket = new SockJS('/happy-ant-websocket');
    stompClient = Stomp.over(socket);
    console.log('stompClient : ', stompClient);
    let userId = 1
    // 접속 성공하면 2번째 매개값인 콜백함수 실행
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        // 서버측에서 메시지가 전달되면 콜백으로 구현
        console.log($("#userId").val());
        stompClient.subscribe('/alert/' + $("#userId").val(), function (msg) {
        	console.log(msg)
        	// JSON.parse: json 문자열을 js객체로 리턴하는 메서드
            showGreeting(JSON.parse(msg.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/" + $("#userId").val(), {},JSON.stringify({'content': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

