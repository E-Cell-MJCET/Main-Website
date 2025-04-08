"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import { Switch } from "@headlessui/react";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Component types available
const COMPONENT_TYPES = [
  { id: "payment", name: "Payment" },
  { id: "subscription", name: "Subscription" },
  { id: "donation", name: "Donation" },
  { id: "contact", name: "Contact Form" },
];

// Default form for payment type
const DEFAULT_PAYMENT_FORM = {
  title: "",
  description: "",
  paymentLink: "",
  suggestedAmounts: ["5", "10", "20"],
  currency: "USD",
  customMessage: "Thank you for your support!",
};

interface AdditionalComponentData {
  id?: string;
  clerk_user_id: string;
  component_info: {
    component_name: string;
    component_type: string;
    is_enabled: boolean;
    settings: any;
  };
  created_at?: string;
  updated_at: string;
}

function Additional() {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [componentName, setComponentName] = useState("Buy Me a Coffee");
  const [componentType, setComponentType] = useState("payment");
  const [formData, setFormData] = useState(DEFAULT_PAYMENT_FORM);
  const [existingData, setExistingData] = useState<AdditionalComponentData | null>(null);

  // Load existing data if available
  useEffect(() => {
    const fetchExistingData = async () => {
      if (!isClerkLoaded || !user) {
        setIsLoading(false);
        
return;
      }

      try {
        const { data, error } = await supabase
          .from("Additional")
          .select("*")
          .eq("clerk_user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching additional component data:", error);
          toast.error("Error loading your additional component data");
        } else if (data) {
          // Found existing data
          setExistingData(data);
          
          // Extract component info from the JSON structure
          if (data.component_info) {
            setIsEnabled(data.component_info.is_enabled);
            setComponentName(data.component_info.component_name);
            setComponentType(data.component_info.component_type);
            setFormData(data.component_info.settings || DEFAULT_PAYMENT_FORM);
          }
        }
      } catch (error) {
        console.error("Error in fetchExistingData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingData();
  }, [isClerkLoaded, user]);

  // Handle toggle change
  const handleToggleChange = (checked: boolean) => {
    setIsEnabled(checked);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle suggested amount changes
  const handleAmountChange = (index: number, value: string) => {
    const newAmounts = [...formData.suggestedAmounts];
    newAmounts[index] = value;
    setFormData((prev) => ({
      ...prev,
      suggestedAmounts: newAmounts,
    }));
  };

  // Add new suggested amount
  const addSuggestedAmount = () => {
    if (formData.suggestedAmounts.length < 5) {
      setFormData((prev) => ({
        ...prev,
        suggestedAmounts: [...prev.suggestedAmounts, ""],
      }));
    } else {
      toast.warning("Maximum 5 suggested amounts allowed");
    }
  };

  // Remove suggested amount
  const removeSuggestedAmount = (index: number) => {
    if (formData.suggestedAmounts.length > 1) {
      const newAmounts = [...formData.suggestedAmounts];
      newAmounts.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        suggestedAmounts: newAmounts,
      }));
    } else {
      toast.warning("At least one suggested amount is required");
    }
  };

  // Save data to Supabase
  const saveData = async () => {
    if (!user) {
      toast.error("You must be logged in to save");
      
return;
    }

    if (!componentName.trim()) {
      toast.error("Component name is required");
      
return;
    }

    if (!formData.title.trim()) {
      toast.error("Title is required");
      
return;
    }

    if (!formData.paymentLink.trim()) {
      toast.error("Payment link is required");
      
return;
    }

    try {
      setIsSaving(true);

      // Create the component_info JSON structure
      const componentInfo = {
        component_name: componentName,
        component_type: componentType,
        is_enabled: isEnabled,
        settings: formData
      };

      const additionalData: AdditionalComponentData = {
        clerk_user_id: user.id,
        component_info: componentInfo,
        updated_at: new Date().toISOString(),
      };

      let result;

      if (existingData?.id) {
        // Update existing record
        const { data, error } = await supabase
          .from("Additional")
          .update(additionalData)
          .eq("id", existingData.id)
          .select();

        if (error) {
          throw error;
        }

        result = data;
        toast.success("Additional component updated successfully!");
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from("Additional")
          .insert([additionalData])
          .select();

        if (error) {
          throw error;
        }

        result = data;
        setExistingData(result[0]);
        toast.success("Additional component created successfully!");
      }

      console.log("Saved data:", result);
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error(`Error: ${error.message || "Failed to save data"}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Additional Components</h1>
          <div className="flex items-center">
            <span className="mr-3 text-sm font-medium text-gray-700">
              {isEnabled ? "Enabled" : "Disabled"}
            </span>
            <Switch
              checked={isEnabled}
              onChange={handleToggleChange}
              className={`${
                isEnabled ? "bg-teal-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  isEnabled ? "translate-x-6" : "translate-x-1"
                } inline-block size-4 rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-gray-600">
            Enable additional components on your profile to enhance your presence and provide more ways for visitors to interact with you.
          </p>
        </div>
        {isEnabled && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="componentName" className="mb-2 block text-sm font-medium text-gray-700">
                  Component Name
                </label>
                <input
                  type="text"
                  id="componentName"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="e.g., Buy Me a Coffee"
                />
              </div>
              <div>
                <label htmlFor="componentType" className="mb-2 block text-sm font-medium text-gray-700">
                  Component Type
                </label>
                <select
                  id="componentType"
                  value={componentType}
                  onChange={(e) => setComponentType(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  {COMPONENT_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Component Settings</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="e.g., Support My Work"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Describe what the support will be used for"
                  />
                </div>
                <div>
                  <label htmlFor="paymentLink" className="mb-2 block text-sm font-medium text-gray-700">
                    Payment Link
                  </label>
                  <input
                    type="text"
                    id="paymentLink"
                    name="paymentLink"
                    value={formData.paymentLink}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="e.g., https://buymeacoffee.com/yourusername"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Enter your Buy Me a Coffee, Ko-fi, or other payment service link
                  </p>
                </div>
                <div>
                  <label htmlFor="currency" className="mb-2 block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Suggested Amounts
                  </label>
                  <div className="space-y-2">
                    {formData.suggestedAmounts.map((amount, index) => (
                      <div key={index} className="flex items-center">
                        <div className="grow">
                          <div className="flex items-center">
                            <span className="mr-2 text-gray-500">
                              {formData.currency === "USD" && "$"}
                              {formData.currency === "EUR" && "€"}
                              {formData.currency === "GBP" && "£"}
                              {formData.currency === "INR" && "₹"}
                              {formData.currency === "JPY" && "¥"}
                            </span>
                            <input
                              type="text"
                              value={amount}
                              onChange={(e) => handleAmountChange(index, e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                              placeholder="Amount"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSuggestedAmount(index)}
                          className="ml-2 rounded-md p-2 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addSuggestedAmount}
                    className="mt-2 inline-flex items-center rounded-md border border-transparent bg-teal-100 px-3 py-2 text-sm font-medium leading-4 text-teal-700 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-2 size-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Amount
                  </button>
                </div>
                <div>
                  <label htmlFor="customMessage" className="mb-2 block text-sm font-medium text-gray-700">
                    Thank You Message
                  </label>
                  <textarea
                    id="customMessage"
                    name="customMessage"
                    value={formData.customMessage}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Message to show after someone supports you"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => {
                  setFormData(DEFAULT_PAYMENT_FORM);
                  setComponentName("Buy Me a Coffee");
                  setComponentType("payment");
                }}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={saveData}
                disabled={isSaving}
                className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {isSaving ? (
                  <>
                    <svg className="-ml-1 mr-2 size-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      {isEnabled && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Preview</h2>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">{formData.title || "Support My Work"}</h3>
              <p className="mt-2 text-gray-600">{formData.description || "If you enjoy my content, please consider supporting my work."}</p>
            </div>
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {formData.suggestedAmounts.map((amount, index) => (
                <button
                  key={index}
                  className="rounded-md border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-100"
                >
                  {formData.currency === "USD" && "$"}
                  {formData.currency === "EUR" && "€"}
                  {formData.currency === "GBP" && "£"}
                  {formData.currency === "INR" && "₹"}
                  {formData.currency === "JPY" && "¥"}
                  {amount}
                </button>
              ))}
            </div>
            <div className="text-center">
              <a
                href={formData.paymentLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 size-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
                Support Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Additional;