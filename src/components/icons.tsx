import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5.52c-4.27.28-8.55.28-12.82 0" />
      <path d="M12 18.48c-4.27-.28-8.55-.28-12.82 0" />
      <path d="M12 2v20" />
      <path d="M12 2a10 10 0 0 0-4.08 1.1" />
      <path d="M12 22a10 10 0 0 1-4.08-1.1" />
      <path d="M21 12a9 9 0 0 0-6-8.65" />
      <path d="M3 12a9 9 0 0 0 6 8.65" />
    </svg>
  );
}
