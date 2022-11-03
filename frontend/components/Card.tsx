import React from 'react';
import { useSelectedContext } from '../context/index';
export const Card = (props: CardDataType) => {
    const {children} = props;
    const { selectedAd } = useSelectedContext();
    return (
        <div className={selectedAd?.index===props.index?"animate-border w-full max-w-sm border-blue-500  border-2 p-6 max-w-md bg-white rounded ":"p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-2xl"}>
            {children}    
        </div>
    )
} 
type CardDataType = {
    children?: JSX.Element | JSX.Element[],
    index?:number
}