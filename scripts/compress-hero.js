#!/usr/bin/env node
/**
 * 压缩 Hero 图片至 300KB 以内
 * 使用 Sharp（mozjpeg）进行本地压缩，无需 API
 * 用法: node scripts/compress-hero.js
 */
const fs = require('fs');
const path = require('path');

const TARGET_KB = 300;
const IMAGES = ['hero-main-1.jpg', 'hero-main-2.jpg'];
const IMG_DIR = path.join(__dirname, '../site/images');

async function compressWithSharp(inputPath, outputPath, targetBytes) {
  const sharp = require('sharp');
  let quality = 80;
  let result;

  // 迭代降低 quality 直到达标
  while (quality >= 10) {
    const buf = await sharp(inputPath)
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (buf.length <= targetBytes) {
      fs.writeFileSync(outputPath, buf);
      return { size: buf.length, quality };
    }
    quality -= 10;
  }

  // 最后一轮用最低 quality
  const buf = await sharp(inputPath)
    .jpeg({ quality: 10, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(outputPath, buf);
  return { size: buf.length, quality: 10 };
}

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.error('请先安装 sharp: npm install sharp');
    process.exit(1);
  }

  const targetBytes = TARGET_KB * 1024;

  for (const name of IMAGES) {
    const inputPath = path.join(IMG_DIR, name);
    if (!fs.existsSync(inputPath)) {
      console.warn(`跳过 ${name}：文件不存在`);
      continue;
    }

    const before = fs.statSync(inputPath).size;
    const { size, quality } = await compressWithSharp(inputPath, inputPath, targetBytes);
    const saved = ((before - size) / 1024).toFixed(1);

    console.log(`${name}: ${(before / 1024).toFixed(1)}KB → ${(size / 1024).toFixed(1)}KB (quality ${quality}, -${saved}KB)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
