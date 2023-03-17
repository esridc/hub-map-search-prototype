import { r as registerInstance, h, f as Host } from './index-d836c4a8.js';

const arcgisHubTimelineCss = "*{margin:0px;padding:0px;color:var(--calcite-ui-text-1);list-style:none}:host{display:block;overflow:hidden;border-radius:1rem;background-color:var(--calcite-ui-brand);padding:0px;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}h1,label{margin-left:6rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-inverse)}h1{margin-top:1.25rem;font-size:var(--calcite-font-size-3);line-height:2rem}label{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-light)}ol{margin-top:1.25rem;background-color:var(--calcite-ui-foreground-1);padding:1.25rem;padding-top:2.5rem;padding-left:4rem}li{border-left:1px dashed #cccccc;padding:0 20px 20px 25px;position:relative}li:last-child{border:0px;padding-bottom:0px}li calcite-icon{left:-13px;position:absolute;background-color:var(--calcite-ui-foreground-1)}.stage{border:1px rgba(204, 204, 204, 0.2) solid;top:-12px;position:relative;margin-left:1.25rem;border-radius:0.75rem;padding:1rem;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}h4{font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium)}h5{margin-top:0.25rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-light)}p{margin-top:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal)}";

const ArcgisHubTimeline = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    this.parseStagesFromTimeline();
  }
  onTimelineChanged() {
    this.parseStagesFromTimeline();
  }
  parseStagesFromTimeline() {
    try {
      this.stages = this.timeline.stages;
    }
    catch (_a) {
      this.stages = [];
    }
  }
  render() {
    return (h(Host, null, h("h1", null, this.timeline.title), h("label", null, this.timeline.subtitle), h("ol", null, this.stages.map(stage => h("li", null, h("calcite-icon", { icon: stage.icon }), h("div", { class: "stage" }, h("h4", null, stage.title), h("h5", null, stage.timeframe), h("p", null, stage.description)))))));
  }
  static get watchers() { return {
    "timeline": ["onTimelineChanged"]
  }; }
};
ArcgisHubTimeline.style = arcgisHubTimelineCss;

export { ArcgisHubTimeline as arcgis_hub_timeline };
