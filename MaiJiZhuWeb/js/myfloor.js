
// 首页banner 图
$(document).ready(function(e) {
	setInterval(GetWindowWidth,10);
});
function GetWindowWidth(){
	var w=$(window).width();
	$(".bd").css("width",w+"px");
	if (w < 1920){
	   $(".bd ul").css({"left":(w-1920)/2+"px"});
	   }else{
		$(".bd ul").css({"left":0+"px"});
	}
}

// 首页滚动模块显示
$(function(){
	var $nav = $(".p_topnavbox"),
		$hotbox01 = $(".p_in_hotlpbox"),
		$hotbox02 = $(".p_in_hothxbox"),
		$hotbox03 = $(".p_in_shejis");
	if($hotbox01.length>0){
		var offBtm01 = $hotbox01.offset().top+$hotbox01.height();
	}
	if($hotbox02.length>0){
		var offBtm02 = $hotbox02.offset().top+$hotbox02.height()-100;
	}
	if($hotbox03.length>0){
		var offBtm03 = $hotbox03.offset().top+$hotbox03.height();
	}
	var wHeight = $(window).height();
	if($(window).scrollTop() + wHeight >= offBtm01){
			$hotbox01.addClass("pageShow");
	}
	if($(window).scrollTop() + wHeight >= offBtm02){
			$hotbox02.addClass("pageShow");
	}
	if($(window).scrollTop() + wHeight >= offBtm03){
			$hotbox03.addClass("pageShow");
	}
	$(window).bind("scroll",function(){
		//首页动画
		if($(window).scrollTop() + wHeight >= offBtm01){
			$hotbox01.addClass("pageShow");
		}
		if($(window).scrollTop() + wHeight >= offBtm02){
			$hotbox02.addClass("pageShow");
		}
		if($(window).scrollTop() + wHeight >= offBtm03){
			$hotbox03.addClass("pageShow");
		}
	});

	//首页banner处向下箭头锚点效果
	$(".p_pronextbtn").on("click",function(){
		var offTop = $(".s_offTop").offset().top,
			height = $nav.height();
		$("body,html").animate({scrollTop:offTop},300);
	});
});

// 选择热门户型风格
$(function(){
	var intx = $('.p_in_selbox>span');
	intx.click(function(){
		var inul = $(this).siblings('ul'),
			box = $(this).parent('div');
		if (inul.is(':hidden')) {
			inul.slideDown();
			box.css('border-radius','3px 3px 0 0');
		}else{
			inul.slideUp();
			box.css('border-radius','3px');
		};
	})
	$('.p_in_hxul').hover(function() {
		$(this).children('li').click(function() {
			$(this).parent('ul').siblings('span').text($(this).text());
			$(this).parent('ul').slideUp();
			$(this).parent('ul').parent('div').css('border-radius','3px');
		});
	}, function() {
		$(this).slideUp();
	});
})

// 热门秀家
$(function(){
	$('.p_in_hothumer li').hover(function() {
		$(this).stop().animate({'top':'-10px'},500)
	}, function() {
		$(this).stop().animate({'top':'0'},500)
	});
})

/* 2015.08.25 sxk */
$(function(){
	$(".s_discuss>li:last").find(".s_discuss-border").css("height",0);

	$(".s_hometj").each(function(){
		scrollPic($(this),$(this).find(".s_hometjlist"),145,3000,6,$(this).find(".s_hometjprev"),$(this).find(".s_hometjnext"),$(this).find(".s_hometjpoint li"));
	});

	fadeBanner($(".s_designerslide"),$(".s_slidemenu li"));

	tabcard($(".s_fixedmenu li"),$(".s_homecont"));

	$(".y_lpdpa2").click(function(){
		$(".s_dapeibox01").hide();
		$(".s_dapeibox02").show();
	});

	$(".l_hmback_btn").click(function(){
		$(".s_dapeibox02").hide();
		$(".s_dapeibox01").show();
	});
});

