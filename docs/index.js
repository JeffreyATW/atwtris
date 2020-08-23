!function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e,r){"use strict";e.__esModule=!0;var o=r(10),n=function(){function t(){this.rotation=0}return t.prototype.getRotatedGrid=function(t){return void 0===t&&(t=0),o(this.grid,this.rotation+t)},t}();e.default=n},function(t,e,r){"use strict";e.__esModule=!0;var o=function(){function t(){}return t.prototype.text=function(){return"O"},t}();e.default=o},function(t,e,r){"use strict";e.__esModule=!0;var o=function(){function t(t){this.contents=t}return t.prototype.text=function(){return this.contents?this.contents.text():" "},t}();e.default=o},function(t,e,r){"use strict";e.__esModule=!0,(new(r(4).default)).start()},function(t,e,r){"use strict";var o=this&&this.__spreadArrays||function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var o=Array(t),n=0;for(e=0;e<r;e++)for(var i=arguments[e],u=0,a=i.length;u<a;u++,n++)o[n]=i[u];return o};e.__esModule=!0;var n=r(5),i=r(8),u=r(17),a=r(2),c=r(1),s=function(){function t(){var e=this;this.update=function(){var r=!1,o=!1,n=!1,i=e.board.clearCount;if(e.board.activeTetromino){var s=!1;t.actionKeys.includes(e.currentKeyCode)&&(null===e.keyDownStep&&(e.keyDownStep=e.step),t.directionalKeys.includes(e.currentKeyCode)?(e.step-e.keyDownStep)%6==0&&(t.moveKeys.includes(e.currentKeyCode)?r=e.board.move(e.currentKeyCode===u.default.LEFT?-1:1):s=r=e.board.softDrop()):e.keyDownStep===e.step&&(t.rotateKeys.includes(e.currentKeyCode)?r=e.board.rotate(e.currentKeyCode===u.default.Z?-1:1):s=r=e.board.hardDrop())),s&&(e.board.setActiveTetromino(e.queue.pop())?(o=!0,n=Math.floor(i/10)!==Math.floor(e.board.clearCount/10)):(alert("Game over!"),clearInterval(e.loop)))}else e.board.setActiveTetromino(e.queue.pop()),r=!0,o=!0,n=!0;if(r){var f="",l=e.board.getGrid();l.forEach((function(t,e){0===e&&(f+="_",t.forEach((function(){f+="_"})),f+="_\n"),f+="|",t.forEach((function(t){f+=t.text()})),f+="|\n",e===l.length-1&&(f+="‾",t.forEach((function(){f+="‾"})),f+="‾")})),e.elements.board.innerText=f}if(o){var p="_NEXT_\n";e.queue.tetrominos.forEach((function(t,e){for(var r=0;r<=2;r+=1){var o=3===e&&2===r;o||(p+="|");for(var n=r-t.startingRow,i=0;i<4;i+=1){var u=t.grid[0].length<3?i-1:i;if(2===r)o||(p+="-");else{var s=new a.default(t.grid[n][u]?new c.default:void 0);p+=s.text()}}o||(p+="|\n")}}));for(var d=0;d<6;d+=1)p+="‾";e.elements.queue.innerText=p}if(n){var _="LEVEL_\n|",h=Math.floor(e.board.clearCount/10)+1;h<100&&(_+=" "),_+=Math.min(h,999),h<10&&(_+=" "),_+=h>1e3?"+":" ",_+="|\n‾‾‾‾‾‾",e.elements.level.innerText=_}e.step+=1},this.start=function(){e.board=new n.default,e.queue=new i.default,e.currentKeyCode=null,e.keyDownStep=null,e.step=0,window.addEventListener("keydown",(function(t){e.keyDownStep=null,e.currentKeyCode=t.keyCode})),window.addEventListener("keyup",(function(t){e.currentKeyCode===t.keyCode&&(e.keyDownStep=null,e.currentKeyCode=null)})),e.elements={},e.elements.board=document.getElementById("board"),e.elements.queue=document.getElementById("queue"),e.elements.level=document.getElementById("level"),e.loop=setInterval(e.update,1e3/60)}}return t.moveKeys=[u.default.LEFT,u.default.RIGHT],t.directionalKeys=o(t.moveKeys,[u.default.DOWN]),t.rotateKeys=[u.default.Z,u.default.X],t.actionKeys=o(t.directionalKeys,t.rotateKeys,[u.default.UP]),t}();e.default=s},function(t,e,r){"use strict";var o=this&&this.__spreadArrays||function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var o=Array(t),n=0;for(e=0;e<r;e++)for(var i=arguments[e],u=0,a=i.length;u<a;u++,n++)o[n]=i[u];return o};e.__esModule=!0;var n=r(2),i=r(1),u=r(6),a=r(7),c=function(){function t(){this.clearCount=0,this.grid=Array.apply(null,new Array(t.height)).map(this.generateRow)}return t.prototype.generateRow=function(){return Array.apply(null,new Array(t.width)).map((function(){return new n.default}))},t.prototype.getGrid=function(t){if(void 0===t&&(t=!1),!this.activeTetromino)return this.grid;var e=this.activeTetromino,r=e.tetromino,c=e.x,s=e.y,f=o(this.grid).map((function(t){return o(t)})),l=r.getRotatedGrid(),p=this.getHardDropY(l,c,s);return l.forEach((function(e,r){e.forEach((function(e,o){if(e){var l=f[p+r];if(l)l[c+o]&&(l[c+o]=new n.default(new a.default));var d=f[s+r];if(d)d[c+o]&&(d[c+o]=new n.default(t?new u.default:new i.default))}}))})),f},t.prototype.getHardDropY=function(t,e,r){for(var o=r;!this.doesTetrominoOverlap(t,e,o+1);)o+=1;return o},t.prototype.deactivateTetromino=function(){for(var e=this.getGrid(!0).reduce((function(t,e,r){return e.every((function(t){return t.contents instanceof u.default}))||t.push(e),t}),[]),r=t.height-e.length,o=0;o<r;o+=1)e.unshift(this.generateRow());this.clearCount+=r,this.grid=e,delete this.activeTetromino},t.prototype.move=function(t){return!(!this.activeTetromino||!this.canMove(t))&&(this.activeTetromino.x+=t,!0)},t.prototype.softDrop=function(){return!!this.activeTetromino&&(this.canSoftDrop()?this.activeTetromino.y+=1:this.deactivateTetromino(),!0)},t.prototype.hardDrop=function(){if(this.activeTetromino){var t=this.activeTetromino,e=t.tetromino,r=t.x,o=t.y,n=e.getRotatedGrid();return this.activeTetromino.y=this.getHardDropY(n,r,o),this.deactivateTetromino(),!0}return!1},t.prototype.rotate=function(e){if(this.activeTetromino){var r=this.activeTetromino,o=r.tetromino,n=r.x,i=r.y,u=o.getRotatedGrid(e);if(!this.doesTetrominoOverlap(u,n,i))return this.activeTetromino.tetromino.rotation+=e,!0;if(!this.doesTetrominoOverlap(u,n,i-1))return this.activeTetromino.tetromino.rotation+=e,this.activeTetromino.y-=1,!0;var a=Math.max(n,0);if(n<t.width/2&&!this.doesTetrominoOverlap(u,a,i))return this.activeTetromino.tetromino.rotation+=e,this.activeTetromino.x=a,!0;if(!this.doesTetrominoOverlap(u,n-1,i))return this.activeTetromino.tetromino.rotation+=e,this.activeTetromino.x-=1,!0}return!1},t.prototype.setActiveTetromino=function(t){var e=t.startingCol,r=t.startingRow;return this.activeTetromino={tetromino:t,x:e,y:r},!this.doesTetrominoOverlap(t.getRotatedGrid(),e,r)},t.prototype.canMove=function(t){var e=this.activeTetromino,r=e.tetromino,o=e.x,n=e.y;return!this.doesTetrominoOverlap(r.getRotatedGrid(),o+t,n)},t.prototype.canSoftDrop=function(){var t=this.activeTetromino,e=t.tetromino,r=t.x,o=t.y;return!this.doesTetrominoOverlap(e.getRotatedGrid(),r,o+1)},t.prototype.doesTetrominoOverlap=function(t,e,r){for(var o=0;o<t.length;o+=1)for(var n=0;n<t[o].length;n+=1)if(t[o][n]){var i=Math.max(r+o,0),u=this.grid[i];if(!u)return!0;var a=u[e+n];if(!a)return!0;if(a.contents)return!0}return!1},t.height=20,t.width=10,t}();e.default=c},function(t,e,r){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});e.__esModule=!0;var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.text=function(){return"X"},e}(r(1).default);e.default=i},function(t,e,r){"use strict";e.__esModule=!0;var o=function(){function t(){}return t.prototype.text=function(){return"☐"},t}();e.default=o},function(t,e,r){"use strict";e.__esModule=!0;var o=r(9),n=r(11),i=r(12),u=r(13),a=r(14),c=r(15),s=r(16),f=function(){function t(){this.tetrominos=[];for(var e=0;e<4;e+=1)this.tetrominos.push(new(t.getRandom()))}return t.getRandom=function(){var e=Math.floor(t.blocks.length*Math.random());return t.blocks[e]},t.prototype.pop=function(){return this.tetrominos.push(new(t.getRandom())),this.tetrominos.shift()},t.blocks=[o.default,n.default,i.default,u.default,a.default,c.default,s.default],t}();e.default=f},function(t,e,r){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});e.__esModule=!0;var i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.grid=[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],e.startingCol=3,e.startingRow=-1,e}return n(e,t),e}(r(0).default);e.default=i},function(t,e,r){!function(r){"use strict";function o(t,e){if(!(Array.isArray(t)&&t.length>0))return[];if("number"!=typeof e)e=1;else{if(0===e)return t;e%=4}var r,o;for(r=o=t;0!==e;){o=[];for(var n=0,i=r.length;n<i;n++){for(var u=0,a=r[n].length;u<a;u++){if(i!==a)return[];o[n]=o[n]||[],o[n][u]=r[u][n]}e>0&&(o[n]=o[n].reverse())}e<0?(o.reverse(),e++):e--,r=o}return o}t.exports&&(e=t.exports=o),e.rotateMatrix=o}()},function(t,e,r){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});e.__esModule=!0;var i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.grid=[[1,0,0],[1,1,1],[0,0,0]],e.startingCol=3,e.startingRow=0,e}return n(e,t),e}(r(0).default);e.default=i},function(t,e,r){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});e.__esModule=!0;var i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.grid=[[0,0,0],[1,1,1],[1,0,0]],e.startingCol=3,e.startingRow=-1,e}return n(e,t),e}(r(0).default);e.default=i},function(t,e,r){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});e.__esModule=!0;var i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.grid=[[1,1],[1,1]],e.startingCol=4,e.startingRow=0,e}return n(e,t),e}(r(0).default);e.default=i},function(t,e,r){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});e.__esModule=!0;var i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.grid=[[0,1,1],[1,1,0],[0,0,0]],e.startingCol=3,e.startingRow=0,e}return n(e,t),e}(r(0).default);e.default=i},function(t,e,r){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});e.__esModule=!0;var i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.grid=[[0,1,0],[1,1,1],[0,0,0]],e.startingCol=3,e.startingRow=0,e}return n(e,t),e}(r(0).default);e.default=i},function(t,e,r){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});e.__esModule=!0;var i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.grid=[[1,1,0],[0,1,1],[0,0,0]],e.startingCol=3,e.startingRow=0,e}return n(e,t),e}(r(0).default);e.default=i},function(t,e,r){"use strict";e.__esModule=!0,e.default={SPACE:32,NUM_0:48,NUM_1:49,NUM_2:50,NUM_3:51,NUM_4:52,NUM_5:53,NUM_6:54,NUM_7:55,NUM_8:56,NUM_9:57,SEMI_COLON:59,EQUALS:61,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUM_PAD_0:96,NUM_PAD_1:97,NUM_PAD_2:98,NUM_PAD_3:99,NUM_PAD_4:100,NUM_PAD_5:101,NUM_PAD_6:102,NUM_PAD_7:103,NUM_PAD_8:104,NUM_PAD_9:105,MULTIPLY:106,ADD:107,SEPARATOR:108,SUBTRACT:109,DECIMAL:110,DIVIDE:111,COMMA:188,PERIOD:190,SLASH:191,BACK_QUOTE:192,OPEN_BRACKET:219,BACK_SLASH:220,CLOSE_BRACKET:221,QUOTE:222,META:224,CANCEL:3,HELP:6,BACK_SPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,CONTEXT_MENU:93,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,F16:127,F17:128,F18:129,F19:130,F20:131,F21:132,F22:133,F23:134,F24:135,NUM_LOCK:144,SCROLL_LOCK:145}}]);