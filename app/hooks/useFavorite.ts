import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast, Toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModel";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModel = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModel.onOpen();
      }
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => {
            axios.post(`/api/favorites/${listingId}`);
          };
        }
        await request();

        toast.success("Success");
        router.refresh();
      } catch (error: any) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, listingId, hasFavorited, loginModel, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