function fadeBanner(obj,menus){
    var imgs = obj.children("li"),
        len = imgs.length,
        onIndex = 0;
    for(var i = 0; i < len; i++){
        imgs.css("z-index",len-i);
    }
    imgs.hide().eq(0).show();
    menus.eq(0).addClass("clicked");
    menus.mouseover(function(){
        var index = $(this).index();
        if(index != onIndex){
            imgs.eq(onIndex).stop(false,true).fadeOut(600);
            imgs.eq(index).stop(false,true).fadeIn(600,function(){
                menus.eq(index).addClass("clicked").siblings().removeClass("clicked");
                onIndex = index;
            });
        }
    });
    var timeid;
    obj.parent().hover(function(){
        clearInterval(timeid);
    },function(){
        timeid = setInterval(function(){
            if(onIndex < len-1){
                imgs.eq(onIndex).stop(false,true).fadeOut(600);
                imgs.eq(onIndex+1).stop(false,true).fadeIn(600,function(){
                    menus.eq(onIndex+1).addClass("clicked").siblings().removeClass("clicked");
                    onIndex++;
                });
            }else{
                imgs.eq(len-1).stop(false,true).fadeOut(600);
                imgs.eq(0).stop(false,true).fadeIn(600,function(){
                    menus.eq(0).addClass("clicked").siblings().removeClass("clicked");
                    onIndex = 0;
                });
            }
        },3000);
    }).trigger("mouseleave");
}
function tabcard(select,cont){
    var timeid;
    select.eq(0).addClass("clicked");
    cont.hide().eq(0).show();
    select.click(function(){
        var that = $(this);
        var index = that.index();
        that.addClass("clicked").siblings().removeClass("clicked");
        cont.hide().eq(index).show();
    })
}
//鼠标移入小图显示大图
$(function(){
	var timeid;
	$(".y_lpuls>li").map(function(){
		var that=$(this);
		var lis=$(this).find(".y_lpul2").children("li");
		lis.mouseover(function(){
			var the = $(this);
			clearTimeout(timeid);
			timeid = setTimeout(function(){
				var img1=that.find(".y_lpbigimg").children("img").attr("src");
				var img2=the.children("img").attr("src");
				the.children("img").attr("src",img1);
				the.parent().siblings(".y_lpbigimg").children("img").attr("src",img2);
			},200);
		})
	})
});

$(function(){
	$(".m_hxxj_reviewList").each(function(index){
		$(this).find("li").addClass("clr").last().css("border","none");
	});
});

//瀑布流
$(function(){
	$("body").click(function(){
		if(!$(".m_wdlp_waterfall").parent().is(":hidden")){
			var $one = $(".m_wdlp_waterBox>li");
			var maxH = waterfall($one,20);
			$(".m_wdlp_waterBox").css("height",maxH+20);
		}
	});
});
function waterfall($one, mt){
	oneWidth = $one.eq(0).width(); // 一个块框pin的宽
	var ml = parseInt($one.css("margin-left"));
	num = Math.floor($(".m_wdlp_waterBox").width()/(oneWidth+ml)); //每行中能容纳的pin个数
	var oneHArr=[]; //用于存储 每列中的所有块框相加的高度。
	var maxH = 0; //存储最高的列
	$one.each(function(index, value){
		var oneH = $one.eq(index).height();
		if(index<num){
			oneHArr[index] = oneH;
		} else {
			var minH = Math.min.apply( null, oneHArr ); //数组oneHArr中的最小值minH
			var minHIndex = $.inArray( minH, oneHArr );
			$(value).css({
                				'position': 'absolute',
                				'top': minH + mt,
                				'left': $one.eq( minHIndex ).position().left
            			});
			//数组 最小高元素的高 + 添加上的aPin[i]块框高
            			oneHArr[ minHIndex ] += $one.eq(index).height() + mt;//更新添加了块框后的列高
		}
		maxH = Math.max.apply(null, oneHArr)
	});
	return maxH;
}

//户型主页（户型秀家）
$(function(){
	var love = $(".m_show_love");
	love.each(function(index,value){
		love.eq(index).click(function(){
			var num = parseInt($(this).find(".m_show_num").text());
			if($(this).hasClass("m_show_loveOn")){
				$(this).removeClass("m_show_loveOn");
				$(this).find(".m_show_num").text(num-1);
			} else {
				$(this).addClass("m_show_loveOn");
				$(this).find(".m_show_num").text(num+1);
			}
		});
	});
});

//创建户型-创建成功调用点击切换
$(function(){
	var astr=$(".ly_successlist a"),
	 ulstr=$(".ly_successtab ul");
	tabclick(astr,ulstr,"ashow");
})

