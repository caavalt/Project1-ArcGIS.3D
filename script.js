require([
  "esri/Map",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/geometry/Polygon",
  "esri/geometry/Point",
  "esri/widgets/BasemapGallery",
  "dojo/domReady!"
], function (
  Map,
  WebScene,
  SceneView,
  FeatureLayer,
  Legend,
  Graphic,
  GraphicsLayer,
  SimpleFillSymbol,
  SimpleMarkerSymbol,
  Polygon,
  Point,
  BasemapGallery
) {
 // Use the world elevation service
const map = new Map({
  basemap: "topo-vector",
  ground: "world-elevation"
});

  // Create a new SceneView
  var view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [-90.341865, 38.610273],
    zoom: 14
  });

  // Create a feature layer
  var featureLayer = new FeatureLayer({
    url:
      "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Deer_Creek_Watershed_Geodatabase_WFL1/FeatureServer/5",
    opacity: 0.6,
    outFields: ["*"],
    popupTemplate: {
      title: "Land Use Code",
      content: "{LUCODE}"
    }
  });

  var featureLayer1 = new FeatureLayer({
    url:
      "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Deer_Creek_Watershed_Geodatabase_WFL1/FeatureServer/3",
    opacity: 0.6,
    outFields: ["*"]
  });

  // Add the feature layers to the map
  map.add(featureLayer);
  map.add(featureLayer1);

  // Add a legend widget
  var legend = new Legend({
    view: view,
    layerInfos: [
      {
        layer: featureLayer,
        title: "Parcels within 10 meters of Deer Creek Watershed streams"
      }
    ]
  });

  var graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  view.ui.add(legend, "bottom-right");
  
  const polygonCoordinates = [
    [-90.349949, 38.608216],
    [-90.349886, 38.608647],
    [-90.348846, 38.609017],
    [-90.348373, 38.609669],
    [-90.348058, 38.60978],
    [-90.347806, 38.610506],
    [-90.347364, 38.610519],
    [-90.347286, 38.611011],
    [-90.346892, 38.610925],
    [-90.346703, 38.611442],
    [-90.34612, 38.611245],
    [-90.345198, 38.612875],
    [-90.345331, 38.614032],
    [-90.345094, 38.614089],
    [-90.344813, 38.613152],
    [-90.345139, 38.611868],
    [-90.344458, 38.611753],
    [-90.344487, 38.610769],
    [-90.343614, 38.611001],
    [-90.342533, 38.611059],
    [-90.341304, 38.61092],
    [-90.340993, 38.610839],
    [-90.340412, 38.610358],
    [-90.337257, 38.610509],
    [-90.336228, 38.610739],
    [-90.336222, 38.611133],
    [-90.335444, 38.611158],
    [-90.335401, 38.610873],
    [-90.334831, 38.611043],
    [-90.33472, 38.611598],
    [-90.334623, 38.611647],
    [-90.33457, 38.612072],
    [-90.334776, 38.612777],
    [-90.334394, 38.612943],
    [-90.334145, 38.612665],
    [-90.333789, 38.612859],
    [-90.333619, 38.612491],
    [-90.333717, 38.612315],
    [-90.333822, 38.611694],
    [-90.334246, 38.610817],
    [-90.334938, 38.610089],
    [-90.335022, 38.609252],
    [-90.334942, 38.60865],
    [-90.335027, 38.608141],
    [-90.335299, 38.608176],
    [-90.335642, 38.608643],
    [-90.335414, 38.609332],
    [-90.3354, 38.609674],
    [-90.336198, 38.609728],
    [-90.336232, 38.610016],
    [-90.337311, 38.609848],
    [-90.338098, 38.609647],
    [-90.338452, 38.609462],
    [-90.339487, 38.609287],
    [-90.340655, 38.609569],
    [-90.342297, 38.609798],
    [-90.34319, 38.609865],
    [-90.344566, 38.609712],
    [-90.346197, 38.609102],
    [-90.347862, 38.608498],
    [-90.349338, 38.608247]
  ];

  const polygon = {
    type: "polygon",
    rings: polygonCoordinates.map((coord) => [coord[0], coord[1]])
  };

  const simpleFillSymbol = {
    type: "simple-fill",
    color: [227, 139, 79, 0.8],
    outline: {
      color: [128, 128, 128, 0.8],
      width: 1
    }
  };

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,
    attributes: {
      title: "Brentwood Bound Floodplain Earthwork",
      description: "$80 million dollars of sales tax"
    },
    popupTemplate: popupTemplate
  });

  // Add the polygon graphic to the graphics layer
  graphicsLayer.add(polygonGraphic);
  var popupTemplate = {
    title: "Marker Information",
    content: "<b>{title}</b><br>{description}" 
  };

  // Marker coordinates and popup information
  var markers = [
    { coordinates: [-90.347337, 38.609913], title: "Action Park" },
    { coordinates: [-90.345747, 38.610561], title: "Retention Basin 1" },
    { coordinates: [-90.345228, 38.612425], title: "Underpass" },
    { coordinates: [-90.336291, 38.610177], title: "Keeley Bridge" },
    { coordinates: [-90.335168, 38.608213], title: "Bottleneck" },
    { coordinates: [-90.335871, 38.610811], title: "Retention Basin 2" },
    { coordinates: [-90.334229, 38.611749], title: "Retention Basin 3" }
  ];

  // Add markers to the graphics layer
  markers.forEach(function (markerInfo) {
    var point = new Point({
      longitude: markerInfo.coordinates[0],
      latitude: markerInfo.coordinates[1]
    });

    var markerSymbol = new SimpleMarkerSymbol({
      color: [0, 0, 255, 0.8], 
      outline: {
        color: [255, 255, 255, 0.8], 
        width: 2
      }
    });

    var markerGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        title: markerInfo.title,
        description: markerInfo.description
      },
      popupTemplate: popupTemplate
    });

    graphicsLayer.add(markerGraphic);
  });
});
