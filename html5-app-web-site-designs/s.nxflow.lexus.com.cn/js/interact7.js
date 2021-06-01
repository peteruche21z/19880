$(function(){

    var win = $(window);
    var screenWidth = win.width();
    var screenHeight = win.height();
    var isAndroid = navigator.userAgent.indexOf('Android') > -1;

    var scripts = {
        'part7': function(){
            var documentNode = $(document);
            var containerNode = $('.part7 .container');
            var viewNode = $('.viewport');
            var containerOffsetY;
            var bg = $('.part7 .bg');
            var bg2 = $('.part7 .bg2');
            var txt_01 = $('.part7 .txt_01');
            var txt_02 = $('.part7 .txt_02');
            var txt_03 = $('.part7 .txt_03');
            var txt_04 = $('.part7 .txt_04');
            var bags = $('.part7 .b');
            var bag1 = $('.part7 .b1');
            var bag2 = $('.part7 .b2');
            var bag3 = $('.part7 .b3');
            var bag4 = $('.part7 .b4');
            var circle_tip = $('.part7 .circle_tip');
            var step = 0;
            var bagCount = 0;
            var clickCount = 0;

            init();
            function init(){
                documentNode.off('touchstart').on('touchstart', startHandle);
                TweenLite.to($('.spinners'), 0.4, {opacity:0, onComplete:function(){
                    $('.spinners').remove();
                }});
                $('.part7').show();

                containerOffsetY = -(568 * utils.globalScale - $(window).height()) / 2;
                TweenLite.set(containerNode, {y:containerOffsetY});
                TweenLite.set(containerNode, {scale:$(window).width() / 320});
                TweenLite.set(viewNode,{display:'block',opacity:0});
                TweenLite.to(viewNode,0.6,{opacity:1, ease:Power1.easeInOut, onComplete:function(){

                    magicShow(txt_01, function(){
                        TweenLite.set(circle_tip, {x:0, left:'67%', top:'52%', opacity:0, scale:1.1});
                        TweenLite.to(circle_tip, 0.6, {opacity:1, scale:0.9});
                        TweenMax.to(circle_tip, 0.6, {scale:1.1, yoyo: true, repeat:-1, delay: 0.6, ease:Power1.easeInOut});
                        step = 1;
                    }, 2, 1)

                }});
                TweenLite.set(bg2, {display:'block', opacity:0});
                TweenLite.set(bags, {display:'none', opacity:0});
                TweenLite.set(bag1, {display:'none', opacity:0});
                TweenLite.set(bag2, {display:'none', opacity:0});
                TweenLite.set(bag3, {display:'none', opacity:0});
                TweenLite.set(bag4, {display:'none', opacity:0});

            }

            function startHandle(e){
                e.preventDefault();
                switch (step){
                    case 1:
                        TweenLite.killTweensOf(circle_tip);
                        TweenLite.to(circle_tip, 0.5, {opacity:0});
                        TweenLite.to(txt_01, 0.5, {opacity:0});
                        TweenLite.set(bg2, {display:'block'});
                        TweenLite.to(bg2, 0.6, {opacity:1, onComplete: function(){
                            TweenLite.set(bg, {display:'none'});
                            magicShow(txt_02, function moveCir(){

                            }, 1.5);
                            step = 3;
                        }});

                        TweenLite.set(bags.eq(0), {x:95/2+26, y:715/2+51, display:'block', opacity:0});
                        TweenLite.set(bags.eq(1), {x:215/2+26, y:715/2+51, display:'block', opacity:0});
                        TweenLite.set(bags.eq(2), {x:335/2+26, y:715/2+51, display:'block', opacity:0});
                        TweenLite.set(bags.eq(3), {x:455/2+26, y:715/2+51, display:'block', opacity:0});
                        TweenLite.to(bags.eq(0), 1, {opacity:1, delay:0.1});
                        TweenLite.to(bags.eq(1), 1, {opacity:1, delay:0.2});
                        TweenLite.to(bags.eq(2), 1, {opacity:1, delay:0.3});
                        TweenLite.to(bags.eq(3), 1, {opacity:1, delay:0.4});

                        bags.each(function(index, obj){
                            $(obj).on('touchend', function(){
                                var bag = $(this);
                                if (bag.isActive){return;}
                                bag.isActive = true;
                                clickCount++;
                                var x = 80 + Math.random()*160;
                                var y = 180 + Math.random()*40;
//                                TweenLite.to(bag, 1, {x:x, rotationZ:[810,-810,450,-450,630,-630][Math.floor(Math.random()*6)]});
//                                TweenLite.to(bag, 1, {y:y, ease:Back.easeOut});
                                TweenLite.to(bag, 0.4, {opacity:0, delay: 0.6-0.6, onStart:function(){
                                    addOne();
                                }});
                                if (clickCount > 3){
                                    TweenLite.to(txt_02, 0.5, {opacity:0});
                                }
                            });
                        });

                        step = 2;
                        break;
                    case 4:
                        TweenLite.to(viewNode,1,{opacity:0, ease:Power2.easeInOut, onComplete:function(){
                            //TODO
                            $('.part7').remove();
                            reload();
                        }});
                        step = 5;

                        break;

                }

                function addOne(){
                    bagCount++;
                    if (bagCount == 1){
                        TweenLite.set(bag1, {display:'block', opacity:0});
                        TweenLite.to(bag1, 1, {opacity:1});
                    }
                    if (bagCount == 2){
                        TweenLite.set(bag2, {display:'block', opacity:0});
                        TweenLite.to(bag2, 1, {opacity:1});
                    }
                    if (bagCount == 3){
                        TweenLite.set(bag3, {display:'block', opacity:0});
                        TweenLite.to(bag3, 1, {opacity:1});
                    }
                    if (bagCount == 4){
                        TweenLite.set(bag4, {display:'block', opacity:0});
                        TweenLite.to(bag4, 1, {opacity:1, onComplete:function(){
                            TweenLite.to(txt_02, 0.5, {opacity:0});
                            magicShow(txt_03, function moveCir(){
                                step = 4;
                            }, 1.5);
                            magicShow(txt_04, function moveCir(){
                                step = 4;
                            }, 1.5);
                        }});
                    }

                }
            }
        }

    };


    function init(){

//        var list = $('<ul>' +
//            '<li></li>' +
//            '<li></li>' +
//            '<li></li>' +
//            '<li></li>' +
//            '<li></li>' +
//            '<li></li>' +
//            '<li></li>' +
//            '</ul>');
//        $('.spinners p').html('').append(list);
//
//        $('.spinners p ul li').eq(0).html('轻触演示小动：刻画NX').on('touchstart', function(){scripts.part1();});
//        $('.spinners p ul li').eq(1).html('轻触演示小动：开启虫洞').on('touchstart', function(){scripts.part2();});
//        $('.spinners p ul li').eq(2).html('轻触演示小动：质感').on('touchstart', function(){scripts.part3();});
//        $('.spinners p ul li').eq(3).html('轻触演示小动：HUD').on('touchstart', function(){scripts.part4();});
//        $('.spinners p ul li').eq(4).html('轻触演示小动：缝线').on('touchstart', function(){scripts.part5();});
//        $('.spinners p ul li').eq(5).html('轻触演示小动：乘坐空间').on('touchstart', function(){scripts.part6();});
//        $('.spinners p ul li').eq(6).html('轻触演示小动：后备箱空间').on('touchstart', function(){scripts.part7();});

        initG();
        scripts.part7();
    }

    var bodyNode = $('body');

    function FlyCard(x, y){
//        return;

        this.wrap = $('<div class="cardWrap"><div class="card"></div></div>');
        this.card = this.wrap.find('.card');

        var me = this;
        var addRound = 1;
        var minRound = 1;
        var rz = Math.random()*360*addRound+360*minRound;
        var rx = Math.random()*360*addRound+360*minRound;
        var ry = Math.random()*360*addRound+360*minRound;
        rz = rz /2 - rz;
        rx = rx /2 - rx;
        ry = ry /2 - ry;
        var offsetLeft = Math.random() * 90 - 45;
        var offsetTop = Math.random() * 90;// - 45;

        TweenLite.set(this.card, {backgroundColor:['#ffff66','#ffff00'][Math.floor(Math.random()*2)]});
        TweenLite.set(this.wrap,{x:x,y:y,z:100,rotationZ:Math.random()*360,rotationX:Math.random()*360,rotationY:Math.random()*360,display:'block'});
        TweenLite.to(this.wrap,0.6,{x:x + offsetLeft, ease:Power1.easeOut});
        TweenLite.to(this.wrap,0.6,{y:y + offsetTop, ease:Back.easeIn});
        TweenLite.to(this.card,0.6,{backgroundColor:'#660000', ease:Power2.easeInOut});
//        TweenLite.fromTo(this.wrap,1,{z:100},{});
//        TweenLite.to(this.wrap,1,{opacity:0,delay:1});
        TweenLite.to(this.wrap,0.6,{rotationZ:rz,rotationX:rx,rotationY:ry,onComplete:function(){
            me.wrap.remove();
        }});

        bodyNode.append(this.wrap);

    }


    function reload(){
        location.href='./index.html#d=7';
    }

    function magicShow(textNode, callback, speed, mode){
        speed = speed || 1;
        TweenLite.set(textNode, {display:'block',opacity:1});
        var mySplitText = new SplitText(textNode, {type:"words"});
        var splitTextTimeline = new TimelineLite({paused:true,onComplete:callback||null});

        switch (mode){
            case undefined:
            case 0:
                mySplitText.split({type:"chars, words"});
                splitTextTimeline.staggerFrom(mySplitText.chars, 0.6 * speed, {scale:4, autoAlpha:0,  rotationX:-270,  transformOrigin:"100% 50%", ease:Back.easeOut}, 0.02 * speed);
                break;
            case 0.5:
                mySplitText.split({type:"chars, words"});
                splitTextTimeline.staggerFrom(mySplitText.chars, 0.6 * speed, {scale:4, autoAlpha:0,  rotationX:-180,  transformOrigin:"100% 50%", ease:Back.easeOut}, 0.02 * speed);
                break;
            case 1:
                mySplitText.split({type:"words"})
                $(mySplitText.words).each(function(index,el){
                    splitTextTimeline.from($(el), 0.6 * speed, {opacity:0, force3D:true}, index * 0.01 * speed);
                    splitTextTimeline.from($(el), 0.6 * speed, {scale:index % 2 == 0  ? 0 : 2, ease:Back.easeOut}, index * 0.01 * speed);
                });
                break;
            case 2:
                mySplitText.split({type:"lines"})
                splitTextTimeline.staggerFrom(mySplitText.lines, 0.5 * speed, {opacity:0, scale:0.95}, 0.5 * speed);
                splitTextTimeline.play();
                break;
            case 3:
                mySplitText.split({type:"lines"})
                splitTextTimeline.staggerFrom(mySplitText.lines, 0.5 * speed, {opacity:0, rotationX:-120, force3D:true, transformOrigin:"top center -150"}, 0.1 * speed);
                splitTextTimeline.play();
                break;
        }
        splitTextTimeline.play();

    }

    function initG(){
        var timer;
        var lastX;
        var maxAngle = 10;
        var txt = $('.txt');
        var me = this;
        function handle(event){
            if (timer) return;
            timer = setTimeout(function(){
                var x = +event['accelerationIncludingGravity'].x;
                if (lastX === undefined || Math.abs(x-lastX) >= 0.05){
                    var angle = x / 5 * maxAngle;
                    angle = Math.max(Math.min(angle, maxAngle), -maxAngle);
                    TweenLite.to(txt, 1, {x: angle,  ease:Linear.easeNone});
                    lastX = x;
                }
                timer = 0;
            }, 100);
        }
        window.addEventListener("devicemotion", handle, true);

    }

    /**
     * 预加载
     */
    var imgLoader;
    function preload(cb) {
        var doc = $(document);
        doc.off('touchstart').on('touchstart', function(e){
            return false;
        });

        imgLoader = new ImgLoader({
            loadingHTML: 'Loading<br>{%}',
            nodeLoading: $('.spinners p')[0],
            onPercent: function(percent){
            },
            onAllReady: cb
        });
        imgLoader.addGroup({
            name: 'part7',
            imgArr: [
                'assets/demo2/part7/bg.jpg',
                'assets/demo2/part7/bg2.jpg',
                'assets/demo2/part7/bag1.png',
                'assets/demo2/part7/bag2.png',
                'assets/demo2/part7/bag3.png',
                'assets/demo2/part7/bag4.png',
                'assets/demo2/part7/bag.png'
            ]
        });
        imgLoader.loadGroup('part7');

    }

    preload(function(){
        var doc = $(document);
        doc.off('touchstart');
        init();
    });


});