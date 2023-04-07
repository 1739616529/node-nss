export const hashmap_cache = (() => {
    const cache = new Map<string, any>()
    return (key: string, cb: ChoreFun)  => {
        if (!cache.has(key)) cache.set(key, cb())
        return cache.get(key)

    }
})


export class BroadcastPlus {
    /**
     *
     * @type {Map<string, any>}
     * @private
     */
    _map = new Map()
    get watchMap() {
        return this._map
    }


    /**
     * @param {Object}
     * @private
     * @description new 实例时候存的 全局配置
     */
    _def_config


    /**
     * @param {Object}          config
     * @param {number}          config.hz       - 触发频率 send多少次后触发
     * @param {boolean}         config.async    - 是否异步调用( 添加到为任务队列调用 )
     * @param {number}          config.max      - 最多触发次数 ( 当满足触发次数之后会删除当前侦听实例 )
     */
    constructor(config= {}) {
        this._def_config = config
    }

    /**
     *
     * @returns {*&{async: boolean, hz: number, max: number, index: number}}
     * @private
     */
    _get_def_config() {
        return {
            hz: Infinity,
            _hz: 0,
            max: Infinity,
            _max: 0,
            async: false,
            $_watch_list: [],
            ...this._def_config,
        }
    }

    /**
     *
     * @param {string} watch_name
     * @returns {*}
     */
    getWatchInstance(watch_name: string) {
        return this._map.get(watch_name)
    }

    /**
     *
     * @param {string}      watch_name
     * @param {function}    fn
     */
    on(watch_name: string, fn: ChoreFun) {
        const instance = this.getWatchInstance(watch_name) ?? this._get_def_config()
        instance.$_watch_list.push(fn)
        this._map.set(watch_name, instance)
    }

    /**
     *
     * @param {string} watch_name
     * @param {*[]} args
     * @returns {*[]|Promise<*[]>}
     */
    send(watch_name: string, ...args: any[]) {
        const instance = this.getWatchInstance(watch_name)

        // console.log(instance)
        // 如果不存在
        if (instance === void 0) return
        // 如果有设置频率
        if(instance.hz !== Infinity) {
            instance._hz++
            // 如果 满足执行条件
            if (instance.hz === instance._hz) instance._hz = 0
            // 否则就 return
            else return
        }
        // 如果有设置 最大执行次数
        if (instance.max !== Infinity) {
            instance._max++
            // 如果大于等于最大次数
            if (instance.max === instance._max) {
                this._map.delete(watch_name)
            }
        }


        // 如果异步调用
        if (instance.async) {
            return new Promise(r => {
                queueMicrotask(() => {
                    r(instance.$_watch_list.map((v: ChoreFun) => v(...args)))
                })
            })
        }

        const ret = instance.$_watch_list.map((v: ChoreFun) => v(...args))
        return ret
    }

}

