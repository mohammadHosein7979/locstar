import { UpdateProfile } from "../modules/profile/_types/dto";
import { Response } from "../types/dto";
import { User } from "../types/model";
import apiClient from "./api-client";

export const getUserProfile = () => {
  return apiClient.get<Response<User>>("/profile/show").then((res) => res.data);
};

export const sendOtpService = (mobile: string) => {
  return apiClient.post("/send-otp", { mobile }).then((res) => res.data);
};

export const updateUserService = (data: UpdateProfile | FormData) => {
  return apiClient.post("/profile/update", data).then((res) => res.data);
};
