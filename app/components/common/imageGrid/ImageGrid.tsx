"use client";

import { Fancybox } from "@fancyapps/ui";
import classNames from "classnames";
import { FC, useEffect } from "react";
import { Media } from "@/app/types/model";

import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface Props {
  media: Media[];
}

const MediaItem: FC<{ item: Media }> = ({ item }) => {
  if (item.type === "video") {
    return (
      <a
        href={item.file}
        data-fancybox="gallery"
        className="block overflow-hidden rounded-xl"
      >
        <video
          className="w-full aspect-5/4 rounded-xl overflow-hidden bg-black"
          controls
        >
          <source src={item.file} type="video/mp4" />
        </video>
      </a>
    );
  }

  // image
  return (
    <a
      href={item.file}
      data-fancybox="gallery"
      className="block overflow-hidden rounded-xl"
    >
      <img
        src={item.file}
        alt=""
        className="object-cover w-full aspect-5/4"
      />
    </a>
  );
};

const ImageGrid: FC<Props> = ({ media }) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => {
      Fancybox.destroy();
    };
  }, []);

  if (!media || media.length === 0) return null;

  return (
    <div>
      <div className="flex mt-2">
        <div
          className={classNames({
            "w-2/3": media.length > 1,
            "w-full": media.length === 1,
          })}
        >
          {media[0] && (
            <div className="w-full p-1">
              <MediaItem item={media[0]} />
            </div>
          )}

          <div className="flex">
            {media[3] && (
              <div className="w-1/2 p-1">
                <MediaItem item={media[3]} />
              </div>
            )}
            {media[4] && (
              <div className="w-1/2 p-1">
                <MediaItem item={media[4]} />
              </div>
            )}
          </div>
        </div>

        <div
          className={classNames({
            "w-1/3": media.length > 1,
          })}
        >
          {media[1] && (
            <div className="w-full p-1">
              <MediaItem item={media[1]} />
            </div>
          )}
          {media[2] && (
            <div className="w-full p-1">
              <MediaItem item={media[2]} />
            </div>
          )}
          {media[5] && (
            <div className="w-full p-1">
              <MediaItem item={media[5]} />
            </div>
          )}
        </div>
      </div>

      {media.length > 6 && (
        <div className="w-full p-1 text-center">
          <a
            href={media[6]?.file}
            data-fancybox="gallery"
            className="text-blue-500 underline"
          >
            مشاهده همه ({media.length})
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
