import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Vector as VectorSource } from 'ol/source.js';
import {get as getProjection} from 'ol/proj.js';
import {Circle} from 'ol/geom.js';
import Feature from 'ol/Feature.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Fill, Stroke, Style} from 'ol/style.js';

const vectorSource = new VectorSource();

const locations = [
  {name: 'Pasadena, CA', coords: [-118.131809, 34.184581], num: 1}, 
  {name: 'Folsom, CA', coords: [-121.147826, 38.674677], num: 2}, 
  {name: 'Northbrook, IL', coords: [-87.836202, 42.127520], num: 1},
  {name: 'San Francisco, CA', coords: [-122.727652, 37.785204], num: 3},
  {name: 'Fresno, CA', coords: [-119.794692, 36.785633], num: 1},
  {name: 'Gardnerville, NV', coords: [-119.731994, 38.937779], num: 1}
]

locations.forEach(location => {
  const circleFeature = new Feature({
    geometry: new Circle(location.coords, (location.num*0.3)),
  });
  circleFeature.setStyle(
    new Style({
        fill: new Fill({
          color: [213,5*(location.num),(10*location.num),0.25*(location.num)],
        }),
        stroke: new Stroke({
          color: [0, 0, 0, 1],
          width: location.num,
        })
      })
  )
  vectorSource.addFeature(circleFeature);
})

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
    ],
    view: new View({
        center:[-120.670375, 35.272506],    // Coords for SLO
        zoom: 5,
        projection: getProjection('EPSG:4326')
    }),
});
