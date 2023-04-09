import CliProgress, { SingleBar, Preset } from "cli-progress";
import {BroadcastPlus} from "src/util";


// const bar = new CliProgress.SingleBar({
//     format: `{bar} {percentage}% | ETA: {eta}s | {value}/{total} {duration_formatted}`
// }, CliProgress.Presets.shades_grey)
//
// bar.start(100, 0)
//
// let count = 0
//
// bar.increment();
// setInterval(() => {
//     count++
//     bar.update(count)
//     if (count === 100) bar.stop();
//
// }, 100)


export interface ProgressOption {
    total: number
    value?: number
    title?: string
    format?:string
    type?: Preset
}


export class Progress extends BroadcastPlus {
    private readonly _bar: SingleBar
    public get bar () {
        return this._bar
    }

    private _running = false
    public get running() {
        return this._running
    }


    private _option
    private _value: number = 0
    constructor(option: ProgressOption) {
        super()
        this._option = option
        this._value = option.value ?? 0
        this._bar = new CliProgress.SingleBar({
            format: option.format || `${option.title ?? ""} [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} {duration_formatted}`
        }, option.type || CliProgress.Presets.rect)

    }



    public start() {
        if (this._running) return
        this._running = true
        this._bar.start(this._option.total, this._value)
    }


    public update(value: number) {
        if (!this._running) this.start()
        if (this._value < value) this._value = value
        else this._value += value
        this._bar.update(this._value)
        if (this._value >= this._option.total) {
            this._bar.stop()
            this._running = false
            this.send("stopped")
        }
    }
}
