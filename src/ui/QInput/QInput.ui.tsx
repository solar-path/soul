/**
 * QInput Component
 *
 * A customizable input component with autocomplete functionality for the Adam platform.
 * This component provides a text input with autocomplete suggestions based on a provided list of items.
 *
 * @module QInput
 */

import { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import { HelperText, Label, TextInput } from "flowbite-react";

/**
 * Item interface for autocomplete functionality
 */
interface Item {
  id: string | number;
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, unknown>;
}

/**
 * Props for the QInput component
 *
 * @typedef {Object} QInputProps
 */
type QInputProps = {
  /** Label text for the input field */
  label?: string;
  /** HTML id attribute for the input field */
  id?: string;
  /** HTML name attribute for the input field */
  name?: string;
  /** Current value of the input field */
  value?: string;
  /** Error message to display below the input */
  error?: string;
  /** Array of items for autocomplete functionality */
  items?: Item[];
  /** Field name or function to extract search text from items */
  searchField?: string | ((item: Item) => string);
  /** Field name or function to extract helper text from items */
  displayAsHelper?: string | ((item: Item) => string);
  /** Handler for input change events */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Handler for input blur events */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

/**
 * QInput component that provides a text input with autocomplete functionality
 * based on a provided list of items.
 *
 * Features:
 * - Autocomplete suggestions from a provided list of items
 * - Custom display of helper text for each suggestion
 * - Keyboard navigation support
 * - Accessibility compliant with ARIA attributes
 * - Error state handling
 *
 * @component
 * @param {QInputProps} props - Component props
 * @returns {JSX.Element} Rendered QInput component
 */
export const QInput = ({
  label = "",
  id = "",
  name = "",
  value = "",
  error = "",
  items = [],
  searchField = "title",
  displayAsHelper = "",
  onChange = () => {},

  onBlur = () => {},
}: QInputProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  /**
   * Extracts the search value from an item based on the searchField prop
   *
   * @param {Item} item - The item to extract the search value from
   * @returns {string} The extracted search value
   */
  const getSearchValue = (item: Item): string => {
    if (typeof searchField === "function") {
      return searchField(item);
    }

    if (searchField.includes(".")) {
      let result: unknown = item;
      const keys = searchField.split(".");

      for (const key of keys) {
        if (result && typeof result === "object") {
          result = (result as Record<string, unknown>)[key];
        } else {
          return "";
        }
      }

      return String(result || "");
    }

    return String(item[searchField] || "");
  };

  const filteredItems = Array.isArray(items)
    ? items.filter((item) => {
        const searchValue = getSearchValue(item);
        return searchValue?.toLowerCase().includes(inputValue.toLowerCase());
      })
    : [];

  /**
   * Handles the selection of an item from the dropdown
   *
   * @param {Item} item - The selected item
   */
  const handleSelect = (item: Item) => {
    const searchValue = getSearchValue(item);
    setInputValue(searchValue);

    // Create a synthetic event that matches React.ChangeEvent<HTMLInputElement>
    if (onChange) {
      // Create a custom input element to dispatch a proper event
      const input = document.createElement("input");
      input.name = name;
      input.value = searchValue;
      input.dataset.id = String(item.id);

      // Create and dispatch the event
      const event = new Event("change", { bubbles: true });

      input.dispatchEvent(event);

      // Pass the event to onChange
      onChange({
        target: input,
      } as unknown as ChangeEvent<HTMLInputElement>);
    }

    setShowDropdown(false);
  };

  /**
   * Handles input change events
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  /**
   * Handles input blur events
   *
   * @param {FocusEvent<HTMLInputElement>} e - The blur event
   */
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const match = filteredItems.find((item) => {
      const searchValue = getSearchValue(item);
      return searchValue.toLowerCase() === inputValue.toLowerCase();
    });

    if (match) {
      handleSelect(match);
    }

    setTimeout(
      () => {
        setShowDropdown(false);
        if (onBlur) onBlur(e);
      },

      200
    );
  };

  return (
    <div className="relative">
      <Label htmlFor={id} className="pb-2">
        {label}
      </Label>
      <TextInput
        id={id}
        name={name}
        value={inputValue}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setShowDropdown(true)}
        color={error ? "failure" : "gray"}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <HelperText id={`${id}-error`} color="failure">
          {error}
        </HelperText>
      )}

      {showDropdown && (
        <div
          className="absolute z-50 w-3/4 bg-white border rounded-lg shadow-lg mt-1"
          role="listbox"
          aria-labelledby={id}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const searchValue = getSearchValue(item);
              let helperValue = "";

              if (typeof displayAsHelper === "function") {
                helperValue = displayAsHelper(item);
              } else if (
                displayAsHelper &&
                typeof displayAsHelper === "string"
              ) {
                const value = item[displayAsHelper];
                helperValue = value !== undefined ? String(value) : "";
              }

              return (
                <div
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                  role="option"
                  aria-selected={inputValue === searchValue}
                >
                  <p className={displayAsHelper ? "font-bold" : ""}>
                    {searchValue}
                  </p>
                  {helperValue && (
                    <p className="text-sm text-gray-600">{helperValue}</p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-4 py-2 text-gray-500 cursor-default">
              No match found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QInput;
