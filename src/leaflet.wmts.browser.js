L.TileLayer.WMTS = L.TileLayer.extend({
  /** Default params for WMTS */
  defaultWmtsParams: {
    service: 'WMTS',
    request: 'GetTile',
    version: '1.0.0',
    layer: '',
    style: '',
    tilematrixset: '',
    format: 'image/jpeg',
  },


  /**
   * Initialize plugin
   * @param {String} url Url to WMTS server
   * @param {Object} options List options
   */
  initialize(url, options) {
    this._url = url;

    const lOptions = {};
    const cOptions = Object.keys(options);
    cOptions.forEach(element => (
      lOptions[element.toLowerCase()] = options[element]
    ));

    const wmtsParams = L.extend({}, this.defaultWmtsParams);
    const tileSize = lOptions.tileSize || this.options.tileSize;

    if (lOptions.detectRetina && L.Browser.retina) {
      wmtsParams.width = tileSize * 2;
      wmtsParams.height = tileSize * 2;
    } else {
      wmtsParams.width = tileSize;
      wmtsParams.height = tileSize;
    }

    for (const i in lOptions) {
      // all keys that are in defaultWmtsParams options go to WMTS params
      // eslint-disable-next-line no-prototype-builtins
      if (wmtsParams.hasOwnProperty(i) && i !== 'matrixIds') {
        wmtsParams[i] = lOptions[i];
      }
    }

    this.wmtsParams = wmtsParams;
    this.matrixIds = options.matrixIds || this.getDefaultMatrix();

    L.setOptions(this, options);
  },


  /**
   * Set tile to map
   * @param {Leaflet.Map} map Leaflet map
   */
  onAdd(map) {
    this._crs = this.options.crs || map.options.crs;
    L.TileLayer.prototype.onAdd.call(this, map);
  },


  /**
   * Generate URL for tile pieces
   * @param {Leaflet.Point} coords Position tile
   * @param {Number} coords.x Position X
   * @param {Number} coords.y Position Y
   * @param {Number} coords.z Position Z
   * @return {String} URL
   */
  getTileUrl(coords) {
    const tileSize = this.options.tileSize;

    const nwPoint = coords.multiplyBy(tileSize);
    nwPoint.x += 1;
    nwPoint.y -= 1;

    const sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
    const zoom = this._tileZoom;
    const se = this._crs.project(this._map.unproject(sePoint, zoom));
    const nw = this._crs.project(this._map.unproject(nwPoint, zoom));
    const tilewidth = se.x - nw.x;

    const ident = this.matrixIds[zoom].identifier;
    const tilematrix = `${this.wmtsParams.tilematrixset}:${ident}`;
    const X0 = this.matrixIds[zoom].topLeftCorner.lng;
    const Y0 = this.matrixIds[zoom].topLeftCorner.lat;
    const tilecol = Math.floor((nw.x - X0) / tilewidth);
    const tilerow = -Math.floor((nw.y - Y0) / tilewidth);

    const url = L.Util.template(this._url, {
      s: this._getSubdomain(coords),
    });

    return `${url}${L.Util.getParamString(this.wmtsParams, url)}` +
      `&tilematrix=${tilematrix}&tilerow=${tilerow}&tilecol=${tilecol}`;
  },


  /**
   * Set params
   * @param {Object} params Params
   * @param {Boolean} noRedraw needed redraw map
   */
  setParams(params, noRedraw) {
    L.extend(this.wmtsParams, params);

    if (!noRedraw) {
      this.redraw();
    }

    return this;
  },


  /**
   * Generate default matrix
   * @description The matrix3857 represents the projection
   * for in the IGN WMTS for the google coordinates.
   */
  getDefaultMatrix() {
    const matrixIds3857 = new Array(22);

    for (let i = 0; i < 22; i++) {
      matrixIds3857[i] = {
        identifier: String(i),
        topLeftCorner: new L.LatLng(20037508.3428, -20037508.3428),
      };
    }

    return matrixIds3857;
  },
});

L.tileLayer.wmts = function (url, options) {
  return new L.TileLayer.WMTS(url, options);
};
