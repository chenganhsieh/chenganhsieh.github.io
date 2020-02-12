class girlfriend {
    constructor() {
        //起始位置
        this.r = 100; //物體的邊長
        this.x = width;
        this.y = height - this.r;

    }
    move() {
        // move會在sketch裡面不斷執行類似for迴圈
        //這裡要一直更新他的y軸速度，包含重力以及速度
        this.x -= 8; //給向上速度
        this.y = constrain(this.y, 0, height - this.r);

    }
    show() {
        image(gImg, this.x, this.y, this.r, this.r); //圖片/起始x/起始y/大小

    }
}