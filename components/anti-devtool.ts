/* Minified + light-obfuscated AntiDevTool
   Generated per user request. */
export class AntiDevTool{constructor(o={}){this.i=o.interval??500;this.u=o.redirectURL??"//github.com/duckhayangry";this.d=!!o.debug;this.pDev=void 0===o.preventDevTools?true:!!o.preventDevTools;this.cB=void 0===o.checkBrowser?true:!!o.checkBrowser;this.eDbg=void 0===o.enableDebugger?true:!!o.enableDebugger;this.cS=void 0===o.checkShortcuts?true:!!o.checkShortcuts;this._t=null}
_log(t){if(this.d)try{console.clear(),console.log("%c ✨ [AntiDevTool] %c "+t,"color:#fff;background:rgb(255,112,67);padding:5px 0;border-radius:5px 0 0 5px;","background:rgba(66,66,66,0.85);padding:5px 0;border-radius:0 5px 5px 0;")}catch(e){} }
_rnd(){return Math.floor(1e3*Math.random())}
_stackCheck(w){try{const a=this._rnd(),b=this._rnd();let s=a;const E=new w.Error;"function"==typeof Object.defineProperty&&Object.defineProperty(E,"stack",{configurable:!1,enumerable:!1,get:()=>{s+=b;return""}});console.debug(E);E.stack;return a+b!==s}catch(e){return!!this.d&&console.error("sc catch",e),false}}
_dbgFreeze(){if(!this.eDbg)return false;const t=Date.now();debugger;const n=Date.now();return n-t>100}
_fnDebug(){try{const t=performance.now();new Function("debugger")();const n=performance.now();return n-t>100}catch(e){return false}}
_consoleProbe(){try{const r=/./;let f=false;const old=r.toString;Object.defineProperty(r,"toString",{value:function(){f=true;return"dev"}});console.log(r+"");Object.defineProperty(r,"toString",{value:old});return f}catch(e){return false}}
_toStringAnom(){try{const f=function(){};return"function(){}".replace(/\s+/g,"")!==f.toString().replace(/\s+/g,"")}catch(e){return false}}
_dimCheck(){try{const t=160;return Math.abs(window.outerWidth-window.innerWidth)>t||Math.abs(window.outerHeight-window.innerHeight)>t}catch(e){return false}}
_propProbe(){try{let f=false;const o={};Object.defineProperty(o,"x",{get:function(){f=true;return 1}});void o.x;return f}catch(e){return false}}
_fpsCheck(){return new Promise(e=>{try{let s=performance.now(),c=0;const loop=()=>{const n=performance.now();c++;if(n-s>1e3)return e(c<20);requestAnimationFrame(loop)};loop()}catch(t){e(false)}})}
_showUnsupported(){try{document.body.innerHTML=`<h1 style="text-align:center;margin-top:20%;font-size:40px;color:red;pointer-events:none;user-select:none">BROWSER NOT SUPPORTED</h1>`}catch(e){}
}
_blockShortcuts(){if(!this.cS)return;document.addEventListener("contextmenu",e=>e.preventDefault(),{passive:false});document.addEventListener("keydown",e=>{try{const k=(e.key||"").toLowerCase(),c=e.ctrlKey||e.metaKey;if((c&&["f12","u","s","p","i"].includes(k))||123===e.keyCode)try{e.preventDefault(),e.stopPropagation()}catch(t){}}catch(t){}},{capture:true})}
async _detectAll(){if(this.cB){const ua=navigator.userAgent.toLowerCase();if(!["chrome","cốc cốc","safari","firefox"].some(x=>ua.includes(x))){this._showUnsupported();return true}}if(this._stackCheck(window))return true;if(this._dbgFreeze())return true;if(this._fnDebug())return true;if(this._consoleProbe())return true;if(this._toStringAnom())return true;if(this._dimCheck())return true;if(this._propProbe())return true;if(await this._fpsCheck())return true;return false}
async _tick(){try{const ok=await this._detectAll();if(ok){this._log("DevTools detected");try{window.location.replace(this.u)}catch(e){try{window.location.href=this.u}catch(_){} }this.stop()}}catch(e){if(this.d)console.error("tick err",e)} }
init(){this._log("init");if(this.pDev)this._blockShortcuts();this._tick();this._t=setInterval(()=>this._tick(),this.i)}
stop(){this._t&&(clearInterval(this._t),this._t=null)} }
export default AntiDevTool;
