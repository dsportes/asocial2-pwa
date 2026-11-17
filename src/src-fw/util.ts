import { appConfig } from '../app/config'
import { keyFromB64 } from '../starter/util'
import { messages } from '../main'

// @ts-expect-error
import { gzip, ungzip } from './pako.mjs'

export let $t: any
export let i18n: any
let starter: any
export function setupUtilFW (_$t: any, _i18n: any, _starter: any ) { $t = _$t; i18n = _i18n; starter = _starter }

export function gzipT (data: Uint8Array) : Uint8Array | undefined { return gzip(data) }

export function ungzipT (data: Uint8Array) { return ungzip(data) }

export function hasMessage (code: string) : string {
  for (const opt of appConfig.LANGOPTIONS) {
    const mx = messages[opt.value]
    if (mx && mx[code]) return mx[code]
  }
  return ''
}

let audioContext: AudioContext | null = null
export async function beep (son: string) {
  if (!audioContext) audioContext = new AudioContext()
  const b64 = son.substring(son.indexOf(',') + 1)
  const buf = keyFromB64(b64).buffer as ArrayBuffer
  const b = await audioContext.decodeAudioData(buf) // (arrayBuffer)
  const source = audioContext.createBufferSource() // creates a sound source
  source.buffer = b // tell the source which sound to play
  source.connect(audioContext.destination) // connect the source to the context's destination (the speakers)
  source.start() // play the source now
}

export function edvol (vol: number) : string {
  const v = vol || 0
  if (v === 0) return '0B'
  if (v < 1000) return v + 'B'
  if (v < 1000000) return (v / 1000).toPrecision(3) + 'KB'
  if (v < 1000000000) return (v / 1000000).toPrecision(3) + 'MB'
  if (v < 1000000000000) return (v / 1000000000).toPrecision(3) + 'GB'
  if (v < 1000000000000000) return (v / 1000000000000).toPrecision(3) + 'TB'
  return (v / 1000000000000000).toPrecision(3) + 'PB'
}

export function quarter (d: Date) {
  const y = d.getUTCFullYear() % 2000
  const q = Math.floor(d.getUTCMonth() / 4)
  return (y * 4) + q
}

type Date3 = [number, number, number] // full year, mont, date
let auj: Date3 = [0, 0, 0], hier: Date3 = [0, 0, 0]

export function zp (n: number) { return n > 9 ? '' + n: '0' + n }

export function aujhier () {
  const now = new Date()
  const n = [now.getFullYear(), now.getMonth(), now.getDate()] as Date3
  if (n[0] === auj[0] && n[1] === auj[1] && n[2] === auj[2]) return
  auj = n
  const h = new Date(now.getTime() - 86400000)
  hier = [h.getFullYear(), h.getMonth(), h.getDate()]
}

/*
- sec: si true affiche les secondes
- pash: si true mode "décoré" avec "le": "le xxx à yyy"
  DHCleah: 'le {0} à {1}',
  DHClea: 'le {0}',
  DHCjah: '{0} à {1}',
  DHCja: '{0}',
*/
export function dhcool (timems: number, sec?: boolean, pash?: boolean) {
  if (!timems) return $t('DHCnondate')
  aujhier()
  const dx = new Date(timems)
  const d = [dx.getFullYear(), dx.getMonth(), dx.getDate()]
  const mm = auj[0] === d[0] && auj[1] === d[1]
  if (mm && auj[2] === d[2]) {
    return pash ? $t('DHCauja') : $t('DHCaujah', [hms(dx, sec)])
  }
  if (hier[0] === d[0] && hier[1] === d[1] && hier[2] === d[2]) {
    return pash ? $t('DHChiera') : $t('DHChierah', [hms(dx, sec)])
  }
  if (mm) {
    return pash ? $t('DHClea', [d[2]]) : $t('DHCleah', [d[2], hms(dx, sec)])
  }
  return pash ? $t('DHCja', [aaaammjj(dx)]) : $t('DHCjah', [aaaammjj(dx), hms(dx, sec)])
}

// Retourne hh-mm-ss d'une date
export function hms (t: Date | number, sec?: boolean) : string {
  if (!t) return '?'
  const d = t instanceof Date ? t : new Date(t)
  const hh = zp(d.getHours())
  const mm = ':' + zp(d.getMinutes())
  const ss = sec ? ':' + zp(d.getSeconds()) : ''
  return hh + mm + ss
}

// Retourne aaaa-mm-jj d'une date
export function aaaammjj (t: Date | number) : string {
  if (!t) return '?'
  const d = t instanceof Date ? t : new Date(t)
  const aa = d.getFullYear()
  const mm = '-' + zp(d.getMonth() + 1)
  const jj = '-' + zp(d.getDate())
  return aa + mm + jj
}

export function dhstring (t: Date | number) {
  const d = t instanceof Date ? t : new Date(t)
  return d.toISOString()
  // return aaaammjj(d) + ' ' + hms(d, sec)
}

const encoder = new TextEncoder()

export function dkli (idx: number | undefined) {
  const d = starter.isDark
  return (d ? (idx ? 'dark' + (idx % 2) : 'dark0') : (idx ? 'clear' + (idx % 2) : 'clear0')) + ' '
}

export function sty (sz?: string) {
  const d = starter.isDark
  if (!sz) return d ? 'dark ' : 'clear '
  return (d ? 'dark bsfdark pw' : 'clear bsclear pw') + sz
}

export function asty () {
  return starter.isDark ? 'clear0 ' : 'dark0 '
}

export interface fileDescr {
  size?: number
  name: string
  type?: string
  b64?: string
  u8?: Uint8Array
}

export async function readFile (file: any, bin: boolean) : Promise<fileDescr> {
  return new Promise((resolve, reject) => {
    const fd: fileDescr = { size: file.size, name: file.name }
    if (!file.type) {
      fd.type = file.name.endsWith('.md') || file.name.endsWith('.markdown') ? 'text/markdown' : 'application/octet-stream'
    } else fd.type = file.type

    const reader = new FileReader()
    reader.addEventListener('load', (event: any) => {
      if (!bin) {
        fd.b64 = event.target.result
      } else {
        fd.u8 = new Uint8Array(event.target.result)
      }
      resolve(fd)
    })
    reader.onerror = (error) => reject(error)
    if (!bin) {
      reader.readAsDataURL(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  })
}

export function cloneSet (s: any) : any {
  const s2 = new Set()
  for (const x of s) s2.add(x)
  return s2
}

export const eqNumberA = (a: any[], b: any[]) : boolean => {
  if (!a && !b) return true
  if (!a && b) return false
  if (a && !b) return false
  if (a.length !== b.length) return false
  return isSameSet(new Set(a), new Set(b))
}

export const isSameSet = (s1: Set<any>, s2: Set<any>) => {
  if (s1.size !== s2.size) return false
  return [...s1].every(i => s2.has(i))
}

export const equ8 = (a: Uint8Array, b: Uint8Array) : boolean => {
  if (!a && !b) return true
  if (!a && b) return false
  if (a && !b) return false
  if (a.length !== b.length) return false
  for(let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}
