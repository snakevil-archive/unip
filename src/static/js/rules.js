/*
 * Declares the password rules of most popular online services.
 *
 * This file is part of UniP.
 *
 * UniP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * UniP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with UniP.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    Snakevil Zen <zsnakevil@gmail.com>
 * @copyright © 2012 snakevil.in
 * @license   http://www.gnu.org/licenses/gpl-3.0.html
 */

$SYS.ns("UNIP", function(){
	eval($SYS._shortName());
	var rules = this.rules = {};
	function Service(name, title, chars, length){
		rules[name] = this;
		if(is.s(title)){
			this.title = title;
		}
		if(is.s(chars)){
			this.chars = chars;
		}
		if(is.n(length) && length > 0){
			this.length = Math.min(length, Service.prototype.length);
		}
	}
	Service.prototype = {
		title : "",
		chars : " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
		length : 32
	};
	new Service("101domain.com");
	new Service("alipay.com", "支付宝", null, 20);
	new Service("facebook.com");
	new Service("github.com", "GitHub");
	new Service("google.com");
	new Service("qq.com", "QQ", "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~", 16);
	new Service("taobao.com", "淘宝网", "!#$%&()*+-./0123456789?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\\^_abcdefghijklmnopqrstuvwxyz~", 16);
	new Service("twitter.com");
	new Service("weibo.com", "新浪微博", "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~", 16);
	new Service("my.cl.ly", "CloudApp");
	new Service("readability.com");
	new Service("readitlaterlist.com", "Read it Later");
	new Service("paypal.com", "PayPal", null, 20);
    new Service("gravatar.com");
    new Service("bitbucket.org");
    new Service("bitly.com");
    new Service("apple.com");
    new Service("doit.im");
    new Service("xunlei.com", "迅雷");
    new Service("douban.com", "豆瓣");
    new Service("infoq.com", "InfoQ");
    new Service("jiankongbao.com", "监控宝");
    new Service("zhaopin.com", "智联招聘", null, 25);
    new Service("amazon.cn", "亚马逊");
    new Service("evernote.com");
    new Service("ps3trophies.com", "PS3Trophies");
    new Service("appshopper.com", "AppShopper", null, 19);
    new Service("playfire.com");
    new Service("parallels.com", null, null, 16);
    new Service("feidee.com", "金蝶随手记", null, 16);
    new Service("rashost.com", "瑞豪开源");
    new Service("coo8.com", "库巴", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 16);
    new Service("sublimetext.com", "Sublime Text", null, 30);
});

// vim: se ft=javascript fenc=utf-8 ff=unix tw=198486:
