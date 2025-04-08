import { User } from "@/api/utils/types";
import { create } from "zustand";
// import { Company, Country, Industry, User } from "@/lib/types";

interface ClientStore {
  currentUser: User | null;
  // companyList: Company[] | null;
  // industryList: Industry[] | null;
  // countryList: Country[] | null;
  setCurrentUser: (user: User | null) => void;
  clearCurrentUser: () => void;
  // setCompanyList: (companies: Company[] | null) => void;
  // setIndustryList: (industries: Industry[] | null) => void;
  // setCountryList: (countries: Country[] | null) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  currentUser: null,
  // companyList: null,
  // industryList: null,
  // countryList: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),
  // setCompanyList: (companies) => set({ companyList: companies }),
  // setIndustryList: (industries) => set({ industryList: industries }),
  // setCountryList: (countries) => set({ countryList: countries }),
}));

// Helper functions for external usage
export const setCurrentUser = (user: User | null) => {
  useClientStore.getState().setCurrentUser(user);
};

export const clearCurrentUser = () => {
  useClientStore.getState().setCurrentUser(null);
};

// export const setCompanyList = (companies: Company[] | null) => {
//   useClientStore.getState().setCompanyList(companies);
// };

// export const setIndustryList = (industries: Industry[] | null) => {
//   useClientStore.getState().setIndustryList(industries);
// };

// export const setCountryList = (countries: Country[] | null) => {
//   useClientStore.getState().setCountryList(countries);
// };
