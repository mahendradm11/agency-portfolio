'use client';

export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Precision grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="agency-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#ffffff" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#agency-grid)" />
      </svg>

      {/* Ambient gradient orbs */}
      <div
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none animate-pulse-slow-1"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none animate-pulse-slow-2"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
