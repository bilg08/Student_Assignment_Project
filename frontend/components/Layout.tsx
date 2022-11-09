import React, {  ReactNode } from 'react';
import { Props } from '../types';
import { Header, Footer } from './index';
export const LayOut = (props:{children:ReactNode}) => {
    return (
      <div className='h-[100vh] w-full'>
        <Header/>
          {props.children}
        <Footer/>
      </div>
    );
}