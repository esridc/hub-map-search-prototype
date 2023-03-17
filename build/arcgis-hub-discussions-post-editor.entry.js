import { r as registerInstance, e as createEvent, h, f as Host } from './index-d836c4a8.js';
import { d as createPost, e as SharingAccess, u as updatePost } from './index-52ac08fb.js';
import './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubDiscussionsPostEditorCss = ":host{display:block}";

const ArcgisHubDiscussionsPostForm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubDiscussionsPostCancel = createEvent(this, "arcgisHubDiscussionsPostCancel", 7);
    this.arcgisHubDiscussionsPostCreate = createEvent(this, "arcgisHubDiscussionsPostCreate", 7);
    this.arcgisHubDiscussionsPostEdit = createEvent(this, "arcgisHubDiscussionsPostEdit", 7);
    this.pending = false;
    this.titleValue = '';
    this.bodyValue = '';
    this._groupIds = [];
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTitleValue = this.updateTitleValue.bind(this);
    this.updateBodyValue = this.updateBodyValue.bind(this);
    this.updateGroupsValue = this.updateGroupsValue.bind(this);
  }
  componentWillLoad() {
    const { post, groupIds } = this;
    if (post) {
      this.bodyValue = post.body;
      this.titleValue = post.title;
    }
    if (groupIds) {
      this._groupIds = groupIds;
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const promise = this.post
      ? this.handleEdit()
      : this.handleCreate();
    this.pending = true;
    return promise
      .catch(e => {
      console.error(`Could not create post:`, e.message);
    })
      .finally(() => {
      this.pending = false;
    });
  }
  handleCreate() {
    const { hubRequestOptions: { isPortal, hubApiUrl, authentication, portalSelf }, bodyValue, titleValue, _groupIds, arcgisHubDiscussionsPostCreate, discussion } = this;
    return createPost({
      params: {
        access: SharingAccess.PRIVATE,
        groups: _groupIds,
        discussion,
        title: titleValue,
        body: bodyValue
      },
      isPortal,
      hubApiUrl,
      authentication,
      portalSelf
    })
      .then(post => {
      arcgisHubDiscussionsPostCreate.emit(post);
      return post;
    });
  }
  handleEdit() {
    const { hubRequestOptions: { isPortal, hubApiUrl, authentication, portalSelf }, bodyValue, titleValue, post, arcgisHubDiscussionsPostEdit } = this;
    return updatePost({
      params: {
        title: titleValue,
        body: bodyValue
      },
      isPortal,
      hubApiUrl,
      authentication,
      portalSelf,
      postId: post.id
    })
      .then(editedPost => {
      arcgisHubDiscussionsPostEdit.emit(editedPost);
      return editedPost;
    });
  }
  handleCancel(evt) {
    evt.preventDefault();
    this.arcgisHubDiscussionsPostCancel.emit();
  }
  updateBodyValue(evt) {
    this.bodyValue = evt.target.value;
  }
  updateTitleValue(evt) {
    this.titleValue = evt.target.value;
  }
  updateGroupsValue(evt) {
    this._groupIds = [evt.target.value];
  }
  handleCalciteSelectChange(evt) {
    this._groupIds = [evt.target.value];
  }
  renderGroups() {
    const { _groupIds, user, post } = this;
    if (post) {
      return;
    }
    else if (_groupIds.length) {
      const groups = _groupIds.map(channelId => user.groups.find(({ id }) => id === channelId));
      return (h("ul", null, groups.map(({ id, title }) => (h("li", { key: id }, title)))));
    }
    else {
      return (h("select", { onInput: this.updateGroupsValue }, user.groups.reduce((acc, { id, title }) => ([...acc, (h("option", { value: id, selected: _groupIds.includes(id), key: id }, title))]), [h("option", { value: "-1", key: "-1" }, "Choose Team \u25BC")]))
      // <calcite-select>
      //   {user.groups.reduce(
      //     (acc, { id, title }) => ([...acc, <calcite-option value={id} selected={groupIds.includes(id)}>{title}</calcite-option>]),
      //     [<calcite-option value="-1">Choose Team &#9660;</calcite-option>])}
      // </calcite-select>
      );
    }
  }
  render() {
    const { titleValue, bodyValue, pending } = this;
    return (h(Host, null, h("form", { onSubmit: this.handleSubmit }, h("h4", null, "New Post:"), this.renderGroups(), h("calcite-input", { type: "text", value: titleValue, placeholder: "Post title*", onInput: this.updateTitleValue }), h("textarea", { id: "post-body", name: "post-body", value: bodyValue, onInput: this.updateBodyValue, placeholder: "What do you want to say?*" }), h("calcite-button", { appearance: "outline", color: "blue", scale: "m", width: "auto", type: "button", onClick: this.handleCancel }, "Cancel"), h("calcite-button", { type: "button", appearance: "solid", color: "blue", scale: "m", width: "auto", loading: pending, onClick: this.handleSubmit }, "Publish"))));
  }
};
ArcgisHubDiscussionsPostForm.style = arcgisHubDiscussionsPostEditorCss;

export { ArcgisHubDiscussionsPostForm as arcgis_hub_discussions_post_editor };
