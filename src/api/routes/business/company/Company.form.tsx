// import { useState, useEffect } from "preact/hooks";
// import { useForm } from "react-hook-form";
// import {
//   Label,
//   TextInput,
//   Button,
//   Textarea,
//   FileInput,
//   Tooltip,
//   Spinner,
//   HelperText,
// } from "flowbite-react";
// import QInput from "@/lib/ui/QInput.ui";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { fillFlashMessage } from "@/lib/ui/QFlashMessage.ui";
// import { closeDrawer } from "@/lib/ui/QDrawer.ui";
// import { useQuery } from "@tanstack/react-query";
// import { trpc } from "@/lib/trpc";

// import { countryList, industryList } from "@/lib/client.store";

// export function CompanyForm({ currentCompany = null }) {
//   const [logoFile, setLogoFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors, isValid, isDirty, dirtyFields },
//     watch,
//   } = useForm({
//     defaultValues: {
//       id: currentCompany?.id || "",
//       title: currentCompany?.title || "",
//       description: currentCompany?.description || "",
//       bin: currentCompany?.bin || "",
//       logo: null,
//       residence: currentCompany?.expand?.residence?.title || "",
//       industry: currentCompany?.expand?.industry?.title || "",
//       residenceId:
//         typeof currentCompany?.residence === "object"
//           ? currentCompany?.residence?.id
//           : currentCompany?.residence || "",
//       industryId:
//         typeof currentCompany?.industry === "object"
//           ? currentCompany?.industry?.id
//           : currentCompany?.industry || "",
//       phone: currentCompany?.phone || "",
//       website: currentCompany?.website || "",
//       addressLine: currentCompany?.address?.addressLine || "",
//       city: currentCompany?.address?.city || "",
//       country: currentCompany?.address?.country || "",
//       postcode: currentCompany?.address?.postcode || "",
//       state: currentCompany?.address?.state || "",
//     },
//     resolver: zodResolver(companySchema),
//   });

//   useEffect(() => {
//     console.log("Form Errors:", errors);
//     console.log("Form State:", { isValid, isDirty, dirtyFields });
//   }, [errors, isValid, isDirty, dirtyFields]);

//   const { data } = useQuery({
//     queryKey: ["countryList"],
//     queryFn: async () => {
//       const response = await trpc.business.country.$get();
//       countryList.value = await response.json();
//     },
//   });

//   const { data } = useQuery({
//     queryKey: ["industryList"],
//     queryFn: async () => {
//       const response = await trpc.business.industry.$get();
//       industryList.value = await response.json();
//     },
//   });

//   const handleFormSubmit = async (data) => {
//     try {
//       console.log("Form validation passed. Submitting data:", data);
//       const formData = new FormData();

//       // Basic fields
//       formData.append("title", data.title);
//       formData.append("description", data.description || "");
//       formData.append("bin", data.bin);
//       formData.append("residence", data.residenceId);
//       formData.append("industry", data.industryId);
//       formData.append("phone", data.phone || "");
//       formData.append("website", data.website || "");

//       // Address object
//       const address = {
//         addressLine: data.addressLine || "",
//         city: data.city || "",
//         country: data.country || "",
//         postcode: data.postcode || "",
//         state: data.state || "",
//       };
//       formData.append("address", JSON.stringify(address));

//       // Logo handling - simplified like avatar
//       if (logoFile) {
//         formData.append("logo", logoFile);
//       }

//       if (currentCompany) {
//         await pb
//           .collection("business_company")
//           .update(currentCompany.id, formData);
//         const expandedRecord = await pb
//           .collection("business_company")
//           .getOne(currentCompany.id, {
//             expand: "industry,residence",
//           });

//         fillFlashMessage("success", `${data.title} has been updated`);
//         window.dispatchEvent(
//           new CustomEvent("companyUpdated", { detail: expandedRecord })
//         );
//       } else {
//         const record = await pb.collection("business_company").create(formData);
//         const expandedRecord = await pb
//           .collection("business_company")
//           .getOne(record.id, {
//             expand: "industry,residence",
//           });

//         fillFlashMessage("success", `${data.title} has been created`);
//         window.dispatchEvent(
//           new CustomEvent("companyCreated", { detail: expandedRecord })
//         );
//       }
//       closeDrawer();
//     } catch (error) {
//       fillFlashMessage("fail", error.message);
//     }
//   };

//   const handleSearchSelect = (field, value, id) => {
//     setValue(field, value);
//     setValue(`${field}Id`, id);
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <form
//           onSubmit={handleSubmit(handleFormSubmit)}
//           className="flex flex-col space-y-2"
//         >
//           <input type="hidden" {...register("id")} />
//           <input type="hidden" {...register("residenceId")} />
//           <input type="hidden" {...register("industryId")} />

