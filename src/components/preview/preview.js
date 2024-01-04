import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { prepareRequest } from '../../utils';
import { useErrorHandler } from 'react-error-boundary';
import { AppContext } from '../../utils/context';
import './preview.css';

const Preview = () => {
  const context = useContext(AppContext);
  const handleError = useErrorHandler();
  const [data, setData] = useState('');

  const props = useParams();

  const [modelType, path] = Object.values(props)[0].split(/\/(.*)/s);

  console.log(modelType,path, 'check setup');

  useEffect(() => {
    const sdk = prepareRequest(context);

    console.log(context,'check here');

    //put into use effect
    sdk.runPersistedQuery(`Nordstrom-folder/nordstrom-demo-${modelType}`, { path: `/${path}` })
      .then(({ data }) => {
        if (modelType=='product') {
          const product = data.productByPath;
          setData(product.item);
        }else if(modelType=='brand'){
          const brand = data.brandByPath;
          setData(brand.item);
        }
      })
      .catch((error) => {
        error.message = `Error with nordstrom-demo-${modelType} request:\n ${error.message}`;
        handleError(error);
      });
  }, [context, handleError, modelType, path]);

  return (
    <React.Fragment>
      <div className='main-body'>
        {data && (
          <div
            className='block'
          >
            <h2>Pure content fragment - {modelType}</h2>
            <h3>{data.product||data.brandName}</h3>
            {data.image&&<img src={data.image._authorUrl} width="400px"></img>}
            {data.featuredImage&&<img src={data.featuredImage._authorUrl} width="400px"></img>}
            {data.body&&<div className="content" dangerouslySetInnerHTML={{__html: data.body.html}}></div>}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

Preview.propTypes = {
  pos1: PropTypes.string,
  pos2: PropTypes.string,
  pos3: PropTypes.string,
  location: PropTypes.object,
  context: PropTypes.object
};

export default Preview;
