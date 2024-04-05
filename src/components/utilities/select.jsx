'use client'

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { CaretSortIcon } from "@radix-ui/react-icons";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '0.5rem',
    border: '1px solid #D1D5DB',
    fontSize: '15px',
    boxShadow: 'none',
    "&:hover": {
      borderColor: "#718096"
    },
    cursor: state.isDisabled ? 'not-allowed' : 'pointer', // Ubah kursor menjadi not-allowed jika Select dinonaktifkan
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#1F2937',
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '0.5rem',
    border: '1px solid #D1D5DB',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '15px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#E5E7EB' : 'white',
    color: state.isDisabled ? '#718096' : '#1F2937',
    "&:hover": {
      backgroundColor: state.isSelected ? '#E5E7EB' : (state.isDisabled ? '#CBD5E0' : '#E5E7EB'),
    },
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    opacity: state.isDisabled ? 0.5 : 1,
  })
};

export default function SelectSingle({ options, onChange, defaultValue }) {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const allOptionsDisabled = options.every(option => option.isdisabled);
    setIsDisabled(allOptionsDisabled);
  }, [options]);

  return (
    <>
      <Select 
        options={options}
        required
        onChange={onChange}
        defaultValue={defaultValue}
        styles={customStyles}
        isDisabled={isDisabled} // Atur Select menjadi dinonaktifkan berdasarkan state isDisabled
        components={{
          DropdownIndicator: () => <CaretSortIcon className="h-4 w-4 opacity-50 mr-3" />,
          IndicatorSeparator: () => null,
        }}
      />
    </>
  );
}
