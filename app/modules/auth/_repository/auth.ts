import apiClient from "../../../repository/api-client";
import { LoginByOTP, LoginByPassword } from "../_types/dto";

const loginByPasswordUrl = "/login-by-password";
const loginByOTPUrl = "/login-by-otp";

export const loginByPassword = async (data: LoginByPassword) =>
  await apiClient.post(loginByPasswordUrl, data);

export const loginByOTP = async (data: LoginByOTP) =>
  await apiClient.post(loginByOTPUrl, data);
