import React from 'react';
// import ImageList from '../../components/imagelist';
// import PageRef from '../../components/pageref';
import PropTypes from 'prop-types';

// export const componentMapping = {
//   ImageList,
//   PageRef
// };

const ModelManager = ({ content, config }) => {
  // const type = content.__typename.replace(/Model/g, '');
  // const Component = componentMapping[type];
 
  // if (typeof Component !== 'undefined')
  //   return <Component content={content} config={config} />;
  // else return <p>Neet to add {type} to ModelManager.</p>;
  return null;
};

ModelManager.propTypes = {
  type: PropTypes.string,
  content: PropTypes.object,
  references: PropTypes.string,
  config: PropTypes.object,
  context: PropTypes.object
};

export default ModelManager;
