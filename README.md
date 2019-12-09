Upgrade [old package](https://github.com/alexandre-melard/leaflet.TileLayer.WMTS) for package builders (with error correction).

# Leaflet.WMTS

## Description
The package is adapted and tested for working with a [geoserver](https://docs.geoserver.org/latest/en/user/data/cascaded/wmts.html). Allows you to easily connect WMTS layers to a web project.


## Install
### Use with package builder (Webpack, Parcel)
```html
import 'leaflet.wmts';
```


### Use in browser
UMD builds can be used directly in the browser via a `script` tag
```html
<head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
	<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>

	<!-- Import after general Leaflet package -->
	<script src="./dist/leaflet.wmts.browser.min.js"></script>
</head>
```
