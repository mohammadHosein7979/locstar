import { BlogList } from "@/app/types/model";
import Link from "next/link";
import { FC } from "react";

interface PostCardProps {
  post: BlogList;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post.id}`} className="flex items-center gap-3 mb-2">
      <div className="w-1/4">
        <img
          src={post.cover_image}
          alt=""
          className="aspect-square w-full rounded-lg"
        />
      </div>
      <div className="w-3/4">
        <p className=" line-clamp-3 text-xs text-gray-400">{post.description}</p>
      </div>
    </Link>
  );
};

export default PostCard;