$(function(){
	$(".ly_creatclose").bind("click",function () {
		onclikclose("ly_creatmsg")
	});
});

$(function(){
	//完善楼盘信息调用输入字符个数
	checkMessage(300,"ly_creatarea","ly_number");
	//楼盘主页 滚动
	scrollPic2($(".p_lp_scropicon"),$(".p_lp_scroul"),297,3000,4,$(".m_lp_prev"),$(".m_lp_next"));
});
//banner图
$(function(){
	banner($(".m_lp_list li"),$(".m_lp_cur ul"),$(".m_lp_cur"),$(".m_lp_wrapper"));
});
function banner($liList, $cur, $curBox,$wrapper){
	var bodyWidth = $("body").width(),//banner的显示宽度
	       curIndex = 0;

	$liList.each(function(index){
		$liList.eq(index).css("background","url("+$liList.eq(index).attr("_src")+") center");
	});
	$liList.eq(curIndex).css("opacity","1");
	var curList = $cur.find("li");
	curList.eq(curIndex).addClass("m_cur_on");

	var curWidth = curList.eq(curIndex).width();
	        ml = parseInt(curList.eq(0).css("margin-left"));
	$curBox.css("width",(curWidth+ml)*curList.length+"px").css("margin-left",-curWidth*curList.length/2+"px");

	curList.mouseover(function(){
		var index = $(this).index();
		if(index != curIndex){
			curList.removeClass("m_cur_on").eq(index).addClass("m_cur_on");
			$liList.eq(curIndex).stop().animate({
				"opacity":0
			},1500);
			$liList.eq(index).stop().animate({
				"opacity":1
			},1500);
			curIndex = index;
		}
	});
	function slidePrev(curIndex){
		var index = curIndex-1;
		if(curIndex == 0){
			index = $liList.length-1;
		}
		bannerSlide(curIndex, index);
		return index;
	}
	function slideNext(curIndex){
		var index = curIndex+1;
		if(curIndex == $liList.length-1){
			index = 0;
		}
		bannerSlide(curIndex, index);
		return index;
	}
	function bannerSlide(curIndex, index){
		curList.removeClass("m_cur_on").eq(index).addClass("m_cur_on");
		$liList.eq(curIndex).stop().animate({
			"opacity":0
		},1500);
		$liList.eq(index).stop().animate({
			"opacity":1
		},1500);
	}

	/*----------自动切换------------*/
	var timeLock;
	function start(){
		timeLock = setInterval(function(){
       			 curIndex = slideNext(curIndex);
	    	},3000)
	}
	start();
	$wrapper.hover(
		function(){
			clearInterval(timeLock);
		},
		function(){
			start();
		}
	);
}


$(function(){
	var lpImg1 = $(".m_lp_img1"),
        lpImg2 = $(".m_lp_img2"),
        lpImg3 = $(".m_lp_img3"),
        lpImg4 = $(".m_lp_img4"),
        lpImg5 = $(".m_lp_img5"),
        lpImg = $(".m_lp_img");

	lpImg1.css({
		"width":490,
		"height":374,
		"top":0,
		"left":0
	});
	lpImg2.css({
		"width":239,
		"height":181,
		"top":0,
		"left":501
	});
	lpImg3.css({
		"width":239,
		"height":181,
		"top":0,
		"left":751
	});
	lpImg4.css({
		"width":239,
		"height":181,
		"top":192,
		"left":501
	});
	lpImg5.css({
		"width":239,
		"height":181,
		"top":192,
		"left":751
	});
	function imgSmall($img){
		$img.animate({
			"width":239,
			"height":181
		});
	}
});

//index图片效果
$(function(){
	$(".p_in_picul").each(function(){
		fanImg($(this));
	});
});


