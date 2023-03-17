import { r as registerInstance, e as createEvent, h, F as Fragment, f as Host } from './index-d836c4a8.js';
import { c as createReply, u as updatePost } from './index-52ac08fb.js';
import './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubDiscussionsReplyEditorCss = ":host form{display:flex}";

const ArcgisHubDiscussionsReplyForm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsReplyCreate = createEvent(this, "arcgisHubDiscussionsReplyCreate", 7);
    this.arcgisHubDiscussionsReplyEdit = createEvent(this, "arcgisHubDiscussionsReplyEdit", 7);
    this.arcgisHubDiscussionsReplyDelete = createEvent(this, "arcgisHubDiscussionsReplyDelete", 7);
    this.arcgisHubDiscussionsReplyCancel = createEvent(this, "arcgisHubDiscussionsReplyCancel", 7);
    this.bodyValue = '';
    this.pending = false;
    this.maxLength = 512;
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
    this.updateBodyValue = this.updateBodyValue.bind(this);
  }
  componentDidLoad() {
    const { reply } = this;
    if (reply) {
      this.bodyValue = reply.body;
    }
  }
  handleReplySubmit(evt) {
    evt.preventDefault();
    const { reply } = this;
    const promise = reply
      ? this.handleEdit()
      : this.handleCreate();
    this.pending = true;
    return promise
      .catch((e) => {
      console.error(`Could not create reply:`, e.message);
    })
      .finally(() => {
      this.pending = false;
    });
  }
  handleCreate() {
    const { bodyValue, post, hubRequestOptions: { authentication, isPortal, hubApiUrl, portalSelf } } = this;
    return createReply({
      params: {
        channelId: post.channelId,
        discussion: post.discussion,
        body: bodyValue
      },
      postId: post.id,
      authentication,
      isPortal,
      hubApiUrl,
      portalSelf
    })
      .then(post => {
      this.bodyValue = '';
      this.arcgisHubDiscussionsReplyCreate.emit(post);
      return post;
    });
  }
  handleEdit() {
    const { bodyValue, reply, hubRequestOptions: { authentication, isPortal, hubApiUrl, portalSelf } } = this;
    return updatePost({
      params: {
        body: bodyValue
      },
      postId: reply.id,
      isPortal,
      hubApiUrl,
      authentication,
      portalSelf
    })
      .then(updatedReply => {
      this.arcgisHubDiscussionsReplyEdit.emit(updatedReply);
      return updatedReply;
    });
  }
  updateBodyValue(evt) {
    this.bodyValue = evt.target.value;
  }
  renderUserDetails() {
    const { reply } = this;
    if (reply) {
      return;
    }
    else {
      const { username, id, fullName, thumbnail } = this.user;
      return (h(Fragment, null, h("calcite-avatar", { scale: "l", slot: "header-actions-start", username: username, "user-id": id, "full-name": fullName, thumbnail: thumbnail }), h("p", null, fullName)));
    }
  }
  render() {
    const { bodyValue, pending, reply, maxLength } = this;
    return (h(Host, null, h("form", { name: "reply-form", onSubmit: this.handleReplySubmit, action: "" }, this.renderUserDetails(), h("textarea", { id: "reply-body", name: "reply-body", value: bodyValue, onInput: this.updateBodyValue, placeholder: "Reply to this post\u2026", maxlength: maxLength }), h("p", null, bodyValue.length, "/", maxLength), reply && (h("calcite-button", { appearance: "solid", scale: "m", alignment: "center", width: "auto", type: "button", loading: pending, onClick: () => { this.arcgisHubDiscussionsReplyCancel.emit(); } }, "Cancel")), h("calcite-button", { appearance: "solid", color: "blue", scale: "m", alignment: "center", width: "auto", type: "button", loading: pending, onClick: this.handleReplySubmit }, "Reply"))));
  }
};
ArcgisHubDiscussionsReplyForm.style = arcgisHubDiscussionsReplyEditorCss;

export { ArcgisHubDiscussionsReplyForm as arcgis_hub_discussions_reply_editor };
