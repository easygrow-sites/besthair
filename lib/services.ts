import servicesData from '../services.json'

export interface Service {
  name: string
  slug: string
  description: string
}

export function getAllServices(): Service[] {
  return servicesData.services
}

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.services.find((s: Service) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return servicesData.services.map((s: Service) => s.slug)
}
