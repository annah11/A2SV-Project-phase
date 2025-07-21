import React from 'react';

export default function Button({
  background,
  border,
  text,
  value,
}: {
  background: string;
  border: string;
  text: string;
  value: string;
}) {
  return (
    <button className={`${background} ${border} ${text} px-4 py-2 rounded`}>
      {value}
    </button>
  );
}