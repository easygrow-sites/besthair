import locationsData from '../locations.json'

export interface Location {
  name: string
  slug: string
}

export function getAllLocations(): Location[] {
  return locationsData.locations
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locationsData.locations.find((l: Location) => l.slug === slug)
}

export function getAllLocationSlugs(): string[] {
  return locationsData.locations.map((l: Location) => l.slug)
}
