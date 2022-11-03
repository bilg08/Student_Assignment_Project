import { Card } from "../Card";

export interface PostReceivedProps {
  name: any;
  owner: any;
  description: any;
}

export const PostReceived: React.FC<PostReceivedProps> = ({
  name,
  owner,
  description,
}) => {
  return (

      <div className="flex flex-row flex-wrap justify-center w-screen md:w-screen lg:w-11/12 ">
        <div>
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-m mb-2">
            <span className="font-bold text-base">Зар тавьсан:</span>
            {owner}
          </div>
          <p className="text-gray-700  text-base">
            <span className="font-bold text-gray-600 text-base">
              Бие даалт:
            </span>
            {description}
          </p>
        </div>
      </div>

      

  );
};


{/* <img
				                    className='w-full'
				                    src='/img/card-top.jpg'
				                    alt='Sunset in the mountains'
			                    /> */}