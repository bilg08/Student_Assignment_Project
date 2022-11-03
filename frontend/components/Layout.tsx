import React from 'react';
import { Header, Footer } from './index';
export const LayOut = ({children}:any) => {
    return (
      <div className='h-[100vh] w-full'>
        <Header/>
          {children}
        <Footer/>
      </div>
    );
}