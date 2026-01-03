// Curated hairdressing-specific images from Unsplash
export const serviceImages: Record<string, string[]> = {
  'womens-haircuts': [
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
  ],
  'mens-haircuts': [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200',
    'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200',
  ],
  'hair-colouring': [
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1200',
    'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1200',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200',
  ],
  'balayage-highlights': [
    'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=1200',
    'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=1200',
    'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=1200',
  ],
  'hair-extensions': [
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200',
    'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=1200',
  ],
  'bridal-hair': [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200',
    'https://images.unsplash.com/photo-1573008609349-44d7b4139f5d?w=1200',
  ],
  'hair-treatments': [
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200',
    'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1200',
    'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=1200',
  ],
  'blow-dry-styling': [
    'https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=1200',
    'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1200',
    'https://images.unsplash.com/photo-1583398551965-ddcb6c7d6c6f?w=1200',
  ],
  'perms-waves': [
    'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=1200',
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200',
  ],
  'hair-straightening': [
    'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=1200',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
  ],
  'kids-haircuts': [
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200',
    'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=1200',
    'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=1200',
  ],
  'formal-hair-styling': [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200',
  ],
  'default': [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
  ],
  'hero': [
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920',
  ],
  'about': [
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200',
  ],
}

const usedImages = new Set<string>()

export function getUniqueImage(service: string, index: number = 0): string {
  const images = serviceImages[service] || serviceImages['default']

  // Try to find an unused image
  for (const img of images) {
    if (!usedImages.has(img)) {
      usedImages.add(img)
      return img
    }
  }

  // If all images have been used, return based on index
  return images[index % images.length]
}

export function getServiceImage(serviceSlug: string, index: number = 0): string {
  const images = serviceImages[serviceSlug] || serviceImages['default']
  return images[index % images.length]
}
