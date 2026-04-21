import React from 'react';
import { HardHat } from 'lucide-react';

const ComingSoon = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 h-full text-center">
      <div className="flex items-center justify-center bg-white rounded-full p-6 shadow-sm mb-6" style={{ width: '120px', height: '120px' }}>
        <HardHat size={64} style={{ color: 'var(--primary-color)' }} />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-primary">{title || 'Chức năng đang phát triển'}</h2>
      <p className="text-secondary max-w-md">
        Tính năng này hiện đang trong quá trình xây dựng và hoàn thiện. Vui lòng quay lại sau!
      </p>
    </div>
  );
};

export default ComingSoon;
