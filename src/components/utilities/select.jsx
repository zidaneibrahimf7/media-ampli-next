'use client'

import React from 'react'
import Select from 'react-select'

import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '0.5rem',
      border: '1px solid #D1D5DB',
      fontSize: '15px',
      boxShadow: 'none',
      "&:hover": {
        borderColor: "#718096"
      }
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
      fontSize: '15px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#E5E7EB' : 'white',
      color: '#1F2937',
      "&:hover": {
        backgroundColor: '#E5E7EB',
      }
    })
  };


export default function SelectSingle({options, onChange, defaultValue }) {
    return (
    <>
        <Select 
         options={options}
          required
        //   placeholder={placeholders ? placeholders : false}
          onChange={onChange}
          defaultValue={defaultValue}
          styles={customStyles}
          components={{
            DropdownIndicator: () => <CaretSortIcon className="h-4 w-4 opacity-50 mr-3" />,
            IndicatorSeparator: () => null,
          }}
        />
    </>
    )
}