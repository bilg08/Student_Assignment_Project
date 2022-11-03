import { useSelectedContext } from "../context"
import { Props } from "../types"

export const Shadow = ({ children }: Props) => {
    return (
        <div style={{display:'flex',justifyContent:'center', background:'rgba(0,0,0,0.6)',position: 'absolute',top:0,left:0,width:`100vw`,height:`100%`}}>
            {children}
        </div>
    )
}