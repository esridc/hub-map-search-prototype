import { r as registerInstance, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { s as searchPosts, S as SortOrder } from './index-52ac08fb.js';
import { g as getMembers, C as CacheDecoratorFactory } from './cache-de5b89d2.js';
import './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubDiscussionsThreadCss = ":host>div>.scrollable-area{grid-area:list;overflow:auto;scroll-behavior:smooth;position:relative}:host>div>arcgis-hub-discussions-reply-form{grid-area:form}:host>div{display:grid;grid-template-columns:auto;grid-template-rows:1fr 51px;grid-template-areas:'list' 'form';height:calc(100% - 48px)}:host>div>.scrollable-area arcgis-hub-discussions-post{border-bottom:1px solid var(--calcite-ui-border-3)}:host arcgis-hub-discussions-reply[focussed]{border:3px solid var(--calcite-link-blue-underline)}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubDiscussionsThread = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.start = 1;
    this.total = 0;
    this.num = 10;
    this.loading = true;
    this.fetchReplyDetails = this.fetchReplyDetails.bind(this);
  }
  componentWillLoad() {
    const { replyId, post } = this;
    this._post = Object.assign({}, post);
    this._replyId = replyId;
    this.fetchReplies();
  }
  fetchReplies() {
    const { start, _replyId } = this;
    this.loading = true;
    return this.fetchChildPosts(start, _replyId)
      .then(items => Promise.all(items.map(this.fetchReplyDetails)))
      .then(repliesWithDetails => {
      this.replies = repliesWithDetails;
      this.loading = false;
    });
  }
  searchPosts(params) {
    return searchPosts(Object.assign({ params }, this.hubRequestOptions));
  }
  async fetchChildPosts(start, replyId) {
    const { _post, num } = this;
    const { total, items, nextStart } = await this.searchPosts({
      parents: [_post.id],
      num,
      start,
      sortOrder: SortOrder.DESC,
      sortBy: 'updatedAt'
    });
    this.total = total;
    this.start = start;
    if (!replyId) {
      return items;
    }
    else {
      const reply = items.find(({ id }) => id === replyId);
      return (reply || nextStart === -1)
        ? items
        : this.fetchChildPosts(nextStart, replyId);
    }
  }
  getCreator(...usernames) {
    return getMembers(usernames, this.hubRequestOptions)
      .then(([creator]) => creator);
  }
  fetchReplyDetails(post) {
    return this.getCreator(post.creator)
      .then(creator => ({
      post,
      creator
    }));
  }
  handlePaginationChange({ detail: { start } }) {
    this.start = start;
    this.fetchReplies();
  }
  handleReplyCreated({ detail: { id } }) {
    this.start = 1;
    this._replyId = id;
    this.fetchReplies();
  }
  handleReplyEdit({ detail: post }) {
    this.replies = this.replies.map(replyDetails => (post.id === replyDetails.post.id)
      ? Object.assign(Object.assign({}, replyDetails), { post }) : replyDetails);
  }
  handlePostEdit({ detail: post }) {
    this._post = post;
  }
  handleFocus({ detail: element }) {
    this.scrollableArea.scrollTo(0, element.offsetTop);
  }
  handleReplyDelete() {
    this.start = 1;
    this.fetchReplies();
  }
  renderReplies() {
    const { replies, hubRequestOptions, _replyId } = this;
    if (replies) {
      return (h("calcite-list", { role: "list" }, replies.map(details => (h("calcite-list-item", { role: "listitem", key: details.post.id }, h("arcgis-hub-discussions-reply", { reply: details.post, creator: details.creator, hubRequestOptions: hubRequestOptions, focussed: _replyId === details.post.id }))))));
    }
  }
  render() {
    const { _post, creator, groups, user, hubRequestOptions, start, total, num, loading, numReplies } = this;
    return (h(Host, null, loading
      ? (h("calcite-loader", { active: "", type: "indeterminate", scale: "m", value: "0" }))
      : [
        h("div", null, h("div", { ref: scrollableArea => { this.scrollableArea = scrollableArea; }, class: "scrollable-area" }, h("arcgis-hub-discussions-post", { post: _post, creator: creator, groups: groups, hubRequestOptions: hubRequestOptions, numReplies: numReplies }, h("p", { slot: "arcgis-hub-discussions-post-body" }, _post.body)), this.renderReplies(), h("calcite-pagination", { scale: "m", start: start, total: total, num: num, dir: "ltr" })), h("arcgis-hub-discussions-reply-editor", { post: _post, user: user, hubRequestOptions: hubRequestOptions }))
      ]));
  }
  get el() { return getElement(this); }
};
__decorate([
  CacheDecoratorFactory({ scope: 'creators' })
], ArcgisHubDiscussionsThread.prototype, "getCreator", null);
ArcgisHubDiscussionsThread.style = arcgisHubDiscussionsThreadCss;

export { ArcgisHubDiscussionsThread as arcgis_hub_discussions_thread };
