'use strict';(function(b,c){b._EPYT_=b._EPYT_||{ajaxurl:"/wp-admin/admin-ajax.php",security:"",gallery_scrolloffset:100,eppathtoscripts:"/wp-content/plugins/youtube-embed-plus/scripts/",eppath:"/wp-content/plugins/youtube-embed-plus/",epresponsiveselector:["iframe.__youtube_prefs_widget__"],epdovol:!0,evselector:'iframe.__youtube_prefs__[src], iframe[src*="youtube.com/embed/"], iframe[src*="youtube-nocookie.com/embed/"]',stopMobileBuffer:!0,ajax_compat:!1,usingdefault:!0,ytapi_load:"light",pause_others:!1,
facade_mode:!1,not_live_on_channel:!1};b._EPYT_.touchmoved=!1;b._EPYT_.apiVideos=b._EPYT_.apiVideos||{};0===b.location.toString().indexOf("https://")&&(b._EPYT_.ajaxurl=b._EPYT_.ajaxurl.replace("http://","https://"));b._EPYT_.pageLoaded=!1;c(b).on("load._EPYT_",function(){b._EPYT_.pageLoaded=!0});document.querySelectorAll||(document.querySelectorAll=function(a){var d=document,e=d.documentElement.firstChild,g=d.createElement("STYLE");e.appendChild(g);d.__qsaels=[];g.styleSheet.cssText=a+"{x:expression(document.__qsaels.push(this))}";
b.scrollBy(0,0);return d.__qsaels});"undefined"===typeof b._EPADashboard_&&(b._EPADashboard_={initStarted:!1,checkCount:0,onPlayerReady:function(a){try{if("undefined"!==typeof _EPYT_.epdovol&&_EPYT_.epdovol){var d=parseInt(a.target.getIframe().getAttribute("data-vol"));isNaN(d)||(0===d?a.target.mute():(a.target.isMuted()&&a.target.unMute(),a.target.setVolume(d)))}var e=parseInt(a.target.getIframe().getAttribute("data-epautoplay"));isNaN(e)||1!==e||a.target.playVideo()}catch(h){}try{var g=a.target.getIframe(),
f=g.getAttribute("id");b._EPYT_.apiVideos[f]=a.target;b._EPYT_.not_live_on_channel&&0<a.target.getVideoUrl().indexOf("live_stream")&&b._EPADashboard_.doLiveFallback(g)}catch(h){}finally{c(a.target.getIframe()).css("opacity",1)}},onPlayerStateChange:function(a){var d=a.target.getIframe();b._EPYT_.pause_others&&a.data===b.YT.PlayerState.PLAYING&&b._EPADashboard_.pauseOthers(a.target);a.data===b.YT.PlayerState.PLAYING&&!0!==a.target.ponce&&-1===d.src.indexOf("autoplay=1")&&(a.target.ponce=!0);if(a.data===
b.YT.PlayerState.ENDED&&"1"==c(d).data("relstop"))if("function"===typeof a.target.stopVideo)a.target.stopVideo();else{var e=c(d).clone(!0).off();e.attr("src",b._EPADashboard_.cleanSrc(e.attr("src").replace("autoplay=1","autoplay=0")));c(d).replaceWith(e);b._EPADashboard_.setupevents(e.attr("id"));d=e.get(0)}e=c(d).closest(".epyt-gallery");e.length||(e=c("#"+c(d).data("epytgalleryid")));e.length&&"1"==e.find(".epyt-pagebutton").first().data("autonext")&&a.data===b.YT.PlayerState.ENDED&&(a=e.find(".epyt-current-video"),
a.length||(a=e.find(".epyt-gallery-thumb").first()),a=a.find(" ~ .epyt-gallery-thumb").first(),a.length?a.trigger("click"):e.find('.epyt-pagebutton.epyt-next[data-pagetoken!=""][data-pagetoken]').first().trigger("click"))},isMobile:function(){return/Mobi|Android/i.test(navigator.userAgent)},base64DecodeUnicode:function(a){a=a.replace(/\s/g,"");return decodeURIComponent(Array.prototype.map.call(atob(a),function(d){return"%"+("00"+d.charCodeAt(0).toString(16)).slice(-2)}).join(""))},doLiveFallback:function(a){var d=
c(a).closest(".wp-block-embed");d.length||(d=c(a).closest(".epyt-live-chat-wrapper"));d.length||(d=c(a).closest(".epyt-video-wrapper"));if(d.length&&(a=c("#epyt-live-fallback"),a.length)){var e="";try{e=b._EPADashboard_.base64DecodeUnicode(a.get(0).innerHTML)}catch(f){}if(e){var g=d.parent();b._EPADashboard_.loadYTAPI();d.replaceWith(e);b._EPADashboard_.apiInit();b._EPADashboard_.pageReady();setTimeout(function(){"undefined"!==typeof c.fn.fitVidsEP&&g.fitVidsEP()},1)}}},videoEqual:function(a,d){return a.getIframe&&
d.getIframe&&a.getIframe().id===d.getIframe().id?!0:!1},pauseOthers:function(a){if(a)for(var d in b._EPYT_.apiVideos){var e=b._EPYT_.apiVideos[d];e&&"function"===typeof e.pauseVideo&&e!=a&&!_EPADashboard_.videoEqual(e,a)&&"function"===typeof e.getPlayerState&&0<=[YT.PlayerState.BUFFERING,b.YT.PlayerState.PLAYING].indexOf(e.getPlayerState())&&e.pauseVideo()}},justid:function(a){return/[\?&]v=([^&#]*)/.exec(a)[1]},setupevents:function(a){if("undefined"!==typeof b.YT&&null!==b.YT&&b.YT.loaded){var d=
document.getElementById(a);if(!d.epytsetupdone)return b._EPADashboard_.log("Setting up YT API events: "+a),d.epytsetupdone=!0,d={events:{onReady:b._EPADashboard_.onPlayerReady,onStateChange:b._EPADashboard_.onPlayerStateChange},host:0<(d.src||"").indexOf("nocookie")?"https://www.youtube-nocookie.com":"https://www.youtube.com"},new b.YT.Player(a,d)}},apiInit:function(){if("undefined"!==typeof b.YT){b._EPADashboard_.initStarted=!0;for(var a=document.querySelectorAll(_EPYT_.evselector),d=0;d<a.length;d++)a[d].hasAttribute("id")||
(a[d].id="_dytid_"+Math.round(8999*Math.random()+1E3)),b._EPADashboard_.setupevents(a[d].id)}},log:function(a){try{console.log(a)}catch(d){}},doubleCheck:function(){b._EPADashboard_.checkInterval=setInterval(function(){b._EPADashboard_.checkCount++;5<=b._EPADashboard_.checkCount||b._EPADashboard_.initStarted?clearInterval(b._EPADashboard_.checkInterval):(b._EPADashboard_.apiInit(),b._EPADashboard_.log("YT API init check"))},1E3)},selectText:function(a){if(document.selection){var d=document.body.createTextRange();
d.moveToElementText(a);d.select()}else if(b.getSelection){var e=b.getSelection();d=document.createRange();d.selectNode(a);e.removeAllRanges();e.addRange(d)}},setVidSrc:function(a,d){a.is(".epyt-facade")?(a.attr("data-facadesrc",b._EPADashboard_.cleanSrc(d)),a.trigger("click")):(a.attr("src",b._EPADashboard_.cleanSrc(d)),a.get(0).epytsetupdone=!1,b._EPADashboard_.setupevents(a.attr("id")))},cleanSrc:function(a){return a.replace("enablejsapi=1?enablejsapi=1","enablejsapi=1")},loadYTAPI:function(){if("undefined"===
typeof b.YT){if("never"!==b._EPYT_.ytapi_load&&("always"===b._EPYT_.ytapi_load||c('iframe[src*="youtube.com/embed/"], iframe[data-src*="youtube.com/embed/"], .__youtube_prefs__').length)){var a=document.createElement("script");a.src="https://www.youtube.com/iframe_api";a.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(a)}}else if(b.YT.loaded)if(b._EPYT_.pageLoaded)b._EPADashboard_.apiInit(),b._EPADashboard_.log("YT API available");else c(b).on("load._EPYT_",function(){b._EPADashboard_.apiInit();
b._EPADashboard_.log("YT API available 2")})},resolveFacadeQuality:function(a,d){a.epytFacadeCount="undefined"===typeof a.epytFacadeCount?0:a.epytFacadeCount+1;if(d||200>a.naturalHeight)if(d=c(a).attr("src"))c(a).attr("src",d.replace("maxresdefault","hqdefault")),c(a).off("load.epyt");2<a.epytFacadeCount&&c(a).off("load.epyt")},pageReady:function(){b._EPYT_.not_live_on_channel&&"never"!==b._EPYT_.ytapi_load&&c(".epyt-live-channel").each(function(){var a=c(this);a.data("eypt-fallback")||(a.data("eypt-fallback",
!0),a.css("opacity",0),setTimeout(function(){a.css("opacity",1)},4E3))});c(".epyt-gallery").each(function(){var a=c(this);if(!a.data("epytevents")||!c("body").hasClass("block-editor-page")){a.data("epytevents","1");var d=c(this).find("iframe, div.__youtube_prefs_gdpr__, div.epyt-facade").first(),e=d.data("src")||d.data("facadesrc")||d.attr("src");e||(e=d.data("ep-src"));var g=c(this).find(".epyt-gallery-list .epyt-gallery-thumb").first().data("videoid");"undefined"!==typeof e?(e=e.replace(g,"GALLERYVIDEOID"),
a.data("ep-gallerysrc",e)):d.hasClass("__youtube_prefs_gdpr__")&&a.data("ep-gallerysrc","");a.on("click touchend",".epyt-gallery-list .epyt-gallery-thumb",function(f){d=a.find("iframe, div.__youtube_prefs_gdpr__, div.epyt-facade").first();if(!b._EPYT_.touchmoved&&!c(this).hasClass("epyt-current-video")){a.find(".epyt-gallery-list .epyt-gallery-thumb").removeClass("epyt-current-video");c(this).addClass("epyt-current-video");f=c(this).data("videoid");a.data("currvid",f);var h=a.data("ep-gallerysrc").replace("GALLERYVIDEOID",
f);f=a.find(".epyt-pagebutton").first().data("thumbplay");"0"!==f&&0!==f&&(h=0<h.indexOf("autoplay")?h.replace("autoplay=0","autoplay=1"):h+"&autoplay=1",d.addClass("epyt-thumbplay"));f=Math.max(c("body").scrollTop(),c("html").scrollTop());var k=d.offset().top-parseInt(_EPYT_.gallery_scrolloffset);f>k?c("html, body").animate({scrollTop:k},500,function(){b._EPADashboard_.setVidSrc(d,h)}):b._EPADashboard_.setVidSrc(d,h)}}).on("touchmove",function(f){b._EPYT_.touchmoved=!0}).on("touchstart",function(){b._EPYT_.touchmoved=
!1}).on("keydown",".epyt-gallery-list .epyt-gallery-thumb, .epyt-pagebutton",function(f){var h=f.which;if(13===h||32===h)f.preventDefault(),c(this).trigger("click")});a.on("mouseenter",".epyt-gallery-list .epyt-gallery-thumb",function(){c(this).addClass("hover")});a.on("mouseleave",".epyt-gallery-list .epyt-gallery-thumb",function(){c(this).removeClass("hover")});a.on("click touchend",".epyt-pagebutton",function(f){if(!b._EPYT_.touchmoved&&!a.find(".epyt-gallery-list").hasClass("epyt-loading")){a.find(".epyt-gallery-list").addClass("epyt-loading");
var h="undefined"!==typeof f.originalEvent;f={action:"my_embedplus_gallery_page",security:_EPYT_.security,options:{playlistId:c(this).data("playlistid"),pageToken:c(this).data("pagetoken"),pageSize:c(this).data("pagesize"),columns:c(this).data("epcolumns"),showTitle:c(this).data("showtitle"),showPaging:c(this).data("showpaging"),autonext:c(this).data("autonext"),thumbplay:c(this).data("thumbplay")}};var k=c(this).hasClass("epyt-next"),n=parseInt(a.data("currpage")+"");a.data("currpage",n+(k?1:-1));
c.post(_EPYT_.ajaxurl,f,function(l){a.find(".epyt-gallery-list").html(l);a.find(".epyt-current").each(function(){c(this).text(a.data("currpage"))});a.find('.epyt-gallery-thumb[data-videoid="'+a.data("currvid")+'"]').addClass("epyt-current-video");"1"!=a.find(".epyt-pagebutton").first().data("autonext")||h||a.find(".epyt-gallery-thumb").first().trigger("click")}).fail(function(){alert("Sorry, there was an error loading the next page.")}).always(function(){a.find(".epyt-gallery-list").removeClass("epyt-loading");
if("1"!=a.find(".epyt-pagebutton").first().data("autonext")){var l=Math.max(c("body").scrollTop(),c("html").scrollTop()),m=a.find(".epyt-gallery-list").offset().top-parseInt(_EPYT_.gallery_scrolloffset);l>m&&c("html, body").animate({scrollTop:m},500)}})}}).on("touchmove",function(f){b._EPYT_.touchmoved=!0}).on("touchstart",function(){b._EPYT_.touchmoved=!1})}});c(".__youtube_prefs_gdpr__.epyt-is-override").each(function(){c(this).parent(".wp-block-embed__wrapper").addClass("epyt-is-override__wrapper")});
c("button.__youtube_prefs_gdpr__").on("click",function(a){a.preventDefault();c.cookie&&(c.cookie("ytprefs_gdpr_consent","1",{expires:30,path:"/"}),b.top.location.reload())});c("img.epyt-facade-poster").on("load.epyt",function(){b._EPADashboard_.resolveFacadeQuality(this,!1)}).on("error",function(){b._EPADashboard_.resolveFacadeQuality(this,!0)}).each(function(){this.complete&&c(this).trigger("load")});c(".epyt-facade-play").each(function(){c(this).find("svg").length||c(this).append('<svg data-no-lazy="1" height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>')});
c(".epyt-facade-poster[data-facadeoembed]").each(function(){var a=c(this);if(!a.data("facadeoembedcomplete")){a.data("facadeoembedcomplete","1");var d="https://www.youtube.com/"+a.data("facadeoembed");c.get("https://youtube.com/oembed",{url:d,format:"json"},function(e){a.attr("src",e.thumbnail_url.replace("hqdefault","maxresdefault"))},"json").fail(function(){}).always(function(){})}});c(document).on("click",".epyt-facade",function(a){a=c(this);var d=a.attr("data-facadesrc");d=b._EPADashboard_.cleanSrc(d);
for(var e=document.createElement("iframe"),g=0;g<this.attributes.length;g++){var f=this.attributes[g];(0<=["allow","class","height","id","width"].indexOf(f.name.toLowerCase())||0==f.name.toLowerCase().indexOf("data-"))&&c(e).attr(f.name,f.value)}c(e).removeClass("epyt-facade");c(e).attr("allowfullscreen","").attr("title",a.find("img").attr("alt")).attr("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");b._EPADashboard_.loadYTAPI();a.replaceWith(e);
c(e).attr("src",d);b._EPADashboard_.setupevents(c(e).attr("id"));setTimeout(function(){"undefined"!==typeof c.fn.fitVidsEP&&c(c(e).parent()).fitVidsEP()},1)})}});b.onYouTubeIframeAPIReady="undefined"!==typeof b.onYouTubeIframeAPIReady?b.onYouTubeIframeAPIReady:function(){if(b._EPYT_.pageLoaded)b._EPADashboard_.apiInit(),b._EPADashboard_.log("YT API ready");else c(b).on("load._EPYT_",function(){b._EPADashboard_.apiInit();b._EPADashboard_.log("YT API ready 2")})};(!b._EPYT_.facade_mode||b._EPYT_.not_live_on_channel&&
c('iframe[src*="youtube.com/embed/live_stream"], iframe[data-src*="youtube.com/embed/live_stream"]').length)&&b._EPADashboard_.loadYTAPI();if(b._EPYT_.pageLoaded)b._EPADashboard_.doubleCheck();else c(b).on("load._EPYT_",function(){b._EPADashboard_.doubleCheck()});c(document).ready(function(){b._EPADashboard_.pageReady();(!b._EPYT_.facade_mode||b._EPYT_.not_live_on_channel&&c('iframe[src*="youtube.com/embed/live_stream"], iframe[data-src*="youtube.com/embed/live_stream"]').length)&&b._EPADashboard_.loadYTAPI();
if(b._EPYT_.ajax_compat)c(b).on("load._EPYT_",function(){c(document).ajaxSuccess(function(a,d,e){d&&d.responseText&&(-1!==d.responseText.indexOf("<iframe ")||-1!==d.responseText.indexOf("enablejsapi"))&&(b._EPADashboard_.loadYTAPI(),b._EPADashboard_.apiInit(),b._EPADashboard_.log("YT API AJAX"),b._EPADashboard_.pageReady())})})})})(window,jQuery);