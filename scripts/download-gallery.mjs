import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const UA = 'ev-scroll-funnel/1.0 (demo; local dev)'

const ASSETS = [
  {
    out: 'public/images/gallery/exterior-front.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/BYD_Seal_5_DM-i_Dynamic_Harbour_Grey_-_front.jpg',
    width: 1800,
  },
  {
    out: 'public/images/gallery/exterior-side.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/BYD_Seal_5_DM-i_Dynamic_2025_%282%29.jpg',
    width: 1800,
  },
  {
    out: 'public/images/gallery/exterior-detail.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/42/BYD_Seal_5_DM-i_Dynamic_2025_%285%29.jpg',
    width: 1600,
  },
  {
    out: 'public/images/gallery/exterior-rear.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/BYD_Seal_5_DM-i_Dynamic_Harbour_Grey_-_rear.jpg',
    width: 1800,
  },
  {
    out: 'public/images/gallery/interior-cabin.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/BYD_Seal_5_DM-i_Dynamic_-_interior_view.jpg',
    width: 1800,
  },
  {
    out: 'public/images/gallery/interior-dash.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/BYD_Seal_5_DM-i_Premium_interior.jpg',
    width: 1800,
  },
  {
    out: 'public/images/seal5-hero-source.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/2025_BYD_Seal_5_DM-i_Premium.jpg',
    width: 2560,
  },
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchBuffer(url, attempt = 1) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (res.status === 429 && attempt < 6) {
    const wait = attempt * 4000
    console.log(`rate limited, waiting ${wait}ms...`)
    await sleep(wait)
    return fetchBuffer(url, attempt + 1)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function saveJpeg(outPath, buffer, width) {
  await mkdir(path.dirname(outPath), { recursive: true })
  const jpeg = await sharp(buffer)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer()
  await writeFile(outPath, jpeg)
  const meta = await sharp(jpeg).metadata()
  console.log(`saved ${outPath} (${meta.width}x${meta.height}, ${(jpeg.length / 1024).toFixed(0)} KB)`)
}

async function buildHeroVariants(sourcePath) {
  const source = await sharp(sourcePath).rotate().resize({ width: 2560, withoutEnlargement: true })
  const hero2560 = await source.clone().jpeg({ quality: 88, mozjpeg: true }).toBuffer()
  const hero1920 = await sharp(hero2560).resize({ width: 1920, withoutEnlargement: true }).jpeg({ quality: 86, mozjpeg: true }).toBuffer()
  const heroWebp = await sharp(hero2560).webp({ quality: 84 }).toBuffer()

  await writeFile('public/images/seal5-hero.jpg', hero2560)
  await writeFile('public/images/seal5-hero-1920.jpg', hero1920)
  await writeFile('public/images/seal5-hero.webp', heroWebp)
  console.log('saved hero variants (2560 / 1920 / webp)')
}

for (const asset of ASSETS) {
  console.log(`fetching ${asset.url}`)
  const buffer = await fetchBuffer(asset.url)
  await saveJpeg(asset.out, buffer, asset.width)
  await sleep(2500)
}

await buildHeroVariants('public/images/seal5-hero-source.jpg')
console.log('done')
