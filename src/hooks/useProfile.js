import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfile, clearProfile } from "../redux/slices/profileSlice";
import profileService from "../services/api/profile";

export const useProfile = (shouldFetch = true) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchProfileData = async () => {
      try {
        const res = await profileService.getProfile();
        if (res?.data?.data) {
          dispatch(setProfile(res.data.data));
        } else {
          dispatch(clearProfile());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(clearProfile());
      }
    };

    fetchProfileData();
  }, [shouldFetch, dispatch]);
};
