import { h } from './index-d836c4a8.js';

function constrainHeadingLevel(level) {
  return Math.min(Math.max(Math.ceil(level), 1), 6);
}
const CalciteHeading = (props, children) => {
  const HeadingTag = `h${props.level}`;
  delete props.level;
  return h(HeadingTag, Object.assign({}, props), children);
};

export { CalciteHeading as C, constrainHeadingLevel as c };
