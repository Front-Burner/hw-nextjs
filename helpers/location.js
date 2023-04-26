import { findNearest } from 'geolib';


export const NearestLocation = (locations, position, error) => {
  
  let polygon = [];
  
  const Coord = (latitude, longitude) => { return { latitude: latitude, longitude: longitude } }

  locations.forEach((node) => {
    polygon.push({
      id: node.id,
      title: `${node.attributes.title}`,
      slug: `${node.attributes.slug}`
    })
  })

  if (error === false ) {
    const nearest = findNearest(Coord(`${position.latitude}`, `${position.longitude}`), polygon);
    let result = {};
    result.id = nearest.id;
    result.slug = nearest.slug;
    result.title = nearest.title
    return result
  }

}