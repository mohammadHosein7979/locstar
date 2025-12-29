"use client";

import { Blog } from "@/app/types/model";
import React, { FC } from "react";

interface BlogDetailSourceProps {
  post: Blog;
}

const BlogDetailSource: FC<BlogDetailSourceProps> = ({ post }) => {
  return (
    <div className="max-w-md mx-auto bg-white overflow-hidden">
      <div className="relative w-full aspect-[4/5] bg-black">
        {post.video ? (
          <video
            src={post.video}
            poster={post.cover_image}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={post.cover_image}
            alt={post.description.slice(0, 20)}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-700 font-iransans" dangerouslySetInnerHTML={{__html: post.description}}>
        </div>

        {post.keywords && <div className="mt-3 flex flex-wrap gap-2">
          {post.keywords.map((keyword, idx) => (
            <span
              key={idx}
              className="text-xs font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full"
            >
              #{keyword}
            </span>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default BlogDetailSource;
