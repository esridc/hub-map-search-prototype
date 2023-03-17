import { r as registerInstance, e as createEvent, h, F as Fragment, f as Host, g as getElement } from './index-d836c4a8.js';
import { r as removePost } from './index-52ac08fb.js';
import './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubDiscussionsPostCss = ":host{display:block}";

const ArcgisHubDiscussionsPost = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostDelete = createEvent(this, "arcgisHubDiscussionsPostDelete", 7);
    this.arcgisHubDiscussionsFocus = createEvent(this, "arcgisHubDiscussionsFocus", 7);
    this.editing = false;
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidLoad() {
    if (this.focussed) {
      this.arcgisHubDiscussionsFocus.emit(this.el);
    }
  }
  handlepostEditOrCancel() {
    this.editing = false;
  }
  handleDelete() {
    const { post, hubRequestOptions } = this;
    removePost(Object.assign({ postId: post.id }, hubRequestOptions))
      .then(() => {
      this.arcgisHubDiscussionsPostDelete.emit(post);
    })
      .catch(e => {
      console.error(`Could not delete post:`, e.message);
    });
  }
  renderMenuActions() {
    return (h(Fragment, null, h("calcite-action", { appearance: "solid", scale: "m", text: "Edit", label: "Edit Post", "text-enabled": "", slot: "header-menu-actions", onClick: () => { this.editing = true; } }), h("calcite-action", { appearance: "solid", scale: "m", text: "Delete", label: "Delete Post", "text-enabled": "", slot: "header-menu-actions", onClick: this.handleDelete })));
  }
  renderTimestamp() {
    const { createdAt, updatedAt } = this.post;
    return createdAt === updatedAt
      ? [createdAt]
      : [updatedAt, h("em", null, "(edited)")];
  }
  renderEditor() {
    const { hubRequestOptions, post } = this;
    return (h("arcgis-hub-discussions-post-editor", { post: post, hubRequestOptions: hubRequestOptions }));
  }
  renderBody() {
    const { groups, post, numReplies } = this;
    return (h(Fragment, null, h("h3", null, post.title), h("slot", { name: "arcgis-hub-discussions-post-body" }), h("ul", null, groups.map(({ id, title }) => (h("li", { key: id }, title)))), h("span", { slot: "footer" }, h("calcite-icon", { icon: "speechBubble" }), numReplies), h("slot", { name: "arcgis-hub-discussions-post-footer", slot: "footer" })));
  }
  render() {
    var _a;
    const { editing, post: { creator: username } } = this;
    const creator = (_a = this.creator) !== null && _a !== void 0 ? _a : { username };
    return (h(Host, null, h("calcite-panel", null, h("calcite-avatar", { scale: "l", slot: "header-actions-start", username: creator.username, "user-id": creator.id, "full-name": creator.fullName, thumbnail: creator.thumbnail }), h("div", { slot: "header-content" }, creator.fullName && (h("strong", null, creator.fullName)), h("span", null, creator.username, " \u2022", this.renderTimestamp())), this.renderMenuActions(), editing
      ? this.renderEditor()
      : this.renderBody())));
  }
  get el() { return getElement(this); }
};
ArcgisHubDiscussionsPost.style = arcgisHubDiscussionsPostCss;

export { ArcgisHubDiscussionsPost as arcgis_hub_discussions_post };
