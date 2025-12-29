"use client";

import useUserStore from "@/app/store/user";
import { Avatar as AvatarComponent, IconButton } from "@mui/material";

const Avatar = () => {
  const { user } = useUserStore();

  return (
    <div>
      <IconButton
        // onClick={handleClick}
        size="small"
        // aria-controls={open ? "account-menu" : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? "true" : undefined}
      >
        <AvatarComponent src={user.avatar} />
      </IconButton>
    </div>
  );
};

export default Avatar;
