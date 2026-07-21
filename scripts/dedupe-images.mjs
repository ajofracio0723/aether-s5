import { mkdir, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const UA = 'ev-scroll-funnel/1.0'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Every file below is a distinct source photo — one use each across the site. */
const ASSETS = [
  // Compare — classic Seal 5
  { out: 'public/images/gallery/classic/front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/BYD_Seal_5_DM-i_Dynamic_Harbour_Grey_-_front.jpg', width: 1800 },
  { out: 'public/images/gallery/classic/side.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/BYD_Seal_5_DM-i_Premium_Harbour_Grey_01.jpg', width: 1800 },
  { out: 'public/images/gallery/classic/three-quarter.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/BYD_Seal_5_DM-i_Premium_Harbour_Grey.jpg', width: 1800 },
  // Compare — next Seal 5 2027
  { out: 'public/images/gallery/next/front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/2025_BYD_Seal_05_DM-i_front_view.png', width: 2000 },
  { out: 'public/images/gallery/next/side.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/BYD_Seal_05_DM-i.jpg', width: 2000 },
  { out: 'public/images/gallery/next/three-quarter.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/BYD_Seal_05_DM-i_002.jpg', width: 2000 },
  // Desire
  { out: 'public/images/gallery/desire.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/BYD_Seal_5_DM-i_Dynamic_Arctic_White_-_front.jpg', width: 1800 },
  // Craft
  { out: 'public/images/gallery/craft-metal.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/BYD_Seal_5_DM-i_Dynamic_2025_%282%29.jpg', width: 1600 },
  { out: 'public/images/gallery/craft-light.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BYD_Seal_5_DM-i_Dynamic_Arctic_White_-_rear.jpg', width: 1600 },
  { out: 'public/images/gallery/craft-oceanx.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/BYD_Seal_5_DM-i_Dynamic_Quartz_Blue.jpg', width: 1600 },
  // Gallery-only (never reused elsewhere) — varied color/angle/setting
  { out: 'public/images/gallery/shot-white.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/BYD_Seal_5_DM-i_Dynamic_Xpress_EV_taxi_01.jpg', width: 1800 },
  { out: 'public/images/gallery/shot-dynamic1.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/BYD_Seal_5_DM-i_Premium_Harbour_Grey_02.jpg', width: 1800 },
  { out: 'public/images/gallery/shot-dynamic5.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/BYD_Seal_5_DM-i_Dynamic_2025_%288%29.jpg', width: 1600 },
  { out: 'public/images/gallery/shot-hg-rear.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/BYD_Seal_5_DM-i_Dynamic_Harbour_Grey_-_rear.jpg', width: 1800 },
  { out: 'public/images/gallery/shot-2026a.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/BYD_Seal_5_DM-i_Dynamic_Xpress_EV_taxi_02.jpg', width: 1800 },
  { out: 'public/images/gallery/shot-2026b.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/BYD_Seal_5_DM-i_Premium_2025_%287%29.jpg', width: 1600 },
  // Cabin (two distinct interiors only)
  { out: 'public/images/gallery/interior-cabin.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/BYD_Seal_5_DM-i_Premium_interior.jpg', width: 1800 },
  { out: 'public/images/gallery/interior-dash.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/BYD_Seal_5_DM-i_Dynamic_-_interior_view.jpg', width: 1800 },
]

async function download(url, attempt = 1) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (res.status === 429 && attempt < 12) {
    await sleep(attempt * 8000)
    return download(url, attempt + 1)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

const REMOVE = [
  'public/images/gallery/exterior-front.jpg',
  'public/images/gallery/exterior-side.jpg',
  'public/images/gallery/exterior-aero.jpg',
  'public/images/gallery/exterior-character.jpg',
  'public/images/gallery/exterior-detail.jpg',
  'public/images/gallery/exterior-rear.jpg',
  'public/images/gallery/exterior-presence.jpg',
  'public/images/gallery/exterior-white-front.jpg',
  'public/images/gallery/exterior-white-rear.jpg',
  'public/images/gallery/detail-light.jpg',
  'public/images/gallery/detail-character.jpg',
  'public/images/gallery/detail-handle.jpg',
  'public/images/gallery/detail-wheel.jpg',
  'public/images/gallery/interior-ambient.jpg',
  'public/images/gallery/interior-display.jpg',
  'public/images/gallery/interior-seats.jpg',
  'public/images/gallery/classic/detail.jpg',
  'public/images/gallery/classic/light.jpg',
  'public/images/gallery/classic/rear.jpg',
  'public/images/gallery/next/detail.jpg',
  'public/images/gallery/seal5-1.jpg',
]

for (const p of REMOVE) {
  try {
    await rm(p, { force: true })
    console.log('removed', p)
  } catch {}
}

for (const asset of ASSETS) {
  console.log('fetch', asset.out)
  const buf = await download(asset.url)
  await mkdir(path.dirname(asset.out), { recursive: true })
  const jpeg = await sharp(buf)
    .rotate()
    .resize({ width: asset.width, withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer()
  await writeFile(asset.out, jpeg)
  const m = await sharp(jpeg).metadata()
  console.log('saved', m.width + 'x' + m.height)
  await sleep(5500)
}

console.log('done')
