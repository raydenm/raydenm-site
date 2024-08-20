export const GradientBg = () => (
  <div className="absolute top-0 z-0 size-full ">
    <div className="absolute bottom-auto left-auto right-0 top-0 size-[500px] translate-x-[-30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
  </div>
)

export const GradientBg2 = () => (
  <div className="absolute top-0 z-0 h-screen w-screen  bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
)

export const GradientBg3 = () => (
  <div className="absolute inset-0 z-0 h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
)

export const GradientBg4 = () => (
  <div className="absolute top-0 z-0 h-screen w-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(120,119,198,0.3)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
)

export const GradientBg5 = () => (
  <div
    style={{
      backgroundImage:
        'radial-gradient(at 34% 53%, rgb(191, 244, 255) 0px, transparent 50%), radial-gradient(at 6% 89%, rgb(248, 233, 233) 0px, transparent 50%), radial-gradient(at 75% 34%, rgb(210, 224, 253) 0px, transparent 50%)'
    }}
    className="absolute top-0 z-0 h-screen w-screen "
  />
)

export const GradientBg6 = () => (
  <div className="absolute inset-0 -z-10 size-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
)
