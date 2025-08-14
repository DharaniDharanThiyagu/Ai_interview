import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Changed to FaTrashAlt from react-icons/fa (LaTrash2 doesn't exist)
import { genereInitials } from '../../utils/heleper';

const SummaryCard = ({
  role,
  topicsToFocus,
  colors,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      {/* Top section with icon and title */}
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{ background: colors?.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">
              {genereInitials(role)}
            </span>
          </div>

          <div className="flex-grow">
            <h2 className="text-[17px] font-medium">{role}</h2>
            <p className="text-xs text-medium text-gray-900">{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete button */}
        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-white font-medium bg-rose-500 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FaTrashAlt className="text-sm" />
          Delete
        </button>
      </div>

      {/* Bottom section with info */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Experience: {experience} {experience === 1 ? 'year' : 'years'}
          </div>
          <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Questions: {questions}
          </div>
          <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Last Updated: {lastUpdated}
          </div>
        </div>

        <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
