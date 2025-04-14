// import { Button, Dropdown, TextInput } from "flowbite-react";
// import { computed } from "@preact/signals";
// import { HiSearch } from "react-icons/hi";
// import { CompanyForm } from "./Company.form";
// import { fillDrawer } from "@lib/store/app.store";
// import {
//   companyList,
//   currentCompany,
//   setCurrentCompany,
// } from "./company.store";
// import { useEffect, useState } from "preact/hooks";
// import { userCompanies } from "@lib/store/businessStructure.store";

// export default function CompanyDropdownUI() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Set initial company if not set and companies exist
//   useEffect(() => {
//     if (userCompanies.value.length > 0 && !currentCompany.value) {
//       setCurrentCompany(userCompanies.value[0]);
//     }
//   }, [userCompanies.value]);

//   // Listen for company creation and updates
//   useEffect(() => {
//     const handleCompanyCreated = (event) => {
//       const newCompany = event.detail;
//       userCompanies.value = [...userCompanies.value, newCompany];
//       setCurrentCompany(newCompany);
//     };

//     const handleCompanyUpdated = (event) => {
//       const updatedCompany = event.detail;
//       userCompanies.value = userCompanies.value.map((company) =>
//         company.id === updatedCompany.id ? updatedCompany : company
//       );
//       if (currentCompany.value?.id === updatedCompany.id) {
//         setCurrentCompany(updatedCompany);
//       }
//     };

//     window.addEventListener("companyCreated", handleCompanyCreated);
//     window.addEventListener("companyUpdated", handleCompanyUpdated);

//     return () => {
//       window.removeEventListener("companyCreated", handleCompanyCreated);
//       window.removeEventListener("companyUpdated", handleCompanyUpdated);
//     };
//   }, []);

//   const filteredCompanies = computed(() =>
//     companyList.value.filter(
//       (company) =>
//         company.title !== currentCompany.value?.title &&
//         company.title.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   if (companyList.value.length === 0) {
//     return (
//       <Button onClick={() => fillDrawer(CompanyForm, "Create Company")}>
//         Create a new company
//       </Button>
//     );
//   }

//   return (
//     <Dropdown
//       label={currentCompany.value?.title || "Select Company"}
//       dismissOnClick={false}
//     >
//       <Dropdown.Item>
//         <TextInput
//           className="w-full"
//           type="text"
//           placeholder="Search..."
//           icon={HiSearch}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onClick={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//           }}
//         />
//       </Dropdown.Item>

//       {filteredCompanies.value.map((company) => (
//         <Dropdown.Item
//           key={company.id}
//           onClick={() => {
//             setCurrentCompany(company);
//           }}
//           className="w-full hover:bg-primary-700 hover:text-white"
//         >
//           <div className="justify-left flex flex-row items-center gap-2">
//             {company.title}
//           </div>
//         </Dropdown.Item>
//       ))}

//       <Dropdown.Divider />
//       <Dropdown.Item
//         onClick={() => fillDrawer(CompanyForm, "Create Company")}
//         className="flex items-center justify-start gap-2 hover:bg-primary-700 hover:text-white"
//       >
//         Create a new company
//       </Dropdown.Item>
//     </Dropdown>
//   );
// }
