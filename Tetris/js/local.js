var Local = function() {
    //游戏对象
    var game;
    //时间间隔
    var INTERVAL = 250;
    //定时器
    var timer = null;
    //时间计数器
    var timeCount = 0;
    //时间
    var time = 0;
    //绑定键盘事件
    var bindKeyEvent = function() {
        document.onkeydown = function(e) {
            if(e.keyCode == 38){ //up
            game.rotate();
            }else if(e.keyCode == 39){ //right
            game.right();
            }else if(e.keyCode == 40){ //down
             game.down();
            }else if(e.keyCode == 37){ //left
            game.left();
            }else if(e.keyCode == 32){ //空格键space
            game.fall();
            }
        }
    }
    //移动
    var move =function() {
        timeFunc();
        if(!game.down()){
            game.fixed();
            var line = game.checkClear();
            if(line) {
                game.addScore(line);  //有消得行就加分
            }
            var gameOver = game.checkGameOver();
            if(gameOver) {
                game.gameover(false);
                stop();
            }else{
                game.performNext(generateType(),generateDir());
            }
        }
    }
    //随机生成干扰行
    var generataBottomLine = function(lineNum) {
        var lines =[];  //二维数组
        for(var i=0;i<lineNum;i++){
            var line =[];
            for(var j=0;j<10;j++) {  //每行10个方块
                line.push(Math.ceil(Math.random()*2)-1);  //生成01随机数
            }
            lines.push(line); //把line放到lines里面
        }
        return lines;
    }
    //计时函数
    var timeFunc = function() {
        timeCount = timeCount + 1;
        if(timeCount == 4) {   //达1S
            timeCount = 0;
            time = time + 1;
            game.setTime(time);  //显示在屏幕
            if(time % 10 == 0){
                game.addTailLines(generataBottomLine(1));
            }
        }
    }
    //随机生成一个方块种类
    var generateType = function() {
        return Math.ceil(Math.random() * 7) - 1; //0-6的整数
    }
    //随机生成一个旋转次数
    var generateDir = function() {
        return Math.ceil(Math.random() * 4) - 1; //0-3的整数
    }
    //开始
    var start = function() {
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next'),
            timeDiv: document.getElementById('time'),
            scoreDiv: document.getElementById('score'),
            resultDiv: document.getElementById('gameover')

        }
        game = new Game();
        game.init(doms, generateType(), generateDir());
        bindKeyEvent();
        game.performNext(generateType(), generateDir());
        timer = setInterval(move, INTERVAL);
    }
    //结束
    var stop = function() {
        if(timer) {
            clearInterval(timer);
            timer = null;       //关计时器
        }
        document.onkeydown = null;  //关键盘事件
    }
    //导出API
    this.start = start;
}