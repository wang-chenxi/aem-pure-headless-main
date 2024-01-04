/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import { useErrorHandler } from 'react-error-boundary';
import { pageRef } from '../../api/api';
import { AppContext } from '../../utils/context';

const Footer = ({ config }) => {
  const context = useContext(AppContext);
  const [footer, setFooter] = useState({});
  const handleError = useErrorHandler();

  useEffect(() => {
    if (!config) return;
    const url = context.defaultServiceURL === context.serviceURL || context.serviceURL.includes('publish-') ?
      config._publishUrl.replace('.html', '.model.json') :
      config._authorUrl.replace('.html', '.model.json');

    const walk = [':items', 'root', ':items', 'container', ':items', 'container', ':items'];

    pageRef(url, context, walk)
      .then((res) => {
        res.image.src = `${context.serviceURL}${res?.image?.src.substring(1)}`;
        setFooter(res);
      })
      .catch((error) => {
        handleError(error);
      });

  }, [config, handleError, context]);

  const { host, pathname } = window.location;

  return (
    <React.Fragment>
      <div style={{background:'black', color:'white'}}>
        <div className='version'>
          <span>version 1.0</span>
          <span>{context.serviceURL}</span>
          <span>{context.project}</span>
          <span><a href={`https://experience.adobe.com/#/aem/editor/canvas/${host}${pathname}`} target='_blank' rel='noreferrer'>Open in Editor</a></span>
        </div>
      </div>
    </React.Fragment>
  );
};

Footer.propTypes = {
  config: PropTypes.object,
  context: PropTypes.object
};

export default Footer;