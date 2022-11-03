export const Avatar = (props: {
    image:any
}) => {
    console.log(props.image)
    return (
        <div  style={{ width: `50px`,height:'50px',borderRadius:`100%`}}>
            <img style={{ width: `100%`,height:`100%`,borderRadius:`100%`}}  src={props.image} />
        </div>
    )
}