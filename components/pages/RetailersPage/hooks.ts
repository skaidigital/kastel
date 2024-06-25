import { MarketValues } from '@/data/constants'
import { groq } from 'next-sanity'

export function getRetailersPageQuery(market: MarketValues) {
  const query = groq`
    *[_type == "retailersPage"][0] {
        "title": title.${market},
        "retailers": retailers_${market}[]->{
            name, 
            websiteUrl,
            "address1": address.address1,
            "address2": address.address2,
            "zip": address.zip,
            "city": address.city,
            "country": address.country
        }
    }
  `

  return query
}
