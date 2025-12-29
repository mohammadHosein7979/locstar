import classNames from 'classnames';
import React, { FC } from 'react'


interface SectionHeaderProps {
    title: string;
    color?: "white" | "black"
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, color = "white" }) => {
  return (
    <div className='flex items-center mb-4'>
        <div className="bg-orange-1 h-[3px] rounded-full w-4 mx-2 text-left"></div>
        <div className={classNames({
          'font-bold': true,
          'text-white': color == "white",
          'text-gray-900': color == "black"
        })}>{title}</div>
    </div>
  )
}

export default SectionHeader