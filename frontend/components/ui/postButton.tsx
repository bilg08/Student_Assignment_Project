export interface PostButtonProps {
  prop?: any;
  data?: any;

}

export const PostButton: React.FC<PostButtonProps> = ({
  prop,
  data,

}) => {
  return (
    <div className="pt-4 ">
      <button className="inline-block bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        Chat
      </button>
      <button className="inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        Submit
      </button>
      <button className="inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        Cancel
      </button>
    </div>
  );
};
