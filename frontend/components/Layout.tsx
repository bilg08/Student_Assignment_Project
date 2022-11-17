import React, {  ReactNode } from 'react';
import { Props } from '../types';
import { Header, Footer } from './index';
import { Spinner } from './Spinner';
export const LayOut = (props:{children:ReactNode}) => {
    return (
      <div className='h-[100vh] w-full relative '>
        <Header/>
          {props.children}
          <Spinner/>
        <Footer/>
      </div>
    );
}