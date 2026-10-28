const assert=require('node:assert/strict'),C=require('./core.js');
assert.equal(C.validate(' https://example.com/a?x=1&b=2 ','url'),'https://example.com/a?x=1&b=2');
for(const text of ['javascript:alert(1)','example.com','https://user:pass@example.com',''])assert.throws(()=>C.validate(text,'url'));
assert.equal(C.validate('  Halo\n世界 🐈  ','text'),'  Halo\n世界 🐈  ');
assert.throws(()=>C.validate('🐈'.repeat(301),'text'));
assert.equal(C.colors('#000000','#ffffff').valid,true);
assert.equal(C.colors('#ffffff','#000000').valid,false);
assert.equal(C.colors('#dddddd','#ffffff').valid,false);
for(const level of ['M','Q','H']){const qr=C.generate('https://example.com',level);assert.ok(qr.getModuleCount()>=21);assert.ok(C.svg(qr,'#242d27','#ffffff').includes('viewBox='));}
assert.throws(()=>C.svg(C.generate('a'),'red','white'));
console.log('Core checks passed: links, unsafe schemes, credentials, Unicode limit, contrast, SVG and all correction levels.');
