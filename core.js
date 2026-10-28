(function(root){
'use strict';
const library=typeof module!=='undefined'?require('./vendor/qrcode.js'):root.qrcode;
library.stringToBytes=s=>Array.from(new TextEncoder().encode(s));
function luminance(hex){if(!/^#[0-9a-f]{6}$/i.test(hex))throw Error('Choose a valid color.');const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];}
function colors(ink,paper){const a=luminance(ink),b=luminance(paper);return{ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),valid:b>a&&(b+.05)/(a+.05)>=4.5};}
function validate(raw,mode){const text=mode==='url'?raw.trim():raw;if(!text.trim())throw Error('Add a link or some text to create your QR.');if(new TextEncoder().encode(text).length>1200)throw Error('Keep your content under 1,200 UTF-8 bytes.');if(mode==='url'){let url;try{url=new URL(text);}catch{throw Error('Enter a complete link, such as https://example.com.');}if(!['https:','http:'].includes(url.protocol)||!url.hostname)throw Error('Use an https:// or http:// website link.');if(url.username||url.password)throw Error('Remove the username or password from this link.');}return text;}
function generate(text,level='M'){if(!['M','Q','H'].includes(level))throw Error('Invalid error correction level.');const qr=library(0,level);qr.addData(text,'Byte');qr.make();return qr;}
function svg(qr,ink,paper){if(!colors(ink,paper).valid)throw Error('Use a dark code on a light background with stronger contrast.');const n=qr.getModuleCount(),side=n+8;let path='';for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(qr.isDark(y,x))path+=`M${x+4} ${y+4}h1v1h-1z`;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" width="${side*10}" height="${side*10}" shape-rendering="crispEdges"><rect width="${side}" height="${side}" fill="${paper}"/><path d="${path}" fill="${ink}"/></svg>`;}
const api={colors,validate,generate,svg};if(typeof module!=='undefined')module.exports=api;else root.QRCore=api;
})(globalThis);
