let avatarRole; //你的小恐龍就是這個變數，取自avatar這個js
let aImg;
let bImg;
let gImg;
let mImg;
let girlFriends = []
let moneys = []
let x1 = 0;
let x2;
var scrollSpeed = 3;
var nav_bar = document.getElementById("nav-bar");
var start = document.getElementById("start");
var restart = document.getElementById("restart");
var user_score = document.getElementById("user-score");
var startBoolean = false;
var score = 0;
var timer;
//girlFriend
var timer_girlFriend;
let girlfriend_showup = [1000, 1400, 1600, 1800];
let randsecond = 0;

$("#restart").hide();



//setup 跟draw都是p5.js的功能，setup是前處理，draw是前處裡玩，會渲染網頁
function setup() {
    var cnv = createCanvas(window.innerWidth, window.innerHeight - nav_bar.offsetHeight - 5);
    cnv.parent('sketch-holder');
    avatarRole = new avatar();
    x2 = width;
}

function preload() {
    aImg = loadImage("https://i.imgur.com/9HBSPkw.png");
    bImg = loadImage("https://i.imgur.com/98p2aPk.jpg");
    gImg = loadImage("https://i.imgur.com/6C7aKDQ.png");
    mImg = loadImage("https://i.imgur.com/6C7aKDQ.png");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight - nav_bar.offsetHeight - 5);
}

function draw() {

    image(bImg, x1, 0, width, height);
    image(bImg, x2, 0, width, height);


    if (x1 < -width) {
        x1 = width;
    }
    if (x2 < -width) {
        x2 = width;
    }
    avatarRole.show();

    if (startBoolean) {
        //背景圖移動
        x1 -= scrollSpeed;
        x2 -= scrollSpeed;
        var timeElapsed_girFriend = millis() - timer_girlFriend;
        if (timeElapsed_girFriend > randsecond) {
            var temp = getRandomInt(0, 1);
            if (temp == 0) {
                girlFriends.push(new girlfriend());
            } else {
                moneys.push(new money());
            }
            timer_girlFriend = millis();
            randsecond = girlfriend_showup[Math.floor(Math.random() * girlfriend_showup.length)];
        }

        //敵人移動
        for (let t of girlFriends) {
            t.move();
            t.show();
            if (avatarRole.hits(t)) {
                console.log("game over");
                startBoolean = false;
                noLoop();
                $("#restart").show();
                girlFriends = [];
                girlfriend_showup = [1000, 1400, 1600, 1800];
            }
        }
        //money移動
        for (let t of moneys) {
            t.move();
            t.show();
            if (avatarRole.hits(t)) {
                score += 50;
                moneys.shift(); //remove one element
            }
        }

        //主角移動
        avatarRole.move();

        //分數
        var timeElapsed = millis() - timer;
        if (timeElapsed > 100) {
            score++;
            pad(score, 5);
            if (score % 100 == 0) {
                girlfriend_showup = girlfriend_showup.map(function(value) {
                    return value - 100;
                });
                console.log(girlfriend_showup)
            }
            timer = millis();
        }
    }
}
//當網頁ready後，需要執行的事情 //這是jquery
$(document).ready(function() {
    $(document).on('keypress', function(e) {
        //哪一個按鍵被按下，要讓腳色跳，space編號是32
        if (e.which == 32) {
            avatarRole.jump();
        }
    });
    $("#sketch-holder").on('click', function(e) {
        //哪一個按鍵被按下，要讓腳色跳，space編號是32

        avatarRole.jump();

    });
    $("#start").click(function() {
        score = 0;
        timer = millis() - 100;

        timer_girlFriend = millis();
        // randsecond = timer_girlFriend[Math.floor(Math.random() * timer_girlFriend.length)];

        startBoolean = true;
        $("#start").hide();
    });
    $("#restart").click(function() {
        timer = millis() - 100;
        score = 0;
        startBoolean = true;
        $("#restart").hide();
        loop();
    });



});

//讓分數前面有0
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    user_score.innerHTML = s;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}