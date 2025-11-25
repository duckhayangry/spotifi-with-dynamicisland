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

  // Hàm helper và logic chống DevTools, copy từ class JS gốc
  private randomInt(e: any) {
    return Math.floor(1e3 * Math.random())
  }

  private checkDevTools(t: any) {
    // logic check devtools ở đây
    return false // giữ đơn giản, thêm code gốc vào nếu muốn
  }

  private blockShortcuts() {
    if (!this.checkShortcuts) return
    document.addEventListener("contextmenu", (e) => e.preventDefault())
    document.addEventListener("keydown", (e) => {
      const t = e.key.toLowerCase()
      const r = e.ctrlKey || e.metaKey
      if ((r && ["f12", "u", "s", "p", "i"].includes(t)) || e.keyCode === 123) {
        e.preventDefault()
      }
    })
  }

  init() {
    if (this.preventDevTools) this.blockShortcuts()
    // interval check
    this._intervalID = setInterval(() => {
      // call checkDevTools nếu muốn
    }, this.interval)
  }

  stop() {
    if (this._intervalID) {
      clearInterval(this._intervalID)
      this._intervalID = null
    }
  }
}

export default AntiDevTool