//我的楼盘图片效果
$(function(){
	var $imgs = $(".m_lp_img"),
		smallWidth = 239,
		smallHeight = 181,
		bigWidth = 490,
		bigHeight = 374,
		during = 300,
		boxWidth = $imgs.parent().width(),
		boxHeight = $imgs.parent().height(),
		timeid; //动画时间
	$imgs.on("mouseover",function(e){
		var $that = $(this);
		if(!$that.hasClass("bigPic")){
			clearTimeout(timeid);
			timeid = setTimeout(function(){
				if(!$imgs.is(":animated")){
					var index = $that.index(),
						$bigPic = $that.siblings(".bigPic"),
						bigIndex = $bigPic.index();
					var tops = new Array(),
						lefts = new Array()
						onCol = 0; //保存与this同列的元素
					for(var i = 0; i < $imgs.length; i++){
						tops[i] = $imgs.eq(i).position().top;
						lefts[i] = $imgs.eq(i).position().left;
						if(lefts[i] == $that.position().left && i != index){
							onCol = i;
						}
					}
					if(lefts[index] > lefts[bigIndex] && lefts[index] - lefts[bigIndex] < bigWidth + smallWidth){ //通过鼠标位置判断伸缩方向 ,大图在左侧中间无小图
						if(tops[onCol] > tops[index]){ //如果是上方元素 -- 右上
							$bigPic.css({
								"left" : lefts[bigIndex],
								"top" : tops[bigIndex],
								"width" : smallWidth,
								"height" : smallHeight
							});
							$imgs.eq(onCol).css({
								"left" : lefts[bigIndex],
								"top" : tops[onCol]
							});
							$that.css({
								"left" : lefts[index] + smallWidth - bigWidth,
								"top" : tops[bigIndex],
								"width" : bigWidth,
								"height" : bigHeight
							}).addClass("bigPic").siblings().removeClass("bigPic");
						}else{ //如果是下方元素
							$bigPic.css({
								"left" : lefts[bigIndex],
								"top" : tops[bigIndex] + bigHeight - smallHeight,
								"width" : smallWidth,
								"height" : smallHeight
							})

							$imgs.eq(onCol).css({
								"left" : lefts[bigIndex],
								"top" : tops[onCol]
							});

							$that.css({
								"left" : lefts[index] + smallWidth - bigWidth,
								"top" : tops[bigIndex],
								"width" : bigWidth,
								"height" : bigHeight
							}).addClass("bigPic").siblings().removeClass("bigPic");
						}
					}
					if(lefts[index] > lefts[bigIndex] && lefts[index] - lefts[bigIndex] > bigWidth + smallWidth){ //通过鼠标位置判断伸缩方向 ,大图在左侧中间有小图
						var midUp = 0, midDown = 0;
							for(var i = 0; i < $imgs.length; i++){ //获取夹在中间的两个元素
								if(lefts[i] > lefts[bigIndex] && lefts[i] < lefts[index]){
									if(tops[i] == tops[bigIndex]){
										midUp = i;
									}else{
										midDown = i;
									}
								}
							}
						if(tops[onCol] > tops[index]){ //如果是上方元素
							$bigPic.css({
								"left" : lefts[bigIndex],
								"top" : tops[bigIndex],
								"width" : smallWidth,
								"height" : smallHeight
							});

							$imgs.eq(onCol).css({
								"left" : lefts[midUp] + smallWidth - bigWidth,
								"top" : tops[onCol]
							});
							$imgs.eq(midDown).css({
								"left" : lefts[bigIndex],
								"top" : tops[midDown]
							});
							$imgs.eq(midUp).css({
								"left" : lefts[midUp] + smallWidth - bigWidth,
								"top" : tops[midUp]
							});
							$that.css({
								"left" : lefts[index] + smallWidth - bigWidth,
								"width" : bigWidth,
								"height" : bigHeight,
								"top" : tops[index]
							}).addClass("bigPic").siblings().removeClass("bigPic");
						}else{ //如果是下方元素
							$bigPic.css({
								"left" : lefts[bigIndex],
								"top" : tops[bigIndex] + bigHeight - smallHeight,
								"width" : smallWidth,
								"height" : smallHeight
							});

							$imgs.eq(onCol).css({
								"left" : lefts[midDown] + smallWidth - bigWidth,
								"top" : tops[onCol]
							});
							$imgs.eq(midDown).css({
								"left" : lefts[midDown] + smallWidth - bigWidth,
								"top" : tops[midDown]
							});
							$imgs.eq(midUp).css({
								"left" : lefts[bigIndex],
								"top" : tops[midUp]
							});

							$that.css({
								"left" : lefts[index] + smallWidth - bigWidth,
								"top" : tops[bigIndex],
								"width" : bigWidth,
								"height" : bigHeight
							}).addClass("bigPic").siblings().removeClass("bigPic");
						}
					}
					if(lefts[index] < lefts[bigIndex] && lefts[bigIndex] - lefts[index] < 2*smallWidth){ //通过鼠标位置判断伸缩方向 ,大图在右侧中间无小图
						if(tops[onCol] > tops[index]){ //如果是上方元素
							$bigPic.css({
								"left" : lefts[bigIndex] + bigWidth - smallWidth,
								"top" : tops[bigIndex],
								"width" : smallWidth,
								"height" : smallHeight
							});
							$imgs.eq(onCol).css({
								"left" : lefts[bigIndex] + bigWidth - smallWidth
							});
							$that.css({
								"left" : lefts[index],
								"top" : 0,
								"width" : bigWidth,
								"height" : bigHeight
							}).addClass("bigPic").siblings().removeClass("bigPic");
						}else{ //如果是下方元素
							$bigPic.css({
								"left" : lefts[bigIndex] + bigWidth - smallWidth,
								"top" : bigHeight - smallHeight,
								"width" : smallWidth,
								"height" : smallHeight
							})

							$imgs.eq(onCol).css({
								"left" : lefts[bigIndex] + bigWidth - smallWidth
							});

							$that.css({
								"left" : lefts[index],
								"top" : 0,
								"width" : bigWidth,
								"height" : bigHeight
							}).addClass("bigPic").siblings().removeClass("bigPic");
						}
					}
					if(lefts[index] < lefts[bigIndex] && lefts[bigIndex] - lefts[index] > 2*smallWidth){ //通过鼠标位置判断伸缩方向 ,大图在右侧中间有小图
						var midUp = 0, midDown = 0;
							for(var i = 0; i < $imgs.length; i++){ //获取夹在中间的两个元素
								if(lefts[i] < lefts[bigIndex] && lefts[i] > lefts[index]){
									if(tops[i] == tops[bigIndex]){
										midUp = i;
									}else{
										midDown = i;
									}
								}
							}
						if(tops[onCol] > tops[index]){ //如果是上方元素
							$bigPic.css({
								"left" : lefts[bigIndex] + bigWidth - smallWidth,
								"top" : tops[bigIndex],
								"width" : smallWidth,
								"height" : smallHeight
							});

							$imgs.eq(onCol).css({
								"left" : lefts[midUp] - smallWidth + bigWidth
							});
							$imgs.eq(midDown).css({
								"left" : lefts[bigIndex] - smallWidth + bigWidth
							});
							$imgs.eq(midUp).css({
								"left" : lefts[midUp] - smallWidth + bigWidth
							});
							$that.css({
								"left" : lefts[index],
								"width" : bigWidth,
								"height" : bigHeight
							}).addClass("bigPic").siblings().removeClass("bigPic");
						}else{ //如果是下方元素
							$bigPic.css({
								"left" : lefts[bigIndex] + bigWidth - smallWidth,
								"top" : bigHeight - smallHeight,
								"width" : smallWidth,
								"height" : smallHeight
							});

							$imgs.eq(onCol).css({
								"left" : lefts[midUp] - smallWidth + bigWidth
							});
							$imgs.eq(midDown).css({
								"left" : lefts[midUp] - smallWidth + bigWidth
							});
							$imgs.eq(midUp).css({
								"left" : lefts[bigIndex] + bigWidth - smallWidth
							});

							$that.css({
								"left" : lefts[index],
								"top" : 0,
								"width" : bigWidth,
								"height" : bigHeight
							}).addClass("bigPic").siblings().removeClass("bigPic");
						}
					}
				}
			},300);
		}
	});
});


// 20150901 pj
$(function(){
	$('.p_lp_xzleft').click(function() {
		var box = $(this).children('.p_lp_slide');
		if (box.is(':hidden')) {
			box.slideDown();
			$('.p_down').hide();
			$('.p_up').show()
		}else{
			box.slideUp();
			$('.p_down').show();
			$('.p_up').hide()
		};
		box.click(function() {
			event.stopPropagation();
		});
		event.stopPropagation();
	});
	$("body").click(function(){
		$('.p_lp_slide').slideUp();
		$('.p_down').show();
		$('.p_up').hide()
	});
	$('.p_lp_closex').click(function(){
		$(this).parent('.p_lp_xztip').hide();
	});
});