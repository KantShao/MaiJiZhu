// 公用 JavaScript Document

//通用选项卡
function tabclick(li,tabox,name){
	li.eq(0).addClass(name);
	tabox.eq(0).show();
	li.click(function(){
		$(this).addClass(name).siblings().removeClass(name);
		tabox.hide().eq(li.index(this)).show();
	})
}
function tabmouseover(li,tabox,name){
	li.eq(0).addClass(name);
	tabox.eq(0).show();
	li.mouseover(function(){
		$(this).addClass(name).siblings().removeClass(name);
		tabox.hide().eq(li.index(this)).show();
	})
}

//弹窗居中
function popcenter(popup){
    var width = popup.outerWidth(),
        height = popup.outerHeight();
    popup.css({
    "margin-left" : -width/2,
    "margin-top" : -height/2
    }).show();
}

//关闭渐隐效果
function onclikclose(idclass){
	$("."+idclass).animate({
		'height':'0px',
		'opacity':'0'
		});
}
//完善楼盘信息点击文字输入字符个数
function checkMessage(count,idclass,idnum)
{
	var strlen=0;
	$("."+idclass).keydown(function(){;
		strlen=$(this).val().length;
		if(strlen<count+1)
		{
			$("."+idnum).text(strlen);
		}
	})
}

//上一个、下一个切换一个li
function scrollPic2(scrollArea,scrollUl,width,speed,num,prev,next){
    var timeId,
        len = scrollUl.children("li").length;
    scrollArea.hover(function(){
        clearInterval(timeId);
    },function(){
        if(scrollUl.children().length>num){
            timeId=setInterval(function(){
            	if(scrollArea.is(":hidden")){
                	clearInterval(timeId);
                }else{
	                scrollUl.animate({"margin-left":-width+"px"},500,function(){
	                    scrollUl.css({"margin-left":"0"}).children().eq(0).appendTo(scrollUl);
	                });
                }
            },speed);
        }
    }).trigger("mouseleave");
    prev.click(function(){
    	if(scrollUl.children().length>num){
	        if(!scrollUl.is(":animated")){
	            scrollUl.children().last().prependTo(scrollUl);
	            scrollUl.stop(false,true).css("margin-left",-width+"px").animate({"margin-left":0},500);
	        }
	    }
    });
    next.click(function(){
    	if(scrollUl.children().length>num){
	        if(!scrollUl.is(":animated")){
	            scrollUl.stop(false,true).animate({"margin-left":-width+"px"},500,function(){
	                scrollUl.css({"margin-left":"0"}).children().eq(0).appendTo(scrollUl);
	            });
	        }
	    }
    });
}

