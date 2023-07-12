
import React from 'react'; //{useState}
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRouter from '@/pages/Public/PublicRouter';
import LoginAuthRouter from '@/pages/Auth/LoginAuthRouter';
import AdminRouter from '@/pages/Admin/AdminRouter';
import AdminLayout from './pages/Admin/AdminLayout';
import AuthGuard from './_helpers/AuthGuard';
//import IframeRouter from './pages/Iframe/IframeRouter';
import GetClassesIframe from './pages/Iframe/GetClassesIframe';

import { ContextAddEleveProvider } from './_utils/ContextAddEleve';


//import { AddEleveContext } from './_utils/ContextAddEleve';


const App = () => {

  


 
//////////////////////////////////////////

  return (

    <div>
      
      
      <ContextAddEleveProvider >

        <BrowserRouter>
          
              <Routes>

                <Route path='/*' element= { <PublicRouter/> }/>

                <Route path='/auth/*' element= { <LoginAuthRouter/> }/>
                <Route element= { <AdminLayout/> }>

                    <Route path='/admin/*' element= { 
                      
                      <AuthGuard>
                        <AdminRouter/> 
                      </AuthGuard>
                      
                    }/>

                </Route>

                <Route path='/getalliframe' element= { 
                  //<AuthGuard>
                      <GetClassesIframe/> 
                // </AuthGuard>
              
                }/>

              </Routes>
              
        
        </BrowserRouter>

       </ContextAddEleveProvider >
      

    </div>
  );
};

export default App;

// <Route path='/*' element= { <IframeRouter/> }/>