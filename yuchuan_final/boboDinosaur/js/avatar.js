class avatar {
    constructor() {
        //起始位置
        this.r = 150; //物體的邊長
        this.x = 50; //起始位置x
        this.y = height - this.r; //起始位置y
        // 初速度(y方向)
        this.vy = 0;
        //重力 讓恐龍掉下來
        this.gravity = 0.5;

    }
    jump() {
        if (this.y == height - this.r) { //只有在地板時可以跳
            this.vy = -15;
        }
    }

    hits(girlfriend) {
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = girlfriend.x + girlfriend.r * 0.5;
        let y2 = girlfriend.y + girlfriend.r * 0.5;
        return collideCircleCircle(x1, y1, this.r, x2, y2, girlfriend.r);
    }
    hits(money) {
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = money.x + money.r * 0.5;
        let y2 = money.y + money.r * 0.5;
        return collideCircleCircle(x1, y1, this.r, x2, y2, money.r);
    }
    move() {
        // move會在sketch裡面不斷執行類似for迴圈
        //這裡要一直更新他的y軸速度，包含重力以及速度
        this.y += this.vy; //給向上速度
        this.vy += this.gravity; //改成下降的速度
        //這裡避免掉出邊界
        this.y = constrain(this.y, 0, height - this.r); //上下邊界 之所以要剪掉this.r是因為以正方體的底部為基準
    }
    show() {
        image(aImg, this.x, this.y, this.r, this.r); //圖片/起始x/起始y/大小

    }
}