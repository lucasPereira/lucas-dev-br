
import React from 'react';

export const CannabisFlower: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "w-6 h-6", style }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`${className} flower-icon`} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path className="flower-path" d="M12,22C12,22 13,17 17,14C17,14 22,14 22,12C22,10 17,10 17,10C17,10 13,5 12,2C11,5 7,10 7,10C7,10 2,10 2,12C2,14 7,14 7,14C7,17 11,22 12,22M12,12C12,12 14,10 16,11C16,11 18,12 16,13C16,13 14,14 12,12M12,12C12,12 10,14 8,13C8,13 6,12 8,11C8,11 10,10 12,12M12,12C12,12 13,14 13,16C13,16 12,18 11,16C11,16 10,14 12,12M12,12C12,12 11,10 11,8C11,8 12,6 13,8C13,8 14,10 12,12Z" />
  </svg>
);

export const CannabisLeaf: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "w-6 h-6", style }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`${className} leaf-icon`} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path className="leaf-path" d="M12 2c-.2.5-.4 1.1-.6 1.8-.7 2.3-.9 4.2-.9 4.2s-1.9-4.2-3.4-6C5.9 1 6.3 5.4 6.3 7.8c-1.8-2.2-5.1-4.8-6-3.6-1.1 1.5 2 4.1 4.2 6.3-2.3 0-6.1.5-5.2 1.9 1.1 1.5 5 1 5 1s-2.1 2.3-4.2 4.6c-1.8 1.9 1.5 3 2.6 1.1 2.3-3.7 4.2-5.9 4.2-5.9s-.4 3.7-.8 6.7c-.5 3.4 1 5.4 2.3 4.2 1.5-1.1 1.1-3 1.1-3v.4s-.4 1.9 1.1 3c1.3 1.1 2.8-.8 2.3-4.2-.4-3-.8-6.7-.8-6.7s1.9 2.2 4.2 5.9c1.1 1.9 4.4.8 2.6-1.1-2.1-2.3-4.2-4.6-4.2-4.6s3.9.5 5 -1c.9-1.5-2.9-1.9-5.2-1.9 2.2-2.2 5.3-4.8 4.2-6.3-.9-1.2-4.2 1.4-6 3.6 0-2.3.4-6.8-1.1-5.8-1.5 1.9-3.4 6-3.4 6s-.2-1.9-.9-4.2c-.2-.7-.4-1.3-.6-1.8z" />
  </svg>
);
