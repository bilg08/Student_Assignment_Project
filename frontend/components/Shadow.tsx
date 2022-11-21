import { Props } from "../types"

export const Shadow = ({ children }: Props) => {
    return (
    <div className="absolute w-[100%] h-[100%] z-20 bg-grey/3 backdrop-blur-xl flex justify-center overflow-none">
            {children}
    </div>
    )
}