import { r as registerInstance, e as createEvent, h, F as Fragment, f as Host, g as getElement } from './index-d836c4a8.js';
import { r as removePost } from './index-52ac08fb.js';
import './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubDiscussionsReplyCss = ":host{display:block}";

const ArcgisHubDiscussionsReply = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsReplyDelete = createEvent(this, "arcgisHubDiscussionsReplyDelete", 7);
    this.arcgisHubDiscussionsFocus = createEvent(this, "arcgisHubDiscussionsFocus", 7);
    this.editing = false;
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidLoad() {
    if (this.focussed) {
      this.arcgisHubDiscussionsFocus.emit(this.el);
    }
  }
  handleReplyEditOrCancel() {
    this.editing = false;
  }
  renderBody() {
    const { reply: { body }, expand } = this;
    const text = body.substring(0, expand ? body.length : 100).trim();
    if (text.length < body.length) {
      return (h(Fragment, null, h("p", null, text, "\u2026"), h("span", { slot: "footer" }, h("calcite-icon", { icon: "speechBubble" }), "0"), this.renderFooterActions()));
    }
    else {
      return (h(Fragment, null, h("p", null, text), h("span", { slot: "footer" }, h("calcite-icon", { icon: "speechBubble" }), "0"), this.renderFooterActions()));
    }
  }
  handleDelete() {
    const { reply, hubRequestOptions } = this;
    removePost(Object.assign({ postId: reply.id }, hubRequestOptions))
      .then(() => {
      this.arcgisHubDiscussionsReplyDelete.emit(reply);
    })
      .catch(e => {
      console.error(`Could not delete reply:`, e.message);
    });
  }
  renderMenuActions() {
    return (h(Fragment, null, h("calcite-action", { appearance: "solid", scale: "m", text: "Edit", label: "Edit Reply", "text-enabled": "", slot: "header-menu-actions", onClick: () => { this.editing = true; } }), h("calcite-action", { appearance: "solid", scale: "m", text: "Delete", label: "Delete Reply", "text-enabled": "", slot: "header-menu-actions", onClick: this.handleDelete })));
  }
  renderFooterActions() {
    const { expand } = this;
    let text = 'Read More';
    let icon = 'caret-down';
    if (expand) {
      text = 'Read Less';
      icon = 'caret-up';
    }
    return (h("calcite-action", { slot: "footer", appearance: "solid", text: text, icon: icon, "text-enabled": true, onClick: () => { this.expand = !expand; } }));
  }
  renderTimestamp() {
    const { createdAt, updatedAt } = this.reply;
    return createdAt === updatedAt
      ? [createdAt]
      : [updatedAt, h("em", null, "(edited)")];
  }
  renderForm() {
    const { hubRequestOptions, reply } = this;
    return (h("arcgis-hub-discussions-reply-editor", { reply: reply, hubRequestOptions: hubRequestOptions }));
  }
  render() {
    const { creator, editing, focussed } = this;
    return (h(Host, { class: focussed && 'featured' }, h("calcite-panel", null, h("calcite-avatar", { scale: "l", slot: "header-actions-start", username: creator.username, "user-id": creator.id, "full-name": creator.fullName, thumbnail: creator.thumbnail }), h("div", { slot: "header-content" }, creator.fullName && creator.username && [
      h("strong", null, creator.fullName),
      h("span", null, creator.username, " \u2022", this.renderTimestamp())
    ]), this.renderMenuActions(), editing
      ? this.renderForm()
      : this.renderBody())));
  }
  get el() { return getElement(this); }
};
ArcgisHubDiscussionsReply.style = arcgisHubDiscussionsReplyCss;

export { ArcgisHubDiscussionsReply as arcgis_hub_discussions_reply };
