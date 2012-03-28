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

if (typeof $ == 'undefined')
    $ = {}

$.rules = {
    '101domain.com' : {
        'title' : '',
        'chars' : '',
        'length' : 0
    },
    'alipay.com' : {
        'title' : '支付宝',
        'chars' : '',
        'length' : 0
    },
    'facebook.com' : {
        'title' : '',
        'chars' : '',
        'length' : 0
    },
    'github.com' : {
        'title' : 'GitHub',
        'chars' : '',
        'length' : 0
    },
    'google.com' : {
        'title' : '',
        'chars' : '',
        'length' : 0
    },
    'qq.com' : {
        'title' : 'QQ',
        'chars' : '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
        'length' : 16
    },
    'taobao.com' : {
        'title' : '淘宝网',
        'chars' : '',
        'length' : 16
    },
    'twitter.com' : {
        'title' : '',
        'chars' : '',
        'length' : 0
    },
	'weibo.com' : {
        'title' : '新浪微博',
        'chars' : '',
        'length' : 16
    },
    'my.cl.ly' : {
        'title' : 'CloudApp',
        'chars' : '',
        'length' : 32
    },
    'readability.com' : {
        'title' : '',
        'chars' : '',
        'length' : 32
    },
    'readitlaterlist.com' : {
        'title' : 'Read it Later',
        'chars' : '',
        'length' : 32
    },
    'gravatar.com' : {
        'title' : '',
        'chars' : '',
        'length' : 32
    },
    'bitbucket.org' : {
        'title' : '',
        'chars' : '',
        'length' : 32
    },
}

// vim: se ft=javascript fenc=utf-8 ff=unix tw=198486:
