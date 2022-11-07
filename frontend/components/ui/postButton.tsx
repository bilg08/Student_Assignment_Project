export interface PostButtonProps {
  prop?: string;
  data?: string;
}

export const PostButton: React.FC<PostButtonProps> = ({ prop, data }) => {
  console.log(prop);

  return (
    <div className="pt-4 ">
      <button
        className={`inline-block bg-${prop} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
      >
        {data}
      </button>
    </div>
  );
};
//green-300
//red-300
