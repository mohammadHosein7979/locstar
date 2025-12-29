import { getUserProfile } from "@/app/repository/userService";
import useUserStore from "@/app/store/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const UserInitializer = () => {
  const { status } = useSession();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (!user.id && status == "authenticated") {
      getUserProfile()
        .then((res) => setUser(res.data))
        .catch(console.error);
    }
  }, [status, user.id]);

  return null;
};

export default UserInitializer;