//上一个、下一个切换一个li,按钮切换一组li
function scrollPic(scrollArea,scrollUl,width,speed,num,prev,next,menu){
    var timeId,
        add = 0,
        len = scrollUl.children("li").length;
    menu.eq(0).addClass("clicked");
    scrollArea.hover(function(){
        clearInterval(timeId);
    },function(){
        if(scrollUl.children().length>num){
            timeId=setInterval(function(){
            	if(scrollArea.is(":hidden")){
                	clearInterval(timeId);
                }else{
	                scrollUl.animate({"margin-left":-width+"px"},500,function(){
	                    scrollUl.css({"margin-left":"0"}).children().eq(0).appendTo(scrollUl);
	                });
	                add++;
	                if(add == len){
		                add = 0;
	                }
	                menu.eq(Math.floor(add/num)).addClass("clicked").siblings().removeClass("clicked");
                }
            },speed);
        }
    }).trigger("mouseleave");
    prev.click(function(){
    	if(scrollUl.children().length>num){
	        if(!scrollUl.is(":animated")){
	            scrollUl.children().last().prependTo(scrollUl);
	            scrollUl.stop(false,true).css("margin-left",-width+"px").animate({"margin-left":0},500);
	            add--;
	            if(add == -1){
	            	add = len-1;
	            }
	            menu.eq(Math.floor(add/num)).addClass("clicked").siblings().removeClass("clicked");
	        }
	    }
    });
    next.click(function(){
    	if(scrollUl.children().length>num){
	        if(!scrollUl.is(":animated")){
	            scrollUl.stop(false,true).animate({"margin-left":-width+"px"},500,function(){
	                scrollUl.css({"margin-left":"0"}).children().eq(0).appendTo(scrollUl);
	            });
	            add++;
	            if(add == len){
		                add = 0;
	                }
	            menu.eq(Math.floor(add/num)).addClass("clicked").siblings().removeClass("clicked");
	        }
	    }
    });
    menu.click(function(){
    	var lis = new Array();
    	var index = menu.index(this);
    	if(index > Math.floor(add/num)){
	        if(!scrollUl.is(":animated")){
	            scrollUl.stop(false,true).animate({"margin-left":-width*num*(index-Math.floor(add/num))+"px"},500,function(){
	                scrollUl.css({"margin-left":"0"});
	                for(var i = 0; i < num*(index-Math.floor(add/num)); i++){
	                	lis[i] = scrollUl.children("li").eq(0).appendTo(scrollUl);
	                }
	                menu.eq(index).addClass("clicked").siblings().removeClass("clicked");
	                add = index*num;
	            });

	        }
	    }else if(index < Math.floor(add/num)){
	    	if(!scrollUl.is(":animated")){
	            for(var i = 0; i < num*(Math.floor(add/num)-index); i++){
	                	scrollUl.children("li").last().prependTo(scrollUl);
	                }
	            scrollUl.stop(false,true).css("margin-left",-width*num+"px").animate({"margin-left":0},500,function(){
	            	menu.eq(index).addClass("clicked").siblings().removeClass("clicked");
	                add = index*num;
	            });
	        }
	    }
    });
}
//3张图片的大小转换效果
function fanImg(obj){
	var $box = obj,
		$lis = $box.children(),
		boxWidth = $box.width(),
		boxHeight = $box.height(),
		boxOffLeft = $box.offset().left,
		boxOffTop = $box.offset().top;
	$lis.mouseover(function(){
		if(!$lis.is(":animated")){
			if(!$(this).hasClass("bigPic")){
				var $bigPic = $(this).siblings(".bigPic"),
					bigOffLeft = $bigPic.offset().left - boxOffLeft,
					bigOffTop = $bigPic.offset().top - boxOffTop,
					bigWidth = $bigPic.width(),
					bigHeight = $bigPic.height(),
					bigOffRight = boxWidth - bigOffLeft - bigWidth,
					bigOffBottom = boxHeight - bigOffTop - bigHeight;
				$bigPic.width("100%");
				var offLeft = $(this).offset().left - boxOffLeft,
					offTop = $(this).offset().top - boxOffTop,
					width = $(this).width(),
					height = $(this).height(),
				 	offRight = boxWidth - offLeft - width,
				 	offBottom = boxHeight - offTop - height;

				var $another = $(this).siblings().not(".bigPic");
				$bigPic.removeClass("bigPic");
				var during = 400;
				if(offLeft >= offRight && offTop >= offBottom){
					$bigPic.css({
						"left" : "auto",
						"top" : bigOffTop,
						"right": bigOffRight
					}).animate({"width":width,"height":height},during,function(){

					});
					$another.css({
						"left" : bigOffLeft,
						"top" : offTop,
						"bottom" : "auto"
					}).animate({
						"top" : bigOffTop
					},during);
					$(this).css({
						"left" : "auto",
						"top" : "auto",
						"right" : offRight,
						"bottom" : offBottom
					}).animate({"width":bigWidth,"height":bigHeight},during,function(){
						$(this).addClass("bigPic").siblings().removeClass("bigPic");
					});
				}else if(offLeft >= offRight && offTop < offBottom){
					$bigPic.css({
						"left" : "auto",
						"right" : bigOffRight,
						"top" : "auto",
						"bottom" : bigOffBottom
					}).animate({"width":width,"height":height},during,function(){

					});
					$another.css({
						"top" : offTop,
						"left" : bigOffLeft,
						"bottom" : "auto"
					}).animate({
						"top" : boxHeight-height
					},during);
					$(this).css({
						"left" : "auto",
						"top" : offTop,
						"right" : offRight,
						"bottom" : "auto"
					}).animate({"width":bigWidth,"height":bigHeight},during,function(){
						$(this).addClass("bigPic").siblings().removeClass("bigPic");
					});
				}else if(offLeft < offRight && offTop >= offBottom){
					$bigPic.css({
						"left" : bigOffLeft,
						"top" : bigOffTop
					}).animate({"width":width,"height":height},during,function(){

					});
					$another.css({
						"left" : "auto",
						"top" : boxHeight-height,
						"right" : bigOffRight,
						"bottom" : "auto"
					}).animate({
						"top" : bigOffTop
					},during);
					$(this).css({
						"left" : offLeft,
						"bottom" : offBottom,
						"top" : "auto"
					}).animate({"width":bigWidth,"height":bigHeight},during,function(){
						$(this).addClass("bigPic").siblings().removeClass("bigPic");
					});
				}else if(offLeft < offRight && offTop < offBottom){
					$bigPic.css({
						"left" : bigOffLeft,
						"top" : "auto",
						"bottom" : bigOffBottom
					}).animate({"width":width,"height":height},during,function(){

					});
					$another.css({
						"left" : "auto",
						"top" : offTop,
						"right" : bigOffRight,
						"bottom" :"auto"
					}).animate({
						"top" : boxHeight-height
					},during);
					$(this).css({
						"left" : offLeft,
						"top" : offTop
					}).animate({"width":bigWidth,"height":bigHeight},during,function(){
						$(this).addClass("bigPic").siblings().removeClass("bigPic");
					});
				}
			}
		}
	});
}

