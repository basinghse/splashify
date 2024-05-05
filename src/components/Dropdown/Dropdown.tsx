import React, {
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Select from "react-select";

interface DropdownProps {
  setInitialSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
}

const dropdownOptions = [
  { value: "trending&order_by=popular", label: "Trending" },
  { value: "new&sort=latest", label: "New" },
];

export const Dropdown: FC<DropdownProps> = ({
  setInitialSearchQuery,
  searchQuery,
}) => {
  useEffect(() => {
    if (searchQuery === "") {
      setInitialSearchQuery(dropdownOptions[0].value);
    }
  }, [searchQuery, setInitialSearchQuery]);

  const [selected, setSelected] = useState(dropdownOptions[0]);

  // This is the event handler that will be called when the user selects a new option.
  const handleChange = (option: any) => {
    setSelected(option);
    setInitialSearchQuery(option.value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <Select
          value={selected}
          onChange={handleChange}
          options={dropdownOptions}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </div>
  );
};
