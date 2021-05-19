(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[1249],{39593:(e,t,r)=>{"use strict";const s=r(34411);const n=Symbol("max");const i=Symbol("length");const o=Symbol("lengthCalculator");const l=Symbol("allowStale");const a=Symbol("maxAge");const h=Symbol("dispose");const c=Symbol("noDisposeOnSet");const u=Symbol("lruList");const f=Symbol("cache");const p=Symbol("updateAgeOnGet");const E=()=>1;class m{constructor(e){if(typeof e==="number")e={max:e};if(!e)e={};if(e.max&&(typeof e.max!=="number"||e.max<0))throw new TypeError("max must be a non-negative number");const t=this[n]=e.max||Infinity;const r=e.length||E;this[o]=typeof r!=="function"?E:r;this[l]=e.stale||false;if(e.maxAge&&typeof e.maxAge!=="number")throw new TypeError("maxAge must be a number");this[a]=e.maxAge||0;this[h]=e.dispose;this[c]=e.noDisposeOnSet||false;this[p]=e.updateAgeOnGet||false;this.reset()}set max(e){if(typeof e!=="number"||e<0)throw new TypeError("max must be a non-negative number");this[n]=e||Infinity;R(this)}get max(){return this[n]}set allowStale(e){this[l]=!!e}get allowStale(){return this[l]}set maxAge(e){if(typeof e!=="number")throw new TypeError("maxAge must be a non-negative number");this[a]=e;R(this)}get maxAge(){return this[a]}set lengthCalculator(e){if(typeof e!=="function")e=E;if(e!==this[o]){this[o]=e;this[i]=0;this[u].forEach((e=>{e.length=this[o](e.value,e.key);this[i]+=e.length}))}R(this)}get lengthCalculator(){return this[o]}get length(){return this[i]}get itemCount(){return this[u].length}rforEach(e,t){t=t||this;for(let r=this[u].tail;r!==null;){const s=r.prev;d(this,e,r,t);r=s}}forEach(e,t){t=t||this;for(let r=this[u].head;r!==null;){const s=r.next;d(this,e,r,t);r=s}}keys(){return this[u].toArray().map((e=>e.key))}values(){return this[u].toArray().map((e=>e.value))}reset(){if(this[h]&&this[u]&&this[u].length){this[u].forEach((e=>this[h](e.key,e.value)))}this[f]=new Map;this[u]=new s;this[i]=0}dump(){return this[u].map((e=>$(this,e)?false:{k:e.key,v:e.value,e:e.now+(e.maxAge||0)})).toArray().filter((e=>e))}dumpLru(){return this[u]}set(e,t,r){r=r||this[a];if(r&&typeof r!=="number")throw new TypeError("maxAge must be a number");const s=r?Date.now():0;const l=this[o](t,e);if(this[f].has(e)){if(l>this[n]){I(this,this[f].get(e));return false}const o=this[f].get(e);const a=o.value;if(this[h]){if(!this[c])this[h](e,a.value)}a.now=s;a.maxAge=r;a.value=t;this[i]+=l-a.length;a.length=l;this.get(e);R(this);return true}const p=new g(e,t,l,s,r);if(p.length>this[n]){if(this[h])this[h](e,t);return false}this[i]+=p.length;this[u].unshift(p);this[f].set(e,this[u].head);R(this);return true}has(e){if(!this[f].has(e))return false;const t=this[f].get(e).value;return!$(this,t)}get(e){return v(this,e,true)}peek(e){return v(this,e,false)}pop(){const e=this[u].tail;if(!e)return null;I(this,e);return e.value}del(e){I(this,this[f].get(e))}load(e){this.reset();const t=Date.now();for(let r=e.length-1;r>=0;r--){const s=e[r];const n=s.e||0;if(n===0)this.set(s.k,s.v);else{const e=n-t;if(e>0){this.set(s.k,s.v,e)}}}}prune(){this[f].forEach(((e,t)=>v(this,t,false)))}}const v=(e,t,r)=>{const s=e[f].get(t);if(s){const t=s.value;if($(e,t)){I(e,s);if(!e[l])return undefined}else{if(r){if(e[p])s.value.now=Date.now();e[u].unshiftNode(s)}}return t.value}};const $=(e,t)=>{if(!t||!t.maxAge&&!e[a])return false;const r=Date.now()-t.now;return t.maxAge?r>t.maxAge:e[a]&&r>e[a]};const R=e=>{if(e[i]>e[n]){for(let t=e[u].tail;e[i]>e[n]&&t!==null;){const r=t.prev;I(e,t);t=r}}};const I=(e,t)=>{if(t){const r=t.value;if(e[h])e[h](r.key,r.value);e[i]-=r.length;e[f].delete(r.key);e[u].removeNode(t)}};class g{constructor(e,t,r,s,n){this.key=e;this.value=t;this.length=r;this.now=s;this.maxAge=n||0}}const d=(e,t,r,s)=>{let n=r.value;if($(e,n)){I(e,r);if(!e[l])n=undefined}if(n)t.call(s,n.value,n.key,e)};e.exports=m},22257:(e,t,r)=>{const s=Symbol("SemVer ANY");class n{static get ANY(){return s}constructor(e,t){t=i(t);if(e instanceof n){if(e.loose===!!t.loose){return e}else{e=e.value}}h("comparator",e,t);this.options=t;this.loose=!!t.loose;this.parse(e);if(this.semver===s){this.value=""}else{this.value=this.operator+this.semver.version}h("comp",this)}parse(e){const t=this.options.loose?o[l.COMPARATORLOOSE]:o[l.COMPARATOR];const r=e.match(t);if(!r){throw new TypeError(`Invalid comparator: ${e}`)}this.operator=r[1]!==undefined?r[1]:"";if(this.operator==="="){this.operator=""}if(!r[2]){this.semver=s}else{this.semver=new c(r[2],this.options.loose)}}toString(){return this.value}test(e){h("Comparator.test",e,this.options.loose);if(this.semver===s||e===s){return true}if(typeof e==="string"){try{e=new c(e,this.options)}catch(t){return false}}return a(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof n)){throw new TypeError("a Comparator is required")}if(!t||typeof t!=="object"){t={loose:!!t,includePrerelease:false}}if(this.operator===""){if(this.value===""){return true}return new u(e.value,t).test(this.value)}else if(e.operator===""){if(e.value===""){return true}return new u(this.value,t).test(e.semver)}const r=(this.operator===">="||this.operator===">")&&(e.operator===">="||e.operator===">");const s=(this.operator==="<="||this.operator==="<")&&(e.operator==="<="||e.operator==="<");const i=this.semver.version===e.semver.version;const o=(this.operator===">="||this.operator==="<=")&&(e.operator===">="||e.operator==="<=");const l=a(this.semver,"<",e.semver,t)&&(this.operator===">="||this.operator===">")&&(e.operator==="<="||e.operator==="<");const h=a(this.semver,">",e.semver,t)&&(this.operator==="<="||this.operator==="<")&&(e.operator===">="||e.operator===">");return r||s||i&&o||l||h}}e.exports=n;const i=r(12893);const{re:o,t:l}=r(55765);const a=r(7539);const h=r(74225);const c=r(26376);const u=r(66902)},66902:(e,t,r)=>{class s{constructor(e,t){t=o(t);if(e instanceof s){if(e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease){return e}else{return new s(e.raw,t)}}if(e instanceof l){this.raw=e.value;this.set=[[e]];this.format();return this}this.options=t;this.loose=!!t.loose;this.includePrerelease=!!t.includePrerelease;this.raw=e;this.set=e.split(/\s*\|\|\s*/).map((e=>this.parseRange(e.trim()))).filter((e=>e.length));if(!this.set.length){throw new TypeError(`Invalid SemVer Range: ${e}`)}if(this.set.length>1){const e=this.set[0];this.set=this.set.filter((e=>!m(e[0])));if(this.set.length===0)this.set=[e];else if(this.set.length>1){for(const e of this.set){if(e.length===1&&v(e[0])){this.set=[e];break}}}}this.format()}format(){this.range=this.set.map((e=>e.join(" ").trim())).join("||").trim();return this.range}toString(){return this.range}parseRange(e){e=e.trim();const t=Object.keys(this.options).join(",");const r=`parseRange:${t}:${e}`;const s=i.get(r);if(s)return s;const n=this.options.loose;const o=n?c[u.HYPHENRANGELOOSE]:c[u.HYPHENRANGE];e=e.replace(o,y(this.options.includePrerelease));a("hyphen replace",e);e=e.replace(c[u.COMPARATORTRIM],f);a("comparator trim",e,c[u.COMPARATORTRIM]);e=e.replace(c[u.TILDETRIM],p);e=e.replace(c[u.CARETTRIM],E);e=e.split(/\s+/).join(" ");const h=n?c[u.COMPARATORLOOSE]:c[u.COMPARATOR];const v=e.split(" ").map((e=>R(e,this.options))).join(" ").split(/\s+/).map((e=>T(e,this.options))).filter(this.options.loose?e=>!!e.match(h):()=>true).map((e=>new l(e,this.options)));const $=v.length;const I=new Map;for(const i of v){if(m(i))return[i];I.set(i.value,i)}if(I.size>1&&I.has(""))I.delete("");const g=[...I.values()];i.set(r,g);return g}intersects(e,t){if(!(e instanceof s)){throw new TypeError("a Range is required")}return this.set.some((r=>$(r,t)&&e.set.some((e=>$(e,t)&&r.every((r=>e.every((e=>r.intersects(e,t)))))))))}test(e){if(!e){return false}if(typeof e==="string"){try{e=new h(e,this.options)}catch(t){return false}}for(let r=0;r<this.set.length;r++){if(x(this.set[r],e,this.options)){return true}}return false}}e.exports=s;const n=r(39593);const i=new n({max:1e3});const o=r(12893);const l=r(22257);const a=r(74225);const h=r(26376);const{re:c,t:u,comparatorTrimReplace:f,tildeTrimReplace:p,caretTrimReplace:E}=r(55765);const m=e=>e.value==="<0.0.0-0";const v=e=>e.value==="";const $=(e,t)=>{let r=true;const s=e.slice();let n=s.pop();while(r&&s.length){r=s.every((e=>n.intersects(e,t)));n=s.pop()}return r};const R=(e,t)=>{a("comp",e,t);e=N(e,t);a("caret",e);e=g(e,t);a("tildes",e);e=O(e,t);a("xrange",e);e=L(e,t);a("stars",e);return e};const I=e=>!e||e.toLowerCase()==="x"||e==="*";const g=(e,t)=>e.trim().split(/\s+/).map((e=>d(e,t))).join(" ");const d=(e,t)=>{const r=t.loose?c[u.TILDELOOSE]:c[u.TILDE];return e.replace(r,((t,r,s,n,i)=>{a("tilde",e,t,r,s,n,i);let o;if(I(r)){o=""}else if(I(s)){o=`>=${r}.0.0 <${+r+1}.0.0-0`}else if(I(n)){o=`>=${r}.${s}.0 <${r}.${+s+1}.0-0`}else if(i){a("replaceTilde pr",i);o=`>=${r}.${s}.${n}-${i} <${r}.${+s+1}.0-0`}else{o=`>=${r}.${s}.${n} <${r}.${+s+1}.0-0`}a("tilde return",o);return o}))};const N=(e,t)=>e.trim().split(/\s+/).map((e=>A(e,t))).join(" ");const A=(e,t)=>{a("caret",e,t);const r=t.loose?c[u.CARETLOOSE]:c[u.CARET];const s=t.includePrerelease?"-0":"";return e.replace(r,((t,r,n,i,o)=>{a("caret",e,t,r,n,i,o);let l;if(I(r)){l=""}else if(I(n)){l=`>=${r}.0.0${s} <${+r+1}.0.0-0`}else if(I(i)){if(r==="0"){l=`>=${r}.${n}.0${s} <${r}.${+n+1}.0-0`}else{l=`>=${r}.${n}.0${s} <${+r+1}.0.0-0`}}else if(o){a("replaceCaret pr",o);if(r==="0"){if(n==="0"){l=`>=${r}.${n}.${i}-${o} <${r}.${n}.${+i+1}-0`}else{l=`>=${r}.${n}.${i}-${o} <${r}.${+n+1}.0-0`}}else{l=`>=${r}.${n}.${i}-${o} <${+r+1}.0.0-0`}}else{a("no pr");if(r==="0"){if(n==="0"){l=`>=${r}.${n}.${i}${s} <${r}.${n}.${+i+1}-0`}else{l=`>=${r}.${n}.${i}${s} <${r}.${+n+1}.0-0`}}else{l=`>=${r}.${n}.${i} <${+r+1}.0.0-0`}}a("caret return",l);return l}))};const O=(e,t)=>{a("replaceXRanges",e,t);return e.split(/\s+/).map((e=>w(e,t))).join(" ")};const w=(e,t)=>{e=e.trim();const r=t.loose?c[u.XRANGELOOSE]:c[u.XRANGE];return e.replace(r,((r,s,n,i,o,l)=>{a("xRange",e,r,s,n,i,o,l);const h=I(n);const c=h||I(i);const u=c||I(o);const f=u;if(s==="="&&f){s=""}l=t.includePrerelease?"-0":"";if(h){if(s===">"||s==="<"){r="<0.0.0-0"}else{r="*"}}else if(s&&f){if(c){i=0}o=0;if(s===">"){s=">=";if(c){n=+n+1;i=0;o=0}else{i=+i+1;o=0}}else if(s==="<="){s="<";if(c){n=+n+1}else{i=+i+1}}if(s==="<")l="-0";r=`${s+n}.${i}.${o}${l}`}else if(c){r=`>=${n}.0.0${l} <${+n+1}.0.0-0`}else if(u){r=`>=${n}.${i}.0${l} <${n}.${+i+1}.0-0`}a("xRange return",r);return r}))};const L=(e,t)=>{a("replaceStars",e,t);return e.trim().replace(c[u.STAR],"")};const T=(e,t)=>{a("replaceGTE0",e,t);return e.trim().replace(c[t.includePrerelease?u.GTE0PRE:u.GTE0],"")};const y=e=>(t,r,s,n,i,o,l,a,h,c,u,f,p)=>{if(I(s)){r=""}else if(I(n)){r=`>=${s}.0.0${e?"-0":""}`}else if(I(i)){r=`>=${s}.${n}.0${e?"-0":""}`}else if(o){r=`>=${r}`}else{r=`>=${r}${e?"-0":""}`}if(I(h)){a=""}else if(I(c)){a=`<${+h+1}.0.0-0`}else if(I(u)){a=`<${h}.${+c+1}.0-0`}else if(f){a=`<=${h}.${c}.${u}-${f}`}else if(e){a=`<${h}.${c}.${+u+1}-0`}else{a=`<=${a}`}return`${r} ${a}`.trim()};const x=(e,t,r)=>{for(let s=0;s<e.length;s++){if(!e[s].test(t)){return false}}if(t.prerelease.length&&!r.includePrerelease){for(let r=0;r<e.length;r++){a(e[r].semver);if(e[r].semver===l.ANY){continue}if(e[r].semver.prerelease.length>0){const s=e[r].semver;if(s.major===t.major&&s.minor===t.minor&&s.patch===t.patch){return true}}}return false}return true}},26376:(e,t,r)=>{const s=r(74225);const{MAX_LENGTH:n,MAX_SAFE_INTEGER:i}=r(83295);const{re:o,t:l}=r(55765);const a=r(12893);const{compareIdentifiers:h}=r(86742);class c{constructor(e,t){t=a(t);if(e instanceof c){if(e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease){return e}else{e=e.version}}else if(typeof e!=="string"){throw new TypeError(`Invalid Version: ${e}`)}if(e.length>n){throw new TypeError(`version is longer than ${n} characters`)}s("SemVer",e,t);this.options=t;this.loose=!!t.loose;this.includePrerelease=!!t.includePrerelease;const r=e.trim().match(t.loose?o[l.LOOSE]:o[l.FULL]);if(!r){throw new TypeError(`Invalid Version: ${e}`)}this.raw=e;this.major=+r[1];this.minor=+r[2];this.patch=+r[3];if(this.major>i||this.major<0){throw new TypeError("Invalid major version")}if(this.minor>i||this.minor<0){throw new TypeError("Invalid minor version")}if(this.patch>i||this.patch<0){throw new TypeError("Invalid patch version")}if(!r[4]){this.prerelease=[]}else{this.prerelease=r[4].split(".").map((e=>{if(/^[0-9]+$/.test(e)){const t=+e;if(t>=0&&t<i){return t}}return e}))}this.build=r[5]?r[5].split("."):[];this.format()}format(){this.version=`${this.major}.${this.minor}.${this.patch}`;if(this.prerelease.length){this.version+=`-${this.prerelease.join(".")}`}return this.version}toString(){return this.version}compare(e){s("SemVer.compare",this.version,this.options,e);if(!(e instanceof c)){if(typeof e==="string"&&e===this.version){return 0}e=new c(e,this.options)}if(e.version===this.version){return 0}return this.compareMain(e)||this.comparePre(e)}compareMain(e){if(!(e instanceof c)){e=new c(e,this.options)}return h(this.major,e.major)||h(this.minor,e.minor)||h(this.patch,e.patch)}comparePre(e){if(!(e instanceof c)){e=new c(e,this.options)}if(this.prerelease.length&&!e.prerelease.length){return-1}else if(!this.prerelease.length&&e.prerelease.length){return 1}else if(!this.prerelease.length&&!e.prerelease.length){return 0}let t=0;do{const r=this.prerelease[t];const n=e.prerelease[t];s("prerelease compare",t,r,n);if(r===undefined&&n===undefined){return 0}else if(n===undefined){return 1}else if(r===undefined){return-1}else if(r===n){continue}else{return h(r,n)}}while(++t)}compareBuild(e){if(!(e instanceof c)){e=new c(e,this.options)}let t=0;do{const r=this.build[t];const n=e.build[t];s("prerelease compare",t,r,n);if(r===undefined&&n===undefined){return 0}else if(n===undefined){return 1}else if(r===undefined){return-1}else if(r===n){continue}else{return h(r,n)}}while(++t)}inc(e,t){switch(e){case"premajor":this.prerelease.length=0;this.patch=0;this.minor=0;this.major++;this.inc("pre",t);break;case"preminor":this.prerelease.length=0;this.patch=0;this.minor++;this.inc("pre",t);break;case"prepatch":this.prerelease.length=0;this.inc("patch",t);this.inc("pre",t);break;case"prerelease":if(this.prerelease.length===0){this.inc("patch",t)}this.inc("pre",t);break;case"major":if(this.minor!==0||this.patch!==0||this.prerelease.length===0){this.major++}this.minor=0;this.patch=0;this.prerelease=[];break;case"minor":if(this.patch!==0||this.prerelease.length===0){this.minor++}this.patch=0;this.prerelease=[];break;case"patch":if(this.prerelease.length===0){this.patch++}this.prerelease=[];break;case"pre":if(this.prerelease.length===0){this.prerelease=[0]}else{let e=this.prerelease.length;while(--e>=0){if(typeof this.prerelease[e]==="number"){this.prerelease[e]++;e=-2}}if(e===-1){this.prerelease.push(0)}}if(t){if(this.prerelease[0]===t){if(isNaN(this.prerelease[1])){this.prerelease=[t,0]}}else{this.prerelease=[t,0]}}break;default:throw new Error(`invalid increment argument: ${e}`)}this.format();this.raw=this.version;return this}}e.exports=c},13507:(e,t,r)=>{const s=r(33959);const n=(e,t)=>{const r=s(e.trim().replace(/^[=v]+/,""),t);return r?r.version:null};e.exports=n},7539:(e,t,r)=>{const s=r(58718);const n=r(81194);const i=r(71312);const o=r(25903);const l=r(21544);const a=r(12056);const h=(e,t,r,h)=>{switch(t){case"===":if(typeof e==="object")e=e.version;if(typeof r==="object")r=r.version;return e===r;case"!==":if(typeof e==="object")e=e.version;if(typeof r==="object")r=r.version;return e!==r;case"":case"=":case"==":return s(e,r,h);case"!=":return n(e,r,h);case">":return i(e,r,h);case">=":return o(e,r,h);case"<":return l(e,r,h);case"<=":return a(e,r,h);default:throw new TypeError(`Invalid operator: ${t}`)}};e.exports=h},99038:(e,t,r)=>{const s=r(26376);const n=r(33959);const{re:i,t:o}=r(55765);const l=(e,t)=>{if(e instanceof s){return e}if(typeof e==="number"){e=String(e)}if(typeof e!=="string"){return null}t=t||{};let r=null;if(!t.rtl){r=e.match(i[o.COERCE])}else{let t;while((t=i[o.COERCERTL].exec(e))&&(!r||r.index+r[0].length!==e.length)){if(!r||t.index+t[0].length!==r.index+r[0].length){r=t}i[o.COERCERTL].lastIndex=t.index+t[1].length+t[2].length}i[o.COERCERTL].lastIndex=-1}if(r===null)return null;return n(`${r[2]}.${r[3]||"0"}.${r[4]||"0"}`,t)};e.exports=l},88880:(e,t,r)=>{const s=r(26376);const n=(e,t,r)=>{const n=new s(e,r);const i=new s(t,r);return n.compare(i)||n.compareBuild(i)};e.exports=n},27880:(e,t,r)=>{const s=r(46269);const n=(e,t)=>s(e,t,true);e.exports=n},46269:(e,t,r)=>{const s=r(26376);const n=(e,t,r)=>new s(e,r).compare(new s(t,r));e.exports=n},62378:(e,t,r)=>{const s=r(33959);const n=r(58718);const i=(e,t)=>{if(n(e,t)){return null}else{const r=s(e);const n=s(t);const i=r.prerelease.length||n.prerelease.length;const o=i?"pre":"";const l=i?"prerelease":"";for(const e in r){if(e==="major"||e==="minor"||e==="patch"){if(r[e]!==n[e]){return o+e}}}return l}};e.exports=i},58718:(e,t,r)=>{const s=r(46269);const n=(e,t,r)=>s(e,t,r)===0;e.exports=n},71312:(e,t,r)=>{const s=r(46269);const n=(e,t,r)=>s(e,t,r)>0;e.exports=n},25903:(e,t,r)=>{const s=r(46269);const n=(e,t,r)=>s(e,t,r)>=0;e.exports=n},20253:(e,t,r)=>{const s=r(26376);const n=(e,t,r,n)=>{if(typeof r==="string"){n=r;r=undefined}try{return new s(e,r).inc(t,n).version}catch(i){return null}};e.exports=n},21544:(e,t,r)=>{const s=r(46269);const n=(e,t,r)=>s(e,t,r)<0;e.exports=n},12056:(e,t,r)=>{const s=r(46269);const n=(e,t,r)=>s(e,t,r)<=0;e.exports=n},38679:(e,t,r)=>{const s=r(26376);const n=(e,t)=>new s(e,t).major;e.exports=n},87789:(e,t,r)=>{const s=r(26376);const n=(e,t)=>new s(e,t).minor;e.exports=n},81194:(e,t,r)=>{const s=r(46269);const n=(e,t,r)=>s(e,t,r)!==0;e.exports=n},33959:(e,t,r)=>{const{MAX_LENGTH:s}=r(83295);const{re:n,t:i}=r(55765);const o=r(26376);const l=r(12893);const a=(e,t)=>{t=l(t);if(e instanceof o){return e}if(typeof e!=="string"){return null}if(e.length>s){return null}const r=t.loose?n[i.LOOSE]:n[i.FULL];if(!r.test(e)){return null}try{return new o(e,t)}catch(a){return null}};e.exports=a},52358:(e,t,r)=>{const s=r(26376);const n=(e,t)=>new s(e,t).patch;e.exports=n},57559:(e,t,r)=>{const s=r(33959);const n=(e,t)=>{const r=s(e,t);return r&&r.prerelease.length?r.prerelease:null};e.exports=n},79795:(e,t,r)=>{const s=r(46269);const n=(e,t,r)=>s(t,e,r);e.exports=n},63657:(e,t,r)=>{const s=r(88880);const n=(e,t)=>e.sort(((e,r)=>s(r,e,t)));e.exports=n},45712:(e,t,r)=>{const s=r(66902);const n=(e,t,r)=>{try{t=new s(t,r)}catch(n){return false}return t.test(e)};e.exports=n},21100:(e,t,r)=>{const s=r(88880);const n=(e,t)=>e.sort(((e,r)=>s(e,r,t)));e.exports=n},76397:(e,t,r)=>{const s=r(33959);const n=(e,t)=>{const r=s(e,t);return r?r.version:null};e.exports=n},81249:(e,t,r)=>{const s=r(55765);e.exports={re:s.re,src:s.src,tokens:s.t,SEMVER_SPEC_VERSION:r(83295).SEMVER_SPEC_VERSION,SemVer:r(26376),compareIdentifiers:r(86742).compareIdentifiers,rcompareIdentifiers:r(86742).rcompareIdentifiers,parse:r(33959),valid:r(76397),clean:r(13507),inc:r(20253),diff:r(62378),major:r(38679),minor:r(87789),patch:r(52358),prerelease:r(57559),compare:r(46269),rcompare:r(79795),compareLoose:r(27880),compareBuild:r(88880),sort:r(21100),rsort:r(63657),gt:r(71312),lt:r(21544),eq:r(58718),neq:r(81194),gte:r(25903),lte:r(12056),cmp:r(7539),coerce:r(99038),Comparator:r(22257),Range:r(66902),satisfies:r(45712),toComparators:r(51042),maxSatisfying:r(85775),minSatisfying:r(71657),minVersion:r(95316),validRange:r(89042),outside:r(6826),gtr:r(97606),ltr:r(50032),intersects:r(62094),simplifyRange:r(17908),subset:r(50799)}},83295:e=>{const t="2.0.0";const r=256;const s=Number.MAX_SAFE_INTEGER||9007199254740991;const n=16;e.exports={SEMVER_SPEC_VERSION:t,MAX_LENGTH:r,MAX_SAFE_INTEGER:s,MAX_SAFE_COMPONENT_LENGTH:n}},74225:e=>{const t=true&&{}&&{}.NODE_DEBUG&&/\bsemver\b/i.test({}.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};e.exports=t},86742:e=>{const t=/^[0-9]+$/;const r=(e,r)=>{const s=t.test(e);const n=t.test(r);if(s&&n){e=+e;r=+r}return e===r?0:s&&!n?-1:n&&!s?1:e<r?-1:1};const s=(e,t)=>r(t,e);e.exports={compareIdentifiers:r,rcompareIdentifiers:s}},12893:e=>{const t=["includePrerelease","loose","rtl"];const r=e=>!e?{}:typeof e!=="object"?{loose:true}:t.filter((t=>e[t])).reduce(((e,t)=>{e[t]=true;return e}),{});e.exports=r},55765:(e,t,r)=>{const{MAX_SAFE_COMPONENT_LENGTH:s}=r(83295);const n=r(74225);t=e.exports={};const i=t.re=[];const o=t.src=[];const l=t.t={};let a=0;const h=(e,t,r)=>{const s=a++;n(s,t);l[e]=s;o[s]=t;i[s]=new RegExp(t,r?"g":undefined)};h("NUMERICIDENTIFIER","0|[1-9]\\d*");h("NUMERICIDENTIFIERLOOSE","[0-9]+");h("NONNUMERICIDENTIFIER","\\d*[a-zA-Z-][a-zA-Z0-9-]*");h("MAINVERSION",`(${o[l.NUMERICIDENTIFIER]})\\.`+`(${o[l.NUMERICIDENTIFIER]})\\.`+`(${o[l.NUMERICIDENTIFIER]})`);h("MAINVERSIONLOOSE",`(${o[l.NUMERICIDENTIFIERLOOSE]})\\.`+`(${o[l.NUMERICIDENTIFIERLOOSE]})\\.`+`(${o[l.NUMERICIDENTIFIERLOOSE]})`);h("PRERELEASEIDENTIFIER",`(?:${o[l.NUMERICIDENTIFIER]}|${o[l.NONNUMERICIDENTIFIER]})`);h("PRERELEASEIDENTIFIERLOOSE",`(?:${o[l.NUMERICIDENTIFIERLOOSE]}|${o[l.NONNUMERICIDENTIFIER]})`);h("PRERELEASE",`(?:-(${o[l.PRERELEASEIDENTIFIER]}(?:\\.${o[l.PRERELEASEIDENTIFIER]})*))`);h("PRERELEASELOOSE",`(?:-?(${o[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${o[l.PRERELEASEIDENTIFIERLOOSE]})*))`);h("BUILDIDENTIFIER","[0-9A-Za-z-]+");h("BUILD",`(?:\\+(${o[l.BUILDIDENTIFIER]}(?:\\.${o[l.BUILDIDENTIFIER]})*))`);h("FULLPLAIN",`v?${o[l.MAINVERSION]}${o[l.PRERELEASE]}?${o[l.BUILD]}?`);h("FULL",`^${o[l.FULLPLAIN]}$`);h("LOOSEPLAIN",`[v=\\s]*${o[l.MAINVERSIONLOOSE]}${o[l.PRERELEASELOOSE]}?${o[l.BUILD]}?`);h("LOOSE",`^${o[l.LOOSEPLAIN]}$`);h("GTLT","((?:<|>)?=?)");h("XRANGEIDENTIFIERLOOSE",`${o[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);h("XRANGEIDENTIFIER",`${o[l.NUMERICIDENTIFIER]}|x|X|\\*`);h("XRANGEPLAIN",`[v=\\s]*(${o[l.XRANGEIDENTIFIER]})`+`(?:\\.(${o[l.XRANGEIDENTIFIER]})`+`(?:\\.(${o[l.XRANGEIDENTIFIER]})`+`(?:${o[l.PRERELEASE]})?${o[l.BUILD]}?`+`)?)?`);h("XRANGEPLAINLOOSE",`[v=\\s]*(${o[l.XRANGEIDENTIFIERLOOSE]})`+`(?:\\.(${o[l.XRANGEIDENTIFIERLOOSE]})`+`(?:\\.(${o[l.XRANGEIDENTIFIERLOOSE]})`+`(?:${o[l.PRERELEASELOOSE]})?${o[l.BUILD]}?`+`)?)?`);h("XRANGE",`^${o[l.GTLT]}\\s*${o[l.XRANGEPLAIN]}$`);h("XRANGELOOSE",`^${o[l.GTLT]}\\s*${o[l.XRANGEPLAINLOOSE]}$`);h("COERCE",`${"(^|[^\\d])"+"(\\d{1,"}${s}})`+`(?:\\.(\\d{1,${s}}))?`+`(?:\\.(\\d{1,${s}}))?`+`(?:$|[^\\d])`);h("COERCERTL",o[l.COERCE],true);h("LONETILDE","(?:~>?)");h("TILDETRIM",`(\\s*)${o[l.LONETILDE]}\\s+`,true);t.tildeTrimReplace="$1~";h("TILDE",`^${o[l.LONETILDE]}${o[l.XRANGEPLAIN]}$`);h("TILDELOOSE",`^${o[l.LONETILDE]}${o[l.XRANGEPLAINLOOSE]}$`);h("LONECARET","(?:\\^)");h("CARETTRIM",`(\\s*)${o[l.LONECARET]}\\s+`,true);t.caretTrimReplace="$1^";h("CARET",`^${o[l.LONECARET]}${o[l.XRANGEPLAIN]}$`);h("CARETLOOSE",`^${o[l.LONECARET]}${o[l.XRANGEPLAINLOOSE]}$`);h("COMPARATORLOOSE",`^${o[l.GTLT]}\\s*(${o[l.LOOSEPLAIN]})$|^$`);h("COMPARATOR",`^${o[l.GTLT]}\\s*(${o[l.FULLPLAIN]})$|^$`);h("COMPARATORTRIM",`(\\s*)${o[l.GTLT]}\\s*(${o[l.LOOSEPLAIN]}|${o[l.XRANGEPLAIN]})`,true);t.comparatorTrimReplace="$1$2$3";h("HYPHENRANGE",`^\\s*(${o[l.XRANGEPLAIN]})`+`\\s+-\\s+`+`(${o[l.XRANGEPLAIN]})`+`\\s*$`);h("HYPHENRANGELOOSE",`^\\s*(${o[l.XRANGEPLAINLOOSE]})`+`\\s+-\\s+`+`(${o[l.XRANGEPLAINLOOSE]})`+`\\s*$`);h("STAR","(<|>)?=?\\s*\\*");h("GTE0","^\\s*>=\\s*0.0.0\\s*$");h("GTE0PRE","^\\s*>=\\s*0.0.0-0\\s*$")},97606:(e,t,r)=>{const s=r(6826);const n=(e,t,r)=>s(e,t,">",r);e.exports=n},62094:(e,t,r)=>{const s=r(66902);const n=(e,t,r)=>{e=new s(e,r);t=new s(t,r);return e.intersects(t)};e.exports=n},50032:(e,t,r)=>{const s=r(6826);const n=(e,t,r)=>s(e,t,"<",r);e.exports=n},85775:(e,t,r)=>{const s=r(26376);const n=r(66902);const i=(e,t,r)=>{let i=null;let o=null;let l=null;try{l=new n(t,r)}catch(a){return null}e.forEach((e=>{if(l.test(e)){if(!i||o.compare(e)===-1){i=e;o=new s(i,r)}}}));return i};e.exports=i},71657:(e,t,r)=>{const s=r(26376);const n=r(66902);const i=(e,t,r)=>{let i=null;let o=null;let l=null;try{l=new n(t,r)}catch(a){return null}e.forEach((e=>{if(l.test(e)){if(!i||o.compare(e)===1){i=e;o=new s(i,r)}}}));return i};e.exports=i},95316:(e,t,r)=>{const s=r(26376);const n=r(66902);const i=r(71312);const o=(e,t)=>{e=new n(e,t);let r=new s("0.0.0");if(e.test(r)){return r}r=new s("0.0.0-0");if(e.test(r)){return r}r=null;for(let n=0;n<e.set.length;++n){const t=e.set[n];let o=null;t.forEach((e=>{const t=new s(e.semver.version);switch(e.operator){case">":if(t.prerelease.length===0){t.patch++}else{t.prerelease.push(0)}t.raw=t.format();case"":case">=":if(!o||i(t,o)){o=t}break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${e.operator}`)}}));if(o&&(!r||i(r,o)))r=o}if(r&&e.test(r)){return r}return null};e.exports=o},6826:(e,t,r)=>{const s=r(26376);const n=r(22257);const{ANY:i}=n;const o=r(66902);const l=r(45712);const a=r(71312);const h=r(21544);const c=r(12056);const u=r(25903);const f=(e,t,r,f)=>{e=new s(e,f);t=new o(t,f);let p,E,m,v,$;switch(r){case">":p=a;E=c;m=h;v=">";$=">=";break;case"<":p=h;E=u;m=a;v="<";$="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(l(e,t,f)){return false}for(let s=0;s<t.set.length;++s){const r=t.set[s];let o=null;let l=null;r.forEach((e=>{if(e.semver===i){e=new n(">=0.0.0")}o=o||e;l=l||e;if(p(e.semver,o.semver,f)){o=e}else if(m(e.semver,l.semver,f)){l=e}}));if(o.operator===v||o.operator===$){return false}if((!l.operator||l.operator===v)&&E(e,l.semver)){return false}else if(l.operator===$&&m(e,l.semver)){return false}}return true};e.exports=f},17908:(e,t,r)=>{const s=r(45712);const n=r(46269);e.exports=(e,t,r)=>{const i=[];let o=null;let l=null;const a=e.sort(((e,t)=>n(e,t,r)));for(const n of a){const e=s(n,t,r);if(e){l=n;if(!o)o=n}else{if(l){i.push([o,l])}l=null;o=null}}if(o)i.push([o,null]);const h=[];for(const[s,n]of i){if(s===n)h.push(s);else if(!n&&s===a[0])h.push("*");else if(!n)h.push(`>=${s}`);else if(s===a[0])h.push(`<=${n}`);else h.push(`${s} - ${n}`)}const c=h.join(" || ");const u=typeof t.raw==="string"?t.raw:String(t);return c.length<u.length?c:t}},50799:(e,t,r)=>{const s=r(66902);const{ANY:n}=r(22257);const i=r(45712);const o=r(46269);const l=(e,t,r)=>{if(e===t)return true;e=new s(e,r);t=new s(t,r);let n=false;e:for(const s of e.set){for(const e of t.set){const t=a(s,e,r);n=n||t!==null;if(t)continue e}if(n)return false}return true};const a=(e,t,r)=>{if(e===t)return true;if(e.length===1&&e[0].semver===n)return t.length===1&&t[0].semver===n;const s=new Set;let l,a;for(const n of e){if(n.operator===">"||n.operator===">=")l=h(l,n,r);else if(n.operator==="<"||n.operator==="<=")a=c(a,n,r);else s.add(n.semver)}if(s.size>1)return null;let u;if(l&&a){u=o(l.semver,a.semver,r);if(u>0)return null;else if(u===0&&(l.operator!==">="||a.operator!=="<="))return null}for(const n of s){if(l&&!i(n,String(l),r))return null;if(a&&!i(n,String(a),r))return null;for(const e of t){if(!i(n,String(e),r))return false}return true}let f,p;let E,m;for(const n of t){m=m||n.operator===">"||n.operator===">=";E=E||n.operator==="<"||n.operator==="<=";if(l){if(n.operator===">"||n.operator===">="){f=h(l,n,r);if(f===n&&f!==l)return false}else if(l.operator===">="&&!i(l.semver,String(n),r))return false}if(a){if(n.operator==="<"||n.operator==="<="){p=c(a,n,r);if(p===n&&p!==a)return false}else if(a.operator==="<="&&!i(a.semver,String(n),r))return false}if(!n.operator&&(a||l)&&u!==0)return false}if(l&&E&&!a&&u!==0)return false;if(a&&m&&!l&&u!==0)return false;return true};const h=(e,t,r)=>{if(!e)return t;const s=o(e.semver,t.semver,r);return s>0?e:s<0?t:t.operator===">"&&e.operator===">="?t:e};const c=(e,t,r)=>{if(!e)return t;const s=o(e.semver,t.semver,r);return s<0?e:s>0?t:t.operator==="<"&&e.operator==="<="?t:e};e.exports=l},51042:(e,t,r)=>{const s=r(66902);const n=(e,t)=>new s(e,t).set.map((e=>e.map((e=>e.value)).join(" ").trim().split(" ")));e.exports=n},89042:(e,t,r)=>{const s=r(66902);const n=(e,t)=>{try{return new s(e,t).range||"*"}catch(r){return null}};e.exports=n},49602:e=>{"use strict";e.exports=function(e){e.prototype[Symbol.iterator]=function*(){for(let e=this.head;e;e=e.next){yield e.value}}}},34411:(e,t,r)=>{"use strict";e.exports=s;s.Node=l;s.create=s;function s(e){var t=this;if(!(t instanceof s)){t=new s}t.tail=null;t.head=null;t.length=0;if(e&&typeof e.forEach==="function"){e.forEach((function(e){t.push(e)}))}else if(arguments.length>0){for(var r=0,n=arguments.length;r<n;r++){t.push(arguments[r])}}return t}s.prototype.removeNode=function(e){if(e.list!==this){throw new Error("removing node which does not belong to this list")}var t=e.next;var r=e.prev;if(t){t.prev=r}if(r){r.next=t}if(e===this.head){this.head=t}if(e===this.tail){this.tail=r}e.list.length--;e.next=null;e.prev=null;e.list=null;return t};s.prototype.unshiftNode=function(e){if(e===this.head){return}if(e.list){e.list.removeNode(e)}var t=this.head;e.list=this;e.next=t;if(t){t.prev=e}this.head=e;if(!this.tail){this.tail=e}this.length++};s.prototype.pushNode=function(e){if(e===this.tail){return}if(e.list){e.list.removeNode(e)}var t=this.tail;e.list=this;e.prev=t;if(t){t.next=e}this.tail=e;if(!this.head){this.head=e}this.length++};s.prototype.push=function(){for(var e=0,t=arguments.length;e<t;e++){i(this,arguments[e])}return this.length};s.prototype.unshift=function(){for(var e=0,t=arguments.length;e<t;e++){o(this,arguments[e])}return this.length};s.prototype.pop=function(){if(!this.tail){return undefined}var e=this.tail.value;this.tail=this.tail.prev;if(this.tail){this.tail.next=null}else{this.head=null}this.length--;return e};s.prototype.shift=function(){if(!this.head){return undefined}var e=this.head.value;this.head=this.head.next;if(this.head){this.head.prev=null}else{this.tail=null}this.length--;return e};s.prototype.forEach=function(e,t){t=t||this;for(var r=this.head,s=0;r!==null;s++){e.call(t,r.value,s,this);r=r.next}};s.prototype.forEachReverse=function(e,t){t=t||this;for(var r=this.tail,s=this.length-1;r!==null;s--){e.call(t,r.value,s,this);r=r.prev}};s.prototype.get=function(e){for(var t=0,r=this.head;r!==null&&t<e;t++){r=r.next}if(t===e&&r!==null){return r.value}};s.prototype.getReverse=function(e){for(var t=0,r=this.tail;r!==null&&t<e;t++){r=r.prev}if(t===e&&r!==null){return r.value}};s.prototype.map=function(e,t){t=t||this;var r=new s;for(var n=this.head;n!==null;){r.push(e.call(t,n.value,this));n=n.next}return r};s.prototype.mapReverse=function(e,t){t=t||this;var r=new s;for(var n=this.tail;n!==null;){r.push(e.call(t,n.value,this));n=n.prev}return r};s.prototype.reduce=function(e,t){var r;var s=this.head;if(arguments.length>1){r=t}else if(this.head){s=this.head.next;r=this.head.value}else{throw new TypeError("Reduce of empty list with no initial value")}for(var n=0;s!==null;n++){r=e(r,s.value,n);s=s.next}return r};s.prototype.reduceReverse=function(e,t){var r;var s=this.tail;if(arguments.length>1){r=t}else if(this.tail){s=this.tail.prev;r=this.tail.value}else{throw new TypeError("Reduce of empty list with no initial value")}for(var n=this.length-1;s!==null;n--){r=e(r,s.value,n);s=s.prev}return r};s.prototype.toArray=function(){var e=new Array(this.length);for(var t=0,r=this.head;r!==null;t++){e[t]=r.value;r=r.next}return e};s.prototype.toArrayReverse=function(){var e=new Array(this.length);for(var t=0,r=this.tail;r!==null;t++){e[t]=r.value;r=r.prev}return e};s.prototype.slice=function(e,t){t=t||this.length;if(t<0){t+=this.length}e=e||0;if(e<0){e+=this.length}var r=new s;if(t<e||t<0){return r}if(e<0){e=0}if(t>this.length){t=this.length}for(var n=0,i=this.head;i!==null&&n<e;n++){i=i.next}for(;i!==null&&n<t;n++,i=i.next){r.push(i.value)}return r};s.prototype.sliceReverse=function(e,t){t=t||this.length;if(t<0){t+=this.length}e=e||0;if(e<0){e+=this.length}var r=new s;if(t<e||t<0){return r}if(e<0){e=0}if(t>this.length){t=this.length}for(var n=this.length,i=this.tail;i!==null&&n>t;n--){i=i.prev}for(;i!==null&&n>e;n--,i=i.prev){r.push(i.value)}return r};s.prototype.splice=function(e,t,...r){if(e>this.length){e=this.length-1}if(e<0){e=this.length+e}for(var s=0,i=this.head;i!==null&&s<e;s++){i=i.next}var o=[];for(var s=0;i&&s<t;s++){o.push(i.value);i=this.removeNode(i)}if(i===null){i=this.tail}if(i!==this.head&&i!==this.tail){i=i.prev}for(var s=0;s<r.length;s++){i=n(this,i,r[s])}return o};s.prototype.reverse=function(){var e=this.head;var t=this.tail;for(var r=e;r!==null;r=r.prev){var s=r.prev;r.prev=r.next;r.next=s}this.head=t;this.tail=e;return this};function n(e,t,r){var s=t===e.head?new l(r,null,t,e):new l(r,t,t.next,e);if(s.next===null){e.tail=s}if(s.prev===null){e.head=s}e.length++;return s}function i(e,t){e.tail=new l(t,e.tail,null,e);if(!e.head){e.head=e.tail}e.length++}function o(e,t){e.head=new l(t,null,e.head,e);if(!e.tail){e.tail=e.head}e.length++}function l(e,t,r,s){if(!(this instanceof l)){return new l(e,t,r,s)}this.list=s;this.value=e;if(t){t.next=this;this.prev=t}else{this.prev=null}if(r){r.prev=this;this.next=r}else{this.next=null}}try{r(49602)(s)}catch(a){}}}]);