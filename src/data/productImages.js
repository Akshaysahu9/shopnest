const UNSPLASH = {
  p001: 'photo-1618366712010-f4ae9c647dcb',
  p002: 'photo-1517336714731-489689fd1ca8',
  p003: 'photo-1610945415295-d9bbf067e59c',
  p004: 'photo-1542272604-787c3835535d',
  p005: 'photo-1542291026-7eec264c27ff',
  p006: 'photo-1585515320310-259814833e62',
  p007: 'photo-1558317374-067fb5f30001',
  p008: 'photo-1544947950-fa07a98d237f',
  p009: 'photo-1498049794561-7780e7231661',
  p010: 'photo-1596462502278-27bfdc403348',
  p011: 'photo-1556228720-195a672e8a03',
  p012: 'photo-1626224583764-f87db24ac4ea',
  p013: 'photo-1601925260368-ae2f83cf8b7f',
  p014: 'photo-1587654780291-39c9404d746b',
  p015: 'photo-1566576912321-d58ddd7a6088',
  p016: 'photo-1586201375761-83865001e31c',
  p017: 'photo-1445205170230-053b83016050',
  p018: 'photo-1593784991095-a205069470b6',
  p019: 'photo-1521572163474-6864f9cf17ab',
  p020: 'photo-1556909114-f6e7ad7d3136',
  p021: 'photo-1598327105666-5b89351aff97',
  p022: 'photo-1510557880182-3d4d3cba35a5',
  p023: 'photo-1607082348824-0a96f2a4b9da',
  p024: 'photo-1505740420928-5e560c06d30e',
  p025: 'photo-1572635196237-14b3f281503f',
  p026: 'photo-1526170375885-4d8ecf77b99f',
  p027: 'photo-1592750475338-74b7b21085ab',
  p028: 'photo-1601784551446-20c9e07cdbdb',
  p029: 'photo-1523275335684-37898b6baf30',
  p030: 'photo-1544244015-0df4b3ffc6b0',
  p031: 'photo-1434493789847-2f02dc6ca35d',
  p032: 'photo-1469334031218-e382a71b716b',
  p033: 'photo-1595777457583-95e059d581b8',
  p034: 'photo-1507679799987-c73779587ccf',
  p035: 'photo-1581044777550-4cfa60707c03',
  p036: 'photo-1515886657613-9f3515b0c78f',
  p037: 'photo-1551028719-00167b16eac5',
  p038: 'photo-1558618666-fcd25c85cd64',
  p039: 'photo-1565299624946-b28f40a0ae38',
  p040: 'photo-1578985545062-69928b1d9587',
  p045: 'photo-1602143407151-7111542de6e8',
  p052: 'photo-1574629810360-7efbbe195018',
  p053: 'photo-1534438327276-14e5300c3a48',
  p059: 'photo-1484704849700-f032a568e944',
  p060: 'photo-1516035069371-29a1b244cc32',
}

const PICSUM = {
  p041: 112,
  p042: 82,
  p043: 91,
  p044: 68,
  p046: 154,
  p047: 312,
  p048: 24,
  p049: 65,
  p050: 102,
  p051: 155,
  p054: 193,
  p055: 146,
  p056: 292,
  p057: 225,
  p058: 326,
}

export function photoUrl(productId, w = 400) {
  const slug = UNSPLASH[productId]
  if (slug) {
    return `https://images.unsplash.com/${slug}?w=${w}&h=${w}&fit=crop&auto=format&q=80`
  }
  const picId = PICSUM[productId] || parseInt(productId.replace('p', ''), 10)
  return `https://picsum.photos/id/${picId}/${w}/${w}`
}

export function productImages(productId) {
  return [photoUrl(productId, 600), photoUrl(productId, 800)]
}