$(function(){
	//主导航顶部搜索按钮
	$('.p_tpsearchbtn').click(function() {
		var wth = $('.p_tpssbox').width();
		if (wth == 36) {
			$(this).siblings('div').show();
			$(this).parent('.p_tpssbox').css('background-color','#fff').animate({'width':'300px'},500,function(){
				$(this).css('overflow','visible');
			});
			$(this).addClass('clicked');
		};
	});
	//文本框提示
	$(".p_input").map(function(){
		var obj = $(this);
		var timeid = setInterval(function(){
			if(!obj.val()==""){
				obj.siblings(".intips").hide();
				clearInterval(timeid);
			}
		},10);
		$(this).bind({
			focus:function(){
				if (this.value == ""){
					$(this).siblings(".intips").hide();
					$(this).attr("placeholder",$(this).siblings(".intips").text());
				}
			},
			blur:function(){
				if (this.value == ""){
					$(this).siblings(".intips").show();
					$(this).removeAttr("placeholder");
				}
			}
		});
	})
    // 返回顶部
    var $goTop=$(".p_gotop");
	$goTop.hide();
	$(window).scroll(function(){
		if($(window).scrollTop()>500){
			$goTop.show();
		}else{
			$goTop.hide();
		}
	})
	$goTop.click(function(){
		var scrollTop=$(window).scrollTop();
		goTop(scrollTop);
	});
	function goTop(num){
		var timeid;
		timeid=setInterval(function(){
			if(num>0){
				num-=50;
				$(window).scrollTop(num);
			}else{
				clearInterval(timeid);
			}
		},10);
	}
	// 弹窗弹出隐藏
	$(".tc_btn").click(function(){
        $(".tc_maxbg").show();
        popcenter($(".tc_box"));
    });
    $(".tc_close").click(function(){
        $(".tc_maxbg").hide();
        $(".tc_box").hide();
    });

    //主导航显示隐藏效果
    var inMenu = $(".s_fixedmenu"),
		$nav = $('.p_topnavbox'),
		$close=$(".p_tpclose");
	var scrollTops = new Array();
	scrollTops[0] = $(window).scrollTop();
	if($(window).scrollTop()>30){
		if(!$close.is(":animated")){
			$close.animate({'top':'16px'},100);
		}
	}
	$(window).bind("scroll",function(e){
		//主导航展示效果
		if(!inMenu.length > 0){
			var newScrollTop = $(window).scrollTop(),
				len = scrollTops.length;
			if(scrollTops[len-1] > newScrollTop){
				$nav.animate({'top':'0'},500);
			}
			scrollTops.push(newScrollTop);
		}
		if($(window).scrollTop()>30){
			if(!$close.is(":animated") && !$close.hasClass("downing")){
				$close.addClass("downing");
				$close.animate({'top':'16px'},100);
			}
		}else if(!$close.is(":animated") && $close.hasClass("downing")){
				$close.removeClass("downing");
			$close.animate({'top':'-36px'},100);
		}
	});
	$close.click(function() {
		$nav.stop(true,true).animate({'top':'-67px'},300);
	});
});
//导航搜索下拉框
$(function(){
	var ul = $('.p_insxuan'),
		li = ul.children('li');
	$('.p_insword').click(function(e){
		e.stopPropagation();
		var ssul = $(this).siblings('.p_insxuan');
		if (ssul.is(':hidden')) {
			ssul.slideDown();
		}else{
			ssul.slideUp();
		};
	});
	$("body").click(function(){
		ul.slideUp();
	});
	ul.hover(function() {
		li.click(function() {
			var index = $(this).index();
			$(this).parent('ul').siblings('.p_insword').text($(this).text());
			$(this).parent('ul').siblings('ul').children('li').hide().eq(index).show();
		});
	}, function() {
		$(this).slideUp();
	});
	$(".p_insstext").map(function(){
		var obj = $(this);
		var timeid = setInterval(function(){
			if(!obj.val()==""){
				obj.parent().siblings().find(".p_ssrtul").hide();
				clearInterval(timeid);
			}
		},10);
		$(this).bind({
			focus:function(){
				if (this.value == ""){
					$(this).parent().siblings().find(".p_ssrtul").hide();
				}
			},
			blur:function(){
				if (this.value == ""){
					$(this).parent().siblings().find(".p_ssrtul").show();
				}
			}
		});
	})
})
// 浮动选项卡导航条 、 nav隐藏显示
$(function(){
	var inMenu = $(".s_fixedmenu"),
		$main = $(".s_homemain"),
		$nav = $(".p_topnavbox"),
		height = $nav.height();
	if(inMenu.length > 0){
		var offTop = $main.offset().top;
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop > offTop - 10){
				animateUp($nav,100);
				if(scrollTop + height > offTop){
					inMenu.addClass("onfixed");
				}
			}else{
				if(scrollTop == 0){
					animateDown($nav,100);
				}
				inMenu.removeClass("onfixed");
			}
			inMenu.children().not("clicked").click(function(){
				if(inMenu.hasClass("onfixed")){
					$("html,body").stop().animate({"scrollTop":offTop},300);
				}
			});
		});
	}
});

