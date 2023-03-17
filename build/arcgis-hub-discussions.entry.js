import { r as registerInstance, h, F as Fragment, i as getAssetPath, f as Host } from './index-d836c4a8.js';
import { s as searchPosts, f as fetchPost, a as fetchChannel, p as parseDiscussionURI, D as DiscussionType, i as isGroupDiscussable, b as isItemDiscussable } from './index-52ac08fb.js';
import { g as getMembers, a as getTeamById, C as CacheDecoratorFactory } from './cache-de5b89d2.js';
import { g as getContent } from './index-19f5f2eb.js';
import './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';
import './index-d6e159fc.js';
import './_commonjsHelpers-93ec9c7a.js';

const arcgisHubDiscussionsCss = ":host{display:block;height:100%}";

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
const ArcgisHubDiscussions = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  // do not query through to page
  async componentWillLoad() {
    try {
      const { postId, replyId, discussion, hubRequestOptions: { authentication } } = this;
      const [discussionDetails, user, thread] = await Promise.all([
        this.fetchSubjectDetails(discussion),
        authentication.getUser({ authentication }),
        this.fetchThread(replyId || postId)
      ]);
      this.targetId = replyId || postId;
      this.discussionDetails = discussionDetails;
      this.user = user;
      this.thread = thread;
    }
    catch (detail) {
      this.handleDiscussionsError({ detail });
    }
  }
  searchPosts(params) {
    return searchPosts(Object.assign({ params }, this.hubRequestOptions));
  }
  fetchPost(postId) {
    const { authentication, isPortal, hubApiUrl, portalSelf } = this.hubRequestOptions;
    return fetchPost({
      postId,
      authentication,
      isPortal,
      hubApiUrl,
      portalSelf
    });
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
  async fetchThread(postId) {
    const { hubRequestOptions } = this;
    if (postId) {
      const post = await this.fetchPost(postId);
      if (!post.parentId) {
        const [creator, channel, { total: numReplies }] = await Promise.all([
          this.getCreator(post.creator),
          this.fetchChannel(post.channelId),
          this.searchPosts({
            discussion: post.discussion,
            parents: [postId],
            num: 1,
            start: 1
          })
        ]);
        const groups = await Promise.all(channel.groups.map(id => getTeamById(id, hubRequestOptions)));
        return {
          post,
          creator,
          channel,
          groups,
          numReplies
        };
      }
      return this.fetchThread(post.parentId);
    }
  }
  async fetchSubjectDetails(discussion) {
    const { hubRequestOptions } = this;
    let results = {
      discussion,
      reference: null,
      isDiscussable: true,
      source: null,
      type: null,
      id: null,
      layer: null,
      features: null,
      attribute: null
    };
    if (discussion) {
      const discussionParams = parseDiscussionURI(discussion);
      const fetch = (id, method, isDiscussable) => method(id, hubRequestOptions)
        .then(reference => (Object.assign({ discussion,
        reference, isDiscussable: isDiscussable(reference) }, discussionParams)));
      results = await (discussionParams.type === DiscussionType.GROUP)
        ? fetch(discussionParams.id, getTeamById, isGroupDiscussable)
        : fetch(discussionParams.id, getContent, isItemDiscussable);
    }
    return results;
  }
  handlePostCreate() {
    this.showForm = true;
  }
  handlePostDelete() {
    this.thread = null;
  }
  handlePostCancel() {
    this.showForm = false;
  }
  handlePostCreated({ detail: post }) {
    this.showForm = false;
    this.targetId = post.id;
  }
  handlePostSelect({ detail: thread }) {
    this.thread = thread;
  }
  handleBack() {
    this.thread = null;
  }
  handleDiscussionsError({ detail }) {
    console.error(`Hub discussions error:`, detail);
    this.error = detail;
  }
  handleFocus() {
    this.targetId = null;
  }
  renderDisabled() {
    return (h(Fragment, null, h("img", { src: getAssetPath('./assets/warning.svg') }), h("h4", null, "Discussions currently disabled"), h("p", null, "An administrator or team manager must enable discussions.")));
  }
  renderThreadList() {
    const { discussionDetails, hubRequestOptions, postId, targetId } = this;
    return (h("arcgis-hub-discussions-thread-list", { hubRequestOptions: hubRequestOptions, discussionDetails: discussionDetails, "post-id": targetId === postId && postId }));
  }
  renderLoading() {
    return (h("calcite-loader", { active: "", type: "indeterminate", scale: "m", value: "0" }));
  }
  renderError() {
    return (h("p", null, "Error"));
  }
  renderEditor() {
    const { user, hubRequestOptions, discussion, groupIds } = this;
    return (h("arcgis-hub-discussions-post-editor", { discussion: discussion, user: user, groupIds: groupIds && groupIds.split(','), hubRequestOptions: hubRequestOptions }));
  }
  renderThread() {
    const { user, thread, hubRequestOptions, replyId, targetId } = this;
    return (h(Fragment, null, h("calcite-action", { appearance: "solid", scale: "m", text: "< All Posts", "text-enabled": "", onClick: () => { this.thread = null; } }), h("arcgis-hub-discussions-thread", { post: thread.post, creator: thread.creator, groups: thread.groups, "num-replies": thread.numReplies, "reply-id": targetId === replyId && replyId, user: user, hubRequestOptions: hubRequestOptions })));
  }
  render() {
    const { discussion, discussionDetails, user, error, showForm, thread } = this;
    const successful = Boolean((!discussion || discussion && discussionDetails.reference) && user);
    let view = this.renderLoading();
    if (error) {
      view = this.renderError();
    }
    else if (!discussionDetails.isDiscussable) {
      view = this.renderDisabled();
    }
    else if (successful) {
      if (showForm) {
        view = this.renderEditor();
      }
      else {
        view = thread
          ? this.renderThread()
          : this.renderThreadList();
      }
    }
    return (h(Host, null, view));
  }
  static get assetsDirs() { return ["assets"]; }
};
__decorate([
  CacheDecoratorFactory({ scope: 'channels' })
], ArcgisHubDiscussions.prototype, "fetchChannel", null);
__decorate([
  CacheDecoratorFactory({ scope: 'creators' })
], ArcgisHubDiscussions.prototype, "getCreator", null);
ArcgisHubDiscussions.style = arcgisHubDiscussionsCss;

export { ArcgisHubDiscussions as arcgis_hub_discussions };
