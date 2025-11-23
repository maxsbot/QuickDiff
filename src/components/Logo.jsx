import React from 'react'

export default function Logo({ className = "w-8 h-8" }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3bf664ff" />
                    <stop offset="100%" stopColor="#5c66f6ff" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Left Document (Original) */}
            <path
                d="M20 15 C20 10 25 10 25 10 L 45 10 L 45 80 L 25 80 C 20 80 20 75 20 75 Z"
                fill="#EFF6FF"
                stroke="#3B82F6"
                strokeWidth="4"
                className="drop-shadow-sm"
            />
            <path d="M28 25 L 37 25" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
            <path d="M28 35 L 37 35" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
            <path d="M28 45 L 37 45" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />

            {/* Right Document (Modified) - Offset and overlapping */}
            <path
                d="M55 20 C55 15 60 15 60 15 L 80 15 L 80 85 L 60 85 C 55 85 55 80 55 80 Z"
                fill="url(#logoGradient)"
                className="drop-shadow-md"
            />
            <path d="M63 30 L 72 30" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
            <path d="M63 40 L 72 40" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
            <path d="M63 50 L 72 50" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />

            {/* Connection/Diff Indicator */}
            <path
                d="M45 45 C 50 45 50 50 55 50"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="4 4"
            />

            {/* Sparkle/Accent */}
            <circle cx="85" cy="15" r="4" fill="#10B981" className="animate-pulse" />
        </svg>
    )
}
