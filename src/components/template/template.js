/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { prepareRequest } from '../../utils';
import { useErrorHandler } from 'react-error-boundary';
import { AppContext } from '../../utils/context';
import './template.css';

const Template = () => {
  const context = useContext(AppContext);
  const handleError = useErrorHandler();
  const [data, setData] = useState('');

  const props = useParams();

  const [modelType, path] = Object.values(props)[0].split(/\/(.*)/s);

  useEffect(() => {
    const sdk = prepareRequest(context);

    console.log(context,'check here');

    //put into use effect
    sdk.runPersistedQuery(`Nordstrom-folder/nordstrom-demo-${modelType}`, { path: `/${path}` })
      .then(({ data }) => {
        if (modelType=='module---featured-brands') {
          const featuredBrands = data.moduleFeaturedBrandsByPath;
          setData(featuredBrands.item);
        }
      })
      .catch((error) => {
        error.message = `Error with nordstrom-demo-${modelType} request:\n ${error.message}`;
        handleError(error);
      });
  }, [context, handleError, modelType, path]);

  const featuredBrand = data.featuredBrand;

  return (
    <React.Fragment>
      <div className='main-body'>
        {data && (
          <div
            className='block'
          >
            <h2>With style template - {modelType}</h2>  
            <h3>{data.title}</h3>
            <div style={{display:'flex', gap:'20px', justifyContent:'center'}}>
              {featuredBrand.map(brand=>{
                console.log(brand,'check');
                const url = 'http://www.nordstrom.com/brands/'+brand.slug;
                return(<div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'5px' }}>
                  <img src={brand.featuredImage._authorUrl} width="300px" height="300px"></img>
                  <u><a href={url} style={{color:'black'}}>{brand.brandName}</a></u>
                </div>);
              })}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

Template.propTypes = {
  pos1: PropTypes.string,
  pos2: PropTypes.string,
  pos3: PropTypes.string,
  location: PropTypes.object,
  context: PropTypes.object
};

export default Template;