function animateUp(obj,time){
	if(!obj.is(":animated")){
		obj.stop().animate({"top":-obj.height()},time);
	}
}
function animateDown(obj,time){
	if(!obj.is(":animated")){
		obj.stop().animate({"top":0},time);
	}
}
//模拟select
$(function(){
	selectMN($(".m_select_span"));
	function selectMN($select){
		$select.each(function(index, value){
			$select.eq(index).click(function(event){
				event.stopPropagation();
				selectUp($select);
				if($(this).children(".m_select_chList").is(":hidden")){
					selectDown($(this));
				} else {
					selectUp($(this));
				}
				var selectLis = $(this).children(".m_select_chList").find("li");
				selectLis.each(function(index){
					selectLis.eq(index).click(function(){
						$(this).parent().siblings(".fl").text($(this).text());
						$(this).find(".m_bottom").show();
						$(this).find(".m_top").hide();
					});
				});
			});
		});
		$("body").click(function(){
			selectUp($select);
		});

		function selectUp($obj){
			$obj.children(".m_select_chList").stop().slideUp(200);
			$obj.find(".m_bottom").show();
			$obj.find(".m_top").hide();
		}
		function selectDown($obj){
			$obj.children(".m_select_chList").stop().slideDown(200);
			$obj.find(".m_top").show();
			$obj.find(".m_bottom").hide();
		}
	}
});
//登陆注册弹窗
function windivmax(idclassbox,id_class,id_close)
{
	var $w=$(window).width(),
	 $h=$(window).height(),
	  $H=$(document).height(),
	  $mw=$("."+id_class).width(),
	 $mh=$("."+id_class).height(),
	 strtop=($h-$mh)/2,
	 strleft=($w-$mw)/2;
	$("."+idclassbox).css("height",$H+'px').show();
	 $("."+id_class).css("left",strleft+'px').css("top",strtop+'px').show();
	 $("."+id_close).click(function(){
		$("."+id_class).hide();
		$("."+idclassbox).hide();
	});
	 $(window).resize(function(){
	 	var $w=$(window).width(),
			 $h=$(window).height(),
			  $H=$(document).height(),
			  $mw=$("."+id_class).width(),
			 $mh=$("."+id_class).height(),
			 strtop=($h-$mh)/2,
			 strleft=($w-$mw)/2;
			$("."+idclassbox).css("height",$H+'px');
			 $("."+id_class).css("left",strleft+'px').css("top",strtop+'px');
	 });
}
//登录弹窗调用
$(function(){
	$(".login").click(function(){
		$(".ly_regmain").hide();
		windivmax("ly_loginbox","ly_loginmain01","ly_loginclose");
	})
})
//我要预订弹窗调用
$(function(){
	$(".ly_siderrightcopy").click(function(){
		windivmax("ly_loginbox","ly_booking","ly_bookingclose")
	})
})
//注册弹窗调用
$(function(){
	$(".reg").click(function(){
		$(".ly_loginmain01").hide();
		windivmax("ly_loginbox","ly_regmain","ly_loginclose")
	})
})
$(function(){
	$(".s_registerbtn").click(function(){
		$(".ly_regmain").hide();
		windivmax("ly_loginbox","s_registerok","ly_loginclose")
	})
})
//找回密码弹窗调用

$(function(){
	$(".idcard").click(function(){
		$(".ly_loginmain").hide();
		windivmax("ly_loginbox","ly_emailWrap","ly_loginclose")
	})
})

//找回密码步骤弹窗调用
$(function(){
	$(".ly_idcradway").click(function(){
		$(".ly_emailWrap,.ly_loginbox").hide();
		var strId=$(".ly_idcradjdtli>li"),
		 strobj=$(".ly_passwrodjdt>li");
		strId.eq(0).addClass("active");
		strobj.eq(0).show();
		windivmax("ly_loginbox","ly_idcradWrap","ly_loginclose");
		settime(1,"ly_idcradjdtper");
		$(".ly_passwrodjdt").find(".ly_idcradnext").each(function(index){
			$(this).click(function(){
				strId.eq(index+1).addClass("active");
				strobj.hide().eq(index+1).show();
				settime(index+2,"ly_idcradjdtper");
			})

		})
	})
})

function settime(index,strclass)
{
	var num=158*index+10,i;
	if(index==1){
		i=0;
	}else{
		i=num-(num-158*(index-1));
	}
	if(index==4){num=654}

	 timeid=setInterval(function(){
		if(i<=num){
				 $("."+strclass).css("width",i+"px");
				        i++;
			 }else{

				        clearInterval(timeid);
				}
	},5);
}


