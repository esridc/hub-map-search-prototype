import { r as registerInstance, e as createEvent, h, f as Host } from './index-d836c4a8.js';
import { r as request } from './index-5c68fb28.js';
import { c as cloneObject } from './index-5ebfac40.js';
import './index-bed14788.js';
import './index-923d9554.js';

;
class CreateReplicaOptionsBuilder {
  constructor() {
    this._createReplicaOptions = {
      layers: '0',
      returnAttachments: true,
      returnAttachmentsDataByUrl: true,
      async: true,
      syncModel: 'none',
      targetType: 'client',
      syncDirection: 'bidirectional',
      attachmentsSyncDirection: 'bidirectional'
    };
  }
  layers(layers) {
    this._createReplicaOptions.layers = layers;
    return this;
  }
  dataFormat(dataFormat) {
    this._createReplicaOptions.dataFormat = dataFormat;
    return this;
  }
  geometry(geometry) {
    this._createReplicaOptions.geometry = geometry;
    this._createReplicaOptions.geometryType = _getCreateReplicaGeometryType(geometry.type);
    this._createReplicaOptions.inSR = geometry.spatialReference;
    return this;
  }
  layerQueries(layerQueries) {
    this._createReplicaOptions.layerQueries = layerQueries;
    return this;
  }
  build() {
    return cloneObject(this._createReplicaOptions);
  }
}
function _getCreateReplicaGeometryType(type) {
  const conversionTable = {
    point: 'esriGeometryPoint',
    multipoint: 'esriGeometryMultipoint',
    polyline: 'esriGeometryPolyline',
    polygon: 'esriGeometryPolygon',
    extent: 'esriGeometryEnvelope'
  };
  return conversionTable[type];
}
async function getDownloadUrlFromService(serviceUrl, createReplicaOptions, pollTime = 5000) {
  const statusUrl = await _initiateCreateReplica(serviceUrl, createReplicaOptions);
  const { resultUrl } = await _pollUntilComplete(statusUrl, pollTime);
  return resultUrl;
}
async function _initiateCreateReplica(serviceUrl, createReplicaOptions) {
  const requestOptions = {
    httpMethod: 'POST',
    params: createReplicaOptions
  };
  const { statusUrl } = await request(`${serviceUrl}/createReplica`, requestOptions);
  return statusUrl;
}
async function _pollUntilComplete(statusUrl, pollTime) {
  const response = await request(statusUrl, { httpMethod: 'GET' });
  if (response.status === 'Completed') {
    return response;
  }
  else {
    await new Promise(resolve => setTimeout(resolve, pollTime));
    return _pollUntilComplete(statusUrl, pollTime);
  }
}

const arcgisDownloadFeaturesButtonCss = ":host{display:block}";

const isString = (x) => typeof x === 'string' || x instanceof String;
const isNumberArray = (x) => {
  return Array.isArray(x) && x.every((el) => !isNaN(el));
};
const isILayerOptionsArray = (x) => {
  return Array.isArray(x) && x.every(el => el.id);
};
const ArcgisDownloadFeaturesButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisTelemetry = createEvent(this, "arcgisTelemetry", 7);
    this.arcgisDownloadSuccess = createEvent(this, "arcgisDownloadSuccess", 7);
    this.arcgisDownloadError = createEvent(this, "arcgisDownloadError", 7);
    this.loading = false;
    this.hasError = false;
  }
  async onHandleClick() {
    this.hasError = false;
    this.loading = true;
    const { serviceUrl, fileFormat, filterGeometry, layers } = this;
    this.arcgisTelemetry.emit({
      category: 'Engagement',
      action: 'Download',
      label: 'Start',
      serviceUrl,
      format: fileFormat,
      filterGeometry,
      layers
    });
    try {
      const options = this.getCreateReplicaOptions();
      const downloadUrl = await getDownloadUrlFromService(serviceUrl, options);
      this.arcgisDownloadSuccess.emit({ serviceUrl, fileFormat, downloadUrl });
    }
    catch (error) {
      this.hasError = true;
      this.arcgisTelemetry.emit({
        category: 'Engagement',
        action: 'Download',
        label: 'Error',
        serviceUrl,
        format: fileFormat,
        errorCode: error.code,
        filterGeometry,
        layers
      });
      this.arcgisDownloadError.emit({ serviceUrl, fileFormat, error });
    }
    this.loading = false;
  }
  getCreateReplicaOptions() {
    let layers;
    let layerQueries;
    if (isString(this.layers)) {
      layers = this.layers;
    }
    else if (isNumberArray(this.layers)) {
      layers = this.layers.join(',');
    }
    else if (isILayerOptionsArray(this.layers)) {
      layers = this.layers
        .map(layer => layer.id)
        .join(',');
      layerQueries = this.layers
        .reduce((queries, { id, where }) => {
        if (where) {
          queries[id] = {
            where,
            queryOption: 'useFilter',
          };
        }
        return queries;
      }, {});
    }
    let builder = new CreateReplicaOptionsBuilder();
    if (layers) {
      builder = builder.layers(layers);
    }
    if (layerQueries) {
      builder = builder.layerQueries(layerQueries);
    }
    if (this.fileFormat) {
      builder = builder.dataFormat(this.fileFormat);
    }
    if (this.filterGeometry) {
      builder = builder.geometry(this.filterGeometry);
    }
    return builder.build();
  }
  render() {
    let color, icon;
    if (this.hasError) {
      color = 'red';
      icon = 'exclamationMarkTriangle';
    }
    return (h(Host, null, h("calcite-button", { loading: this.loading, onClick: () => this.onHandleClick(), color: color, "icon-start": icon }, h("slot", null))));
  }
};
ArcgisDownloadFeaturesButton.style = arcgisDownloadFeaturesButtonCss;

export { ArcgisDownloadFeaturesButton as arcgis_download_features_button };
