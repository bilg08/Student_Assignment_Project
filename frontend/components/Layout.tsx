import React from 'react';
import { Header, Footer } from './index';
export const LayOut = ({children}:any) => {
    return (
      <div>
        <Header/>
          {children}
        <Footer/>
      </div>
    );
}