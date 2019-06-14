import PropTypes from 'prop-types';

let globalCssModule;

export function setGlobalCssModule(cssModule){
  globalCssModule = cssModule;
}

export function mapToCssModules(className = '',cssModule = globalCssModule){
  if(!cssModule) return className;
  return className
    .split(' ')
    .map(c => cssModule[c] || c)
    .join(' ');
}

export const tagPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
  PropTypes.shape({$$typeof: PropTypes.symbol, render: PropTypes.func}),
]);

export const canUseDOM = !!(
  typeof window !== 'undefined' && window.document && window.document.createElement
);

