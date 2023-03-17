import { r as registerInstance, e as createEvent, h, F as Fragment, i as getAssetPath, f as Host, g as getElement } from './index-d836c4a8.js';
import { s as searchPosts, S as SortOrder, a as fetchChannel } from './index-52ac08fb.js';
import { g as getMembers, a as getTeamById, C as CacheDecoratorFactory } from './cache-de5b89d2.js';
import './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubDiscussionsThreadListCss = ":host{display:block;overflow:auto;height:100%}";

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
const ArcgisHubDiscussionsThreadList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostSelect = createEvent(this, "arcgisHubDiscussionsPostSelect", 7);
    this.arcgisHubDiscussionsCreatePost = createEvent(this, "arcgisHubDiscussionsCreatePost", 7);
    this.arcgisHubDiscussionsError = createEvent(this, "arcgisHubDiscussionsError", 7);
    this.start = 1;
    this.total = 0;
    this.num = 10;
    this.fetchThreadDetails = this.fetchThreadDetails.bind(this);
    this.renderThread = this.renderThread.bind(this);
  }
  componentWillLoad() {
    this.fetchThreads();
  }
  async fetchThreads() {
    const { start, postId } = this;
    return this.fetchOriginalPosts(start, postId)
      .then(items => Promise.all(items.map(this.fetchThreadDetails)))
      .then(threads => {
      this.threads = threads;
    })
      .catch(cause => {
      this.arcgisHubDiscussionsError.emit(cause);
    });
  }
  searchPosts(params) {
    return searchPosts(Object.assign({ params }, this.hubRequestOptions));
  }
  async fetchOriginalPosts(start, postId) {
    var _a;
    const { num, discussionDetails } = this;
    const { total, items, nextStart } = await this.searchPosts({
      discussion: (_a = discussionDetails.discussion) !== null && _a !== void 0 ? _a : '%',
      parents: [],
      num,
      start,
      sortOrder: SortOrder.DESC,
      sortBy: 'updatedAt'
    });
    this.total = total;
    this.start = start;
    if (!postId) {
      return items;
    }
    else {
      const post = items.find(({ id }) => id === postId);
      return (post || nextStart === -1)
        ? items
        : this.fetchOriginalPosts(nextStart, postId);
    }
  }
  fetchChannel(channelId) {
    const { authentication, isPortal, hubApiUrl, portalSelf } = this.hubRequestOptions;
    return fetchChannel({
      channelId,
      authentication,
      isPortal,
      hubApiUrl,
      portalSelf
    });
  }
  getCreator(...usernames) {
    return getMembers(usernames, this.hubRequestOptions)
      .then(([creator]) => creator);
  }
  async fetchThreadDetails(post) {
    const { hubRequestOptions } = this;
    const [creator, channel, { total: numReplies }] = await Promise.all([
      this.getCreator(post.creator),
      this.fetchChannel(post.channelId),
      this.searchPosts({
        discussion: post.discussion,
        parents: [post.id],
        num: 1,
        start: 1
      })
    ]);
    const groups = await Promise.all(channel.groups.map(id => getTeamById(id, hubRequestOptions)));
    return {
      post,
      channel,
      groups,
      creator,
      numReplies
    };
  }
  handlePaginationChange({ detail: { start } }) {
    this.start = start;
    this.fetchThreads();
  }
  handleFocus({ detail: element }) {
    this.el.scrollTo(0, element.offsetTop);
  }
  handlePostEdit({ detail: post }) {
    this.threads = this.threads.map(thread => (thread.post.id === post.id)
      ? Object.assign(Object.assign({}, thread), { post }) : thread);
  }
  handlePostDelete(evt) {
    evt.stopPropagation();
    this.start = 1;
    this.fetchThreads();
  }
  renderLoading() {
    return (h("calcite-loader", { active: "", type: "indeterminate", scale: "m", value: "0" }));
  }
  renderBody(thread) {
    const formatted = thread.post.body.substring(0, 100).trim();
    const isTruncated = formatted.length < thread.post.body.length;
    if (isTruncated) {
      return (h("p", { slot: "arcgis-hub-discussions-post-body" }, formatted, "\u2026"));
    }
    else {
      return (h("p", { slot: "arcgis-hub-discussions-post-body" }, formatted));
    }
  }
  renderThread(thread) {
    const { arcgisHubDiscussionsPostSelect, hubRequestOptions, postId } = this;
    return (h("calcite-list-item", { role: "listitem", key: thread.post.id }, h("arcgis-hub-discussions-post", { post: thread.post, creator: thread.creator, groups: thread.groups, numReplies: thread.numReplies, hubRequestOptions: hubRequestOptions, focussed: thread.post.id === postId }, this.renderBody(thread), h("calcite-action", { slot: "arcgis-hub-discussions-post-footer", appearance: "solid", text: "See more", "text-enabled": true, onClick: () => arcgisHubDiscussionsPostSelect.emit(thread) }))));
  }
  renderList() {
    const { threads, total, start, num, arcgisHubDiscussionsCreatePost } = this;
    return (h(Fragment, null, h("calcite-button", { appearance: "solid", color: "blue", scale: "m", width: "auto", type: "button", onClick: () => arcgisHubDiscussionsCreatePost.emit() }, "New Post"), h("p", null, total, " posts"), h("calcite-list", { role: "list" }, threads.map(this.renderThread)), h("calcite-pagination", { scale: "m", start: start, total: total, num: num, dir: "ltr" })));
  }
  renderError() {
    return (h("p", null, "Error"));
  }
  renderEmpty() {
    const { arcgisHubDiscussionsCreatePost } = this;
    return (h(Fragment, null, h("img", { src: getAssetPath('./assets/comments.svg') }), h("h4", null, "No posts yet!"), h("p", null, "Create a new posts to start a discussion."), h("calcite-button", { appearance: "solid", color: "blue", "text-enabled": true, type: "button", onClick: () => arcgisHubDiscussionsCreatePost.emit() }, "New Post")));
  }
  renderContent() {
    const { total, discussionDetails } = this;
    return (h(Fragment, null, discussionDetails.reference && (h("h6", null, discussionDetails.reference.title)), total
      ? this.renderList()
      : this.renderEmpty()));
  }
  render() {
    return (h(Host, null, this.threads
      ? this.renderContent()
      : this.renderLoading()));
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
};
__decorate([
  CacheDecoratorFactory({ scope: 'channels' })
], ArcgisHubDiscussionsThreadList.prototype, "fetchChannel", null);
__decorate([
  CacheDecoratorFactory({ scope: 'creators' })
], ArcgisHubDiscussionsThreadList.prototype, "getCreator", null);
ArcgisHubDiscussionsThreadList.style = arcgisHubDiscussionsThreadListCss;

export { ArcgisHubDiscussionsThreadList as arcgis_hub_discussions_thread_list };
