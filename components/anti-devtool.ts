export class AntiDevTool {
  interval: number
  redirectURL: string
  debug: boolean
  preventDevTools: boolean
  checkBrowser: boolean
  enableDebugger: boolean
  checkShortcuts: boolean
  private _intervalID: any

  constructor(e: Partial<AntiDevTool> = {}) {
    this.interval = e.interval ?? 0
    this.redirectURL = e.redirectURL ?? "//github.com/duckhayangry"
    this.debug = e.debug ?? false
    this.preventDevTools = e.preventDevTools ?? true
    this.checkBrowser = e.checkBrowser ?? true
    this.enableDebugger = e.enableDebugger ?? false
    this.checkShortcuts = e.checkShortcuts ?? true
    this._intervalID = null
  }

  private randomInt() {
    return Math.floor(1000 * Math.random())
  }

  // ⭐ Logic check DevTools được chuyển từ class FuckDevtool
  private checkDevTools(win: any) {
    let ua = navigator.userAgent.toLowerCase()
    let ok = ["chrome", "cốc cốc", "safari", "firefox"].some((e) =>
      ua.includes(e),
    )
    if (!ok) {
      this.showUnsupported()
      return false
    }

    if (win.chrome) {
      let a = this.randomInt()
      let b = this.randomInt()
      let s = a
      let detected = false

      try {
        let err = new win.Error()
        if (typeof Object.defineProperty === "function") {
          Object.defineProperty(err, "stack", {
            configurable: false,
            enumerable: false,
            get: () => {
              s += b
              return ""
            },
          })
        }
        console.debug(err)
        err.stack
        if (a + b !== s) detected = true
      } catch (e) {
        if (this.debug) console.error("Error in catch:", e)
      }
      return detected
    }

    if (this.enableDebugger) {
      let s = new Date()
      let e = new Date()
      if (e - s > 100) return true
    }

    return false
  }

  private blockShortcuts() {
    if (!this.checkShortcuts) return
    document.addEventListener("contextmenu", (e) => e.preventDefault())
    document.addEventListener("keydown", (e) => {
      let t = e.key.toLowerCase()
      let r = e.ctrlKey || e.metaKey
      if ((r && ["f12", "u", "s", "p", "i"].includes(t)) || e.keyCode === 123) {
        e.preventDefault()
      }
    })
  }

  private debugLog(msg: string) {
    if (!this.debug) return
    console.clear()
    console.log(
      `%c ✨ [Anti-Devtool] %c ${msg} `,
      "color: #ffffff; background: rgb(255, 112, 67); padding:5px 0; border-radius: 5px 0 0 5px;",
      "background:rgba(66, 66, 66, 0.85); padding:5px 0; border-radius: 0 5px 5px 0;",
    )
  }

  private showUnsupported() {
    document.body.innerHTML = `
<h1 style="text-align: center; margin-top: 20%; font-size: 40px; color: red; pointer-events: none; user-select: none">
  BROWSER NOT SUPPORTED
</h1>`
  }

  private detect() {
    if (!window) return false
    if (this.checkBrowser) {
      let detected = this.checkDevTools(window)
      if (detected) {
        this.debugLog("DevTools detected!")
        window.location.replace(this.redirectURL)
        this.stop()
      }
    }
    return false
  }

  init() {
    this.debugLog("Initializing Anti-Devtool...")
    this.detect()
    this._intervalID = setInterval(() => this.detect(), this.interval)
    if (this.preventDevTools) this.blockShortcuts()
  }

  stop() {
    if (this._intervalID) {
      clearInterval(this._intervalID)
      this._intervalID = null
    }
  }
}

export default AntiDevTool
