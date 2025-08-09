import { TEvaluation, TPlatform } from "@/types/globalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TPaymentBasicInformation = {
  firstName: string;
  lastName: string;
  companyName?: string;
  vatNumber?: string;
  email: string;
  country: string;
  city: string;
  postalCode: string;
  addons: string;
};
export type TChallengeConfigState = {
  fundedAmount: number;
  fundedAmountStr: string;
  platform: TPlatform;
  evaluation: TEvaluation;
  firstPrice: number;
  price: number;
  discount: number;
  accountType: string;
  payoutCycle: string;
  addons: string;
  email: string;
  basicInformation: TPaymentBasicInformation;
  termsAndCondition: boolean;
  privacyPolicy: boolean;
  paymentMethod: "card" | "crypto";
};

const initialState: TChallengeConfigState = {
  fundedAmount: 8000,
  fundedAmountStr: "8k",
  evaluation: "step_1", // যদি enum বা specific string type হয়, তাহলে default মান দিন।
  platform: "meta_trader_5",
  firstPrice: 65,
  price: 65,
  discount: 0,
  accountType: "swap",
  payoutCycle: "default",
  addons: "100%feeRefund",
  email: "", // এটি আলাদাভাবে রেখেছেন, basicInformation-এর বাইরেও। নিশ্চিত করুন এটি প্রয়োজনীয় কিনা।
  basicInformation: {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    postalCode: "0",
    addons: "",
  },
  termsAndCondition: false,
  privacyPolicy: false,
  paymentMethod: "crypto", // বা "crypto"
};

const challengeConfigSlice = createSlice({
  name: "challengeConfig",
  initialState,
  reducers: {
    setEvaluation: (state, action: PayloadAction<TEvaluation>) => {
      state.evaluation = action.payload;
    },
    setPrice: (
      state,
      action: PayloadAction<{
        price: number;
        value: number;
        fundedAmountStr: string;
      }>
    ) => {
      state.firstPrice = action.payload.price;
      state.price = action.payload.price;
      state.fundedAmountStr = action.payload.fundedAmountStr;
      state.fundedAmount = action.payload.value;
    },
    setPlatform: (state, action: PayloadAction<TPlatform>) => {
      state.platform = action.payload;
    },
    setDiscount: (
      state,
      action: PayloadAction<{ price: number; discount: number }>
    ) => {
      state.price = action.payload.price;
      state.discount = action.payload.discount;
    },
    resetPrice: (state) => {
      state.price = 0;
      state.discount = 0;
      state.firstPrice = 0;
      state.fundedAmount = 5000;
      state.evaluation = "step_1";
      state.platform = "meta_trader_4";
    },
    setAccountType: (state, action: PayloadAction<string>) => {
      state.accountType = action.payload;
    },
    setPayoutCycle: (state, action: PayloadAction<string>) => {
      state.payoutCycle = action.payload;
    },
    setAddons: (state, action: PayloadAction<string>) => {
      state.addons = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPrivacyPolicy: (state) => {
      state.privacyPolicy = !state.privacyPolicy;
    },
    setTermsAndCondition: (state) => {
      state.termsAndCondition = !state.termsAndCondition;
    },
    setBasicInformation: (
      state,
      action: PayloadAction<TPaymentBasicInformation>
    ) => {
      state.basicInformation = action.payload;
    },
  },
});
export const {
  setPrice,
  setPlatform,
  setEvaluation,
  setDiscount,
  resetPrice,
  setAccountType,
  setPayoutCycle,
  setAddons,
  setEmail,
  setBasicInformation,
  setPrivacyPolicy,
  setTermsAndCondition,
} = challengeConfigSlice.actions;
export default challengeConfigSlice.reducer;
