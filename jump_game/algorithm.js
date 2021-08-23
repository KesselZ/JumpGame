
    var myMaps = ['0', '1','2','3','4','5'];  //地图编号（需手动添加）
    var which_sky = 0;       //因为背景是sky1和2之间切换，此变量用于决定ramdom场景该切换哪个sky了

    //地图变化所需要的阈值
    var first_change=200;
    var each_change=300;
    var map_num=myMaps.length;


    var isjumping = 0;
    var fps = 60;
    var i = 0;
    var o = 1;
    var obs_loca_1 = -10;
    var obs_loca_2 = -10;
    var obs_loca_3 = -10;
    var obs_loca_4 = -10;
    var obs_loca_5 = -10;
    var fps = 60;
    var nowismoving = 0;
    var score = -1;
    var debug = 0;
    var speed = 1;
    var jump_speed = 10 * 11;
    var gravity = 9.8 * 40;
    var space = 1;
    var ground_location = 25;
    var obs_color = "black";
    var skyusing = 1;
    var phone;
    /*function hengshuping() {
       if (window.orientation == 180 || window.orientation == 0) {
           alert("竖屏状态！")
       }
       if (window.orientation == 90 || window.orientation == -90) {
           alert("横屏状态！")
      }
   }

  window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false); */

    if (isjumping == 0) {  //如果不在跳跃种
        document.onkeydown = function (e) {
            var e = window.event ? window.event : e;   //检测空格触发跳跃
            var flag = false;
            if (e.keyCode == 32) {
                if (flag) {
                    return;
                }
                flag = true;
                if (isjumping == 1) jump2();
                if (isjumping == 0) changeLink();


            }

        }
    }

    function touch_jump() {
        if (isjumping == 1) jump2();
        if (isjumping == 0) changeLink();

    }


    ///////////////////////////////////////////////////////////////////////跳跃函数

    function changeLink() {

        isjumping = 1;  //我开始跳跃了

        var location = ground_location;
        var jump = setInterval(function () {
            jump_once()
        }, 1000 / fps);  //循环函数


        var ori_location = ground_location;


        function jump_once() {     //跳跃一次
            document.getElementById('man').style.bottom = location + "%";
            location = location + jump_speed / fps;
            jump_speed = jump_speed - gravity / fps;
            if (location <= 24) {
                document.getElementById('man').style.bottom = ground_location + "%";
                jump_speed = 10 * 11;
                gravity = 9.8 * 40;
                clearInterval(jump);
                isjumping = 0;
            }
        }
    }

    function jump2() {

        jump_speed = 10 * 12;
        isjumping = 2;

    }


    ///////////////////////////////////////////////////////////////////////障碍物产生timeout
    function obs_timeout() {
        obstacles();

        meter1 = setTimeout("obs_timeout()", (2000 / speed) / space);
    }

    obs_timeout();


    ///////////////////////////////////////////////////////////////////////障碍物产生


    function obstacles() {
        //参数

        var obs_array = new Array();
        var height_array = new Array();
        var right_array = new Array();


        function obstacles_once() {    //产生
            i++;

            height_array[i] = Math.random() * 6 + 8;
            obs_array[i] = document.createElement('div');
            document.getElementById("obs_id").appendChild(obs_array[i]);
            obs_array[i].style.background = "black";
            obs_array[i].style.width = 2 + "%";
            obs_array[i].style.height = height_array[i] + "%";
            obs_array[i].style.position = "absolute";
            obs_array[i].style.bottom = ground_location + "%";
            obs_array[i].style.right = -10 + "%";
            obs_array[i].setAttribute('id', 'box' + i);
            obs_array[i].setAttribute('class', 'allbox');


        }

        obstacles_once();

    }

    /////////////////////////////////////////////////////////////////////////障碍物移动timeout
    function obs_move_timeout() {
        nowismoving++;
        changeColor(obs_color, nowismoving);
        if (nowismoving % 5 == 1) obs_move_1(nowismoving);
        if (nowismoving % 5 == 2) obs_move_2(nowismoving);
        if (nowismoving % 5 == 3) obs_move_3(nowismoving);
        if (nowismoving % 5 == 4) obs_move_4(nowismoving);
        if (nowismoving % 5 == 0) obs_move_5(nowismoving);

        meter1 = setTimeout("obs_move_timeout()", (2000 / speed) / space);
    }

    setTimeout("obs_move_timeout()", 2000);


    ///////////////////////////////////////////////////////////////////////////五线程移动代码
    function obs_move_1(num) {

        var move_1 = setInterval(function () {
            obs_move_once_1(num)
        }, 1000 / fps);

        function obs_move_once_1(num) {
            obs_loca_1 = obs_loca_1 + 0.5 * speed;
            document.getElementById('box' + num).style.right = obs_loca_1 + "%";


            if (obs_loca_1 < 80 && obs_loca_1 > 77) {
                if (parseFloat(toPoint(document.getElementById('box' + num).style.height)) + ground_location > parseFloat(toPoint(document.getElementById('man').style.bottom)))
                    //如果在77-80时，man低于obs（碰撞），则：
                {
                    gameover();
                }
            }     //游戏结束

            if (obs_loca_1 >= 105) {
                clearInterval(move_1);
                obs_loca_1 = -10;
            }              //移动出了屏幕则停止此线程

        }
    }

    function obs_move_2(num) {
        var debug_2 = 0;
        var move_2 = setInterval(function () {
            obs_move_once_2(num)
        }, 1000 / fps);

        function obs_move_once_2(num) {
            obs_loca_2 = obs_loca_2 + 0.5 * speed;
            document.getElementById('box' + num).style.right = obs_loca_2 + "%";

            if (obs_loca_2 < 80 && obs_loca_2 > 77) {
                if (parseFloat(toPoint(document.getElementById('box' + num).style.height)) + ground_location > parseFloat(toPoint(document.getElementById('man').style.bottom))) {
                    gameover();
                }
            }

            if (obs_loca_2 >= 105) {
                clearInterval(move_2);
                obs_loca_2 = -10;
            }
        }
    }

    function obs_move_3(num) {

        var move_3 = setInterval(function () {
            obs_move_once_3(num)
        }, 1000 / fps);

        function obs_move_once_3(num) {
            obs_loca_3 = obs_loca_3 + 0.5 * speed;
            document.getElementById('box' + num).style.right = obs_loca_3 + "%";


            if (obs_loca_3 < 80 && obs_loca_3 > 77) {
                if (parseFloat(toPoint(document.getElementById('box' + num).style.height)) + ground_location > parseFloat(toPoint(document.getElementById('man').style.bottom))) {
                    gameover();
                }
            }

            if (obs_loca_3 >= 105) {
                clearInterval(move_3);
                obs_loca_3 = -10;
            }
        }
    }

    function obs_move_4(num) {

        var move_4 = setInterval(function () {
            obs_move_once_4(num)
        }, 1000 / fps);

        function obs_move_once_4(num) {
            obs_loca_4 = obs_loca_4 + 0.5 * speed;
            document.getElementById('box' + num).style.right = obs_loca_4 + "%";


            if (obs_loca_4 < 80 && obs_loca_4 > 77) {
                if (parseFloat(toPoint(document.getElementById('box' + num).style.height)) + ground_location > parseFloat(toPoint(document.getElementById('man').style.bottom)))
                    //如果在77-80时，man低于obs（碰撞），则：
                {
                    gameover();
                }
            }     //游戏结束

            if (obs_loca_4 >= 105) {
                clearInterval(move_4);
                obs_loca_4 = -10;
            }              //移动出了屏幕则停止此线程

        }
    }

    function obs_move_5(num) {

        var move_5 = setInterval(function () {
            obs_move_once_5(num)
        }, 1000 / fps);

        function obs_move_once_5(num) {
            obs_loca_5 = obs_loca_5 + 0.5 * speed;
            document.getElementById('box' + num).style.right = obs_loca_5 + "%";


            if (obs_loca_5 < 80 && obs_loca_5 > 77) {
                if (parseFloat(toPoint(document.getElementById('box' + num).style.height)) + ground_location > parseFloat(toPoint(document.getElementById('man').style.bottom)))
                    //如果在77-80时，man低于obs（碰撞），则：
                {
                    gameover();
                }
            }     //游戏结束

            if (obs_loca_5 >= 105) {
                clearInterval(move_5);
                obs_loca_5 = -10;
            }              //移动出了屏幕则停止此线程

        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////杂项
    function toPoint(percent) {
        var str = percent.replace("%", "");                              //百分比to小数转换器
        return parseFloat(str);
    }


    function pause() {
        alert("-STOP- \n tap to continue");                          //游戏暂停
    }


    function gameover() {
        debug++;
        if (debug <= 1) {
            alert("你没了，重新开始吧");
        }
        window.location.reload(true);
        return;                                                       //游戏结束
    }

    function changeColor(color, num) {
        if (color.length < 8 || color.indexOf('rgb')!=-1) document.getElementById('box' + num).style.background = color;         //如果长度为8以下，判定为普通颜色，否则应该是一个渐变颜色
        else document.getElementById('box' + num).style.backgroundImage = 'linear-gradient(' + color + ')';
    }


    function phoneTest() {
        var phone = document.getElementById("phonetest").style.height;

        //if(document.getElementById("phonetest").style.transition==0.1)  alert("shoujiba");


        setTimeout("phoneTest()", 100);
    }

    setTimeout("phoneTest()", 20);


    function randomNum(minNum, maxNum) {                         //生成从minNum到maxNum的随机数
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }


    ////////////////////////////////////////////////////////////////////////分数计算器
    function score_timeout() {
        score = score + 1;


        if (speed < 2.5) speed = 1 + score / 1000;        //加分速度控制器
        space = Math.random() * 0.4 + 0.9;                    //障碍物之间距离控制器
        if (space >= 1.26) space = 4 + Math.random();      //连续障碍物生成器
        if (score == 5) come_xinshoucun();               //场景变换需要的分数（阈值）
        if (score == first_change) choose_a_map();
        if ((score - first_change) % each_change === 0 && score > first_change+10 && score < first_change+each_change*map_num-10) choose_a_map();
        //
        document.getElementById("score").innerHTML = score;  //分数显示器
        setTimeout(" score_timeout()", 80);
    }

    score_timeout();

    ///////////////////////////////////////////////////////////////////////////////////////分数与场景变换提示字,所有场景数据库
    function come_xinshoucun() {
        show_map_name("新手村");

    }

    function choose_a_map() {  //随机选择地图的分配器
        var chosen = myMaps.splice(randomNum(0, myMaps.length - 1), 1);
        switch (parseInt(chosen)) {
            case 0:
                come_huoshan_0();
                break;
            case 1:
                come_bingchuan_1();
                break;
            case 2:
                come_conglin_2();
                break;
            case 3:
                come_caoyuan_3();
                break;
            case 4:
                come_mudi_4();
                break;
            case 5:
                come_xiyang_5();
                break;
            default:
                come_huangyuan();
        }

    }

    function come_huoshan_0() {
        obs_color = "#ffa000,#722001,#6D2101";
        if (which_sky % 2 == 0) {
            document.getElementById('sky2').style.backgroundImage = 'linear-gradient(#860B0B,#B32020,#F04B00,#00b336)';
            document.getElementById('sky1').style.opacity = 0;
            document.getElementById('sky2').style.opacity = 1;
        } else {
            document.getElementById('sky1').style.backgroundImage = 'linear-gradient(#860B0B,#B32020,#F04B00,#00b336)';
            document.getElementById('sky1').style.opacity = 1;
            document.getElementById('sky2').style.opacity = 0;
        }
        which_sky++;
        setTimeout(" document.getElementById('ground').style.background='#5F1C00';", 1000);
        setTimeout(" show_map_name('火山');", 3000);

    }

    function come_bingchuan_1() {

        obs_color = "#04e5fd";
        if (which_sky % 2 == 0) {
            document.getElementById('sky2').style.backgroundImage = 'linear-gradient(#91e8ff,#91e8ff,#91e8ff,#91fff6,#91fff6,#91fff6)';
            document.getElementById('sky1').style.opacity = 0;
            document.getElementById('sky2').style.opacity = 1;
        } else {
            document.getElementById('sky1').style.backgroundImage = 'linear-gradient(#91e8ff,#91e8ff,#91e8ff,#91fff6,#91fff6,#91fff6)';
            document.getElementById('sky1').style.opacity = 1;
            document.getElementById('sky2').style.opacity = 0;
        }
        which_sky++;
        setTimeout(" document.getElementById('ground').style.background='#00A6D1';", 1000);
        setTimeout(" show_map_name('冰川');", 3000);
    }

    function come_conglin_2() {

        obs_color = "#8F5E0A";
        if (which_sky % 2 == 0) {
            document.getElementById('sky2').style.backgroundImage = 'linear-gradient(#A1DDF7,#A1DDF7,#158427)';
            document.getElementById('sky1').style.opacity = 0;
            document.getElementById('sky2').style.opacity = 1;
        } else {
            document.getElementById('sky1').style.backgroundImage = 'linear-gradient(#A1DDF7,#A1DDF7,#158427)';
            document.getElementById('sky1').style.opacity = 1;
            document.getElementById('sky2').style.opacity = 0;
        }
        which_sky++;
        setTimeout(" document.getElementById('ground').style.background='#186209';", 1000);
        setTimeout(" show_map_name('丛林');", 3000);
    }

    function come_caoyuan_3() {

        obs_color = "#E3E3E3";
        if (which_sky % 2 === 0) {
            document.getElementById('sky2').style.backgroundImage = 'linear-gradient(#005DD6,#b3e2ff,#FFFFFF,#00b336)';
            document.getElementById('sky1').style.opacity = 0;
            document.getElementById('sky2').style.opacity = 1;
        } else {
            document.getElementById('sky1').style.backgroundImage = 'linear-gradient(#005DD6,#b3e2ff,#FFFFFF,#00b336)';
            document.getElementById('sky1').style.opacity = 1;
            document.getElementById('sky2').style.opacity = 0;
        }
        which_sky++;
        setTimeout(" document.getElementById('ground').style.background='#63cf6a';", 1000);
        setTimeout(" show_map_name('草原');", 3000);
    }

    function come_mudi_4() {
        obs_color = "rgba(210,210,210,0.29)";
        if (which_sky % 2 == 0) {
            document.getElementById('sky2').style.backgroundImage = 'linear-gradient(#00111D,#001C31,#00243f,#747474,#747474)';
            document.getElementById('sky1').style.opacity = 0;
            document.getElementById('sky2').style.opacity = 1;
        } else {
            document.getElementById('sky1').style.backgroundImage = 'linear-gradient(#00111D,#001C31,#00243f,#747474,#747474)';
            document.getElementById('sky1').style.opacity = 1;
            document.getElementById('sky2').style.opacity = 0;
        }
        which_sky++;
        setTimeout(" document.getElementById('ground').style.background='#000614';", 1000);
        setTimeout(" show_map_name('墓地');", 3000);

    }

    function come_xiyang_5() {
        obs_color = "90deg,#BE3A00,#BE3A00,#f38800";
        if (which_sky % 2 == 0) {
            document.getElementById('sky2').style.backgroundImage = 'linear-gradient(140deg,#CC1500,#fd8302,yellow)';
            document.getElementById('sky1').style.opacity = 0;
            document.getElementById('sky2').style.opacity = 1;
        } else {
            document.getElementById('sky1').style.backgroundImage = 'linear-gradient(#00111D,#001C31,#00243f,#747474,#747474)';
            document.getElementById('sky1').style.opacity = 1;
            document.getElementById('sky2').style.opacity = 0;
        }
        which_sky++;
        setTimeout(" document.getElementById('ground').style.background='#BE3A00';", 1000);
        setTimeout(" show_map_name('夕阳');", 3000);

    }

    function come_huangyuan() {

        obs_color = "#855B2F";
        if (which_sky % 2 == 0) {
            document.getElementById('sky2').style.backgroundImage = 'linear-gradient(#1c618a,#42637e,#58788d,#7e8b94,#6E6E6E)';
            document.getElementById('sky1').style.opacity = 0;
            document.getElementById('sky2').style.opacity = 1;
        } else {
            document.getElementById('sky1').style.backgroundImage = 'linear-gradient(#54afeb,#75b6db,#f6faff,#ffffff)';
            document.getElementById('sky1').style.opacity = 1;
            document.getElementById('sky2').style.opacity = 0;
        }
        which_sky++;
        setTimeout(" document.getElementById('ground').style.background='#855B2F';", 1000);
        setTimeout(" show_map_name('荒原');", 3000);
    }
    ////////////////////////////////////////////////////////////////////////////////地图名字显示
    function show_map_name(name) {
        document.getElementById("map_name").innerHTML = name;
        document.getElementById("map_name").style.opacity = 1;
        setTimeout("show_map_name_back()", 1500);
    }

    function show_map_name_back() {
        document.getElementById("map_name").style.opacity = 0;
    }

    /////////////////////////////////////////////////////////////////////////////////////// 场景移动模块
    /*
    场景1：镜头前遮挡物
    场景2：地板上遮挡物
    场景3：地板上遮挡物的背景
    场景4：近处背景
    场景5：远处背景
    场景6：整体背景
    */

