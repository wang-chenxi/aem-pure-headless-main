import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Preview from './components/preview';
import Settings from './utils/settings';
import Template from './components/template/template';
import Footer from './components/footer/footer';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/error';
import { useErrorHandler } from 'react-error-boundary';
import { ThreeDots } from 'react-loader-spinner';
import { AppContext } from './utils/context';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const App = () => {
  const context = useContext(AppContext);
  const [wait, setWait] = useState(true);
  const handleError = useErrorHandler();
  const aemUrl = context.serviceURL.replace(/\/$/, '');

  useEffect(() => {
    if (!document.querySelector(`head link[rel="preconnect"][href="${aemUrl}"]`)) {
      document.querySelector('head').insertAdjacentHTML('beforeend', `<link rel="preconnect" href="${aemUrl}" />`);
    }
  },[aemUrl]);
  
  useEffect(() => {

    setWait(false);

  }, [context, handleError]);

  if (wait) {
    return (<ThreeDots
      height='120'
      width='120'
      radius='9'
      color='rgba(41,41,41)'
      ariaLabel='three-dots-loading'
      wrapperStyle={{}}
      wrapperClassName='.loading'
      visible={true}
    />);
  } else {
    return (
      <HelmetProvider>
        <div className='App'>
          <h2 style={{background:'black', color:'white', padding:'30px'}}>NORDSTROM POC</h2>
          <Helmet>
            <meta name='urn:adobe:aue:system:aemconnection' content={`aem:${aemUrl}`} />
          </Helmet>
          <BrowserRouter>
            <Routes>
              <Route exact={true} path={'/preview/*'} element={
                <ErrorBoundary
                  FallbackComponent={Error}
                  onReset={() => {
                    sessionStorage.removeItem('loggedin');
                    sessionStorage.removeItem('auth');
                  }}
                ><Preview /></ErrorBoundary>
              } />
              <Route exact={true} path={'/template/*'} element={
                <ErrorBoundary
                  FallbackComponent={Error}
                  onReset={() => {
                    sessionStorage.removeItem('loggedin');
                    sessionStorage.removeItem('auth');
                  }}
                ><Template /></ErrorBoundary>
              } />
              <Route exact={true} path={'/settings'} element={
                <ErrorBoundary
                  FallbackComponent={Error}
                  onReset={() => {
                    sessionStorage.removeItem('loggedin');
                    sessionStorage.removeItem('auth');
                  }}
                >
                  <Settings /> </ErrorBoundary>} />
              <Route exact={false} path={'/*'} element={

                <ErrorBoundary
                  FallbackComponent={Error}
                  onReset={() => {
                    sessionStorage.clear();
                    localStorage.clear();
                  }}
                >placeholder</ErrorBoundary>

              } />

              <Route exact={true} path={'/aem-pure-headless/*'} element={

                <ErrorBoundary
                  FallbackComponent={Error}
                  onReset={() => {
                    sessionStorage.removeItem('loggedin');
                    sessionStorage.removeItem('auth');
                  }}
                >placeholder</ErrorBoundary>

              } />
              <Route exact={true} path={`/${context.project}/*`} element={
                <ErrorBoundary
                  FallbackComponent={Error}
                  onReset={() => {
                    sessionStorage.removeItem('loggedin');
                    sessionStorage.removeItem('auth');
                  }}
                >placeholder</ErrorBoundary>
              } />

            </Routes>
          </BrowserRouter>
        </div>
        <Footer/>
      </HelmetProvider>
    );
  }
};

export default App;
