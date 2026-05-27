export default function EcoSwapLogoAnimation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2d16] to-[#1f5b2f] flex items-center justify-center overflow-hidden relative">
      {/* Floating leaves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-green-300/40 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${0.5 + Math.random()})`,
            }}
          />
        ))}
      </div>

      {/* Logo Card */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-green-400/20 blur-3xl rounded-full scale-125 animate-pulse"></div>

        {/* 3D Rotating Container */}
        <div className="relative animate-[spinY_10s_linear_infinite]">
          <div className="bg-[#f5eedc] p-10 rounded-[40px] shadow-2xl border border-green-200 backdrop-blur-md transform transition duration-500 hover:scale-105">
            {/* Panda Logo */}
            <div className="relative flex flex-col items-center">
              <img
                src="/mnt/data/a93f1cf8-1486-4b2f-beb3-89de69dbeb43.png"
                alt="EcoSwap Panda Logo"
                className="w-[420px] drop-shadow-2xl animate-float"
              />

              {/* Animated Text */}
              <h1 className="mt-6 text-6xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-lime-500 animate-pulse">
                ECOSWAP
              </h1>

              <p className="text-green-900/70 text-lg mt-2 tracking-[0.3em] uppercase">
                Sustainable Future
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }

        @keyframes spinY {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(10deg); }
          100% { transform: rotateY(0deg); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
