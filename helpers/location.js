import { findNearest } from "geolib";

export const NearestLocation = (locations, position, error) => {
  let polygon = [];

  const Coord = (latitude, longitude) => {
    return { latitude: latitude, longitude: longitude };
  };

  locations.forEach((node) => {
    console.log(node);
    polygon.push({
      id: node._id,
      title: `${node.title}`,
      slug: `${node.slug.current}`,
      // lat: `${node.map.lat}`,
      // lng: `${node.map.lng}`,
      address: `${node.address}`,
      openTable: `${node.openTableUrl}`,
      publishOpenTable: `${node.publishOpenTable}`,
    });
  });

  if (error === false) {
    const nearest = findNearest(
      Coord(`${position.latitude}`, `${position.longitude}`),
      polygon
    );
    let result = {};
    result.id = nearest.id;
    result.slug = nearest.slug;
    result.title = nearest.title;
    result.address = nearest.address;
    result.lat = nearest.lat;
    result.lng = nearest.lng;
    result.openTable = nearest.openTable;
    result.publishOpenTable = nearest.publishOpenTable;
    return result;
  }
};