//           {/* Company Name */}
//           <div>
//             <Label htmlFor="title">Company name</Label>
//             <TextInput
//               id="title"
//               {...register("title")}
//               color={errors.title ? "failure" : "gray"}
//             />
//             <HelperText>{errors.title?.message}</HelperText>
//           </div>

//           {/* BIN */}
//           <div>
//             <Label htmlFor="bin">Business Identification Number</Label>
//             <TextInput
//               id="bin"
//               {...register("bin")}
//               color={errors.bin ? "failure" : "gray"}
//             />
//             <HelperText>{errors.bin?.message}</HelperText>
//           </div>

//           {/* Description */}
//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               rows={2}
//               {...register("description")}
//               color={errors.description ? "failure" : "gray"}
//             />
//             <HelperText>{errors.description?.message}</HelperText>
//           </div>

//           {/* Logo Upload - modified to match avatar pattern */}
//           <div className="relative group">
//             <Tooltip
//               content={
//                 <ul className="list-disc pl-4">
//                   <li>Max file size: 5MB</li>
//                   <li>Allowed file types: png, jpeg</li>
//                 </ul>
//               }
//             >
//               <Label htmlFor="logo">Company Logo</Label>
//             </Tooltip>

//             <div className="flex flex-col gap-2">
//               <FileInput
//                 className="w-full"
//                 id="logo"
//                 accept="image/png, image/jpeg"
//                 onChange={(e) => setLogoFile(e.target.files[0])}
//               />
//             </div>
//           </div>

//           {/* Industry */}
//           <QInput
//             label="Industry"
//             value={watch("industry")}
//             error={errors.industry?.message}
//             items={industryList.value}
//             searchField="title"
//             displayAsHelper="description"
//             onChange={(e) =>
//               handleSearchSelect(
//                 "industry",
//                 e.target.value,
//                 e.target.dataset.id
//               )
//             }
//           />

//           {/* Residence */}
//           <QInput
//             label="Residence"
//             id="residence"
//             name="residence"
//             value={watch("residence")}
//             error={errors.residence?.message}
//             items={countryList.value}
//             searchField="title"
//             onChange={(e) =>
//               handleSearchSelect(
//                 "residence",
//                 e.target.value,
//                 e.target.dataset.id
//               )
//             }
//           />

//           {/* Phone */}
//           <div>
//             <Label htmlFor="phone">Phone</Label>
//             <TextInput
//               id="phone"
//               {...register("phone")}
//               color={errors.phone ? "failure" : "gray"}
//             />
//             <HelperText>{errors.phone?.message}</HelperText>
//           </div>

//           {/* Website */}
//           <div>
//             <Label htmlFor="website">Website</Label>
//             <TextInput
//               id="website"
//               {...register("website")}
//               color={errors.website ? "failure" : "gray"}
//             />
//             <HelperText>{errors.website?.message}</HelperText>
//           </div>

//           {/* Address Section */}
//           <div className="flex flex-col space-y-2">
//             <div>
//               <Label htmlFor="addressLine">Address line</Label>
//               <TextInput
//                 id="addressLine"
//                 {...register("addressLine")}
//                 color={errors.addressLine ? "failure" : "gray"}
//               />
//               <HelperText>{errors.addressLine?.message}</HelperText>
//             </div>

//             <div className="flex flex-row space-x-2">
//               <div className="w-1/2">
//                 <Label htmlFor="state">State</Label>
//                 <TextInput
//                   id="state"
//                   {...register("state")}
//                   color={errors.state ? "failure" : "gray"}
//                 />
//                 <HelperText>{errors.state?.message}</HelperText>
//               </div>
//               <div className="w-1/2">
//                 <Label htmlFor="city">City</Label>
//                 <TextInput
//                   id="city"
//                   {...register("city")}
//                   color={errors.city ? "failure" : "gray"}
//                 />
//                 <HelperText>{errors.city?.message}</HelperText>
//               </div>
//             </div>

//             <div className="flex flex-row space-x-2">
//               <div className="w-1/2">
//                 <Label htmlFor="postcode">Postcode</Label>
//                 <TextInput
//                   id="postcode"
//                   {...register("postcode")}
//                   color={errors.postcode ? "failure" : "gray"}
//                 />
//                 <HelperText>{errors.postcode?.message}</HelperText>
//               </div>
//               <div className="w-1/2">
//                 <Label htmlFor="country">Country</Label>
//                 <TextInput
//                   id="country"
//                   {...register("country")}
//                   color={errors.country ? "failure" : "gray"}
//                 />
//                 <HelperText>{errors.country?.message}</HelperText>
//               </div>
//             </div>
//           </div>

//           <Button type="submit">{currentCompany ? "Update" : "Create"}</Button>
//         </form>
//       )}
//     </>
//   );
// }
