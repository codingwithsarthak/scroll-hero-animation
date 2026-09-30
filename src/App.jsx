import { useLayoutEffect, useRef } from 'react'
import { gsap } from './gsap.js'

const statistics = [
  { value: '95%', description: 'Driver-led engineering' },
  { value: '80%', description: 'Balanced performance' },
  { value: '70%', description: 'Precision-finished detail' },
]

function App() {
  const heroRef = useRef(null)
  const carImageRef = useRef(null)
  const headingRef = useRef(null)
  const statisticsRef = useRef(null)
  const imageFrameRef = useRef(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const carImage = carImageRef.current
    const heading = headingRef.current
    const statItems = statisticsRef.current?.children
    const imageFrame = imageFrameRef.current
    if (!hero || !carImage || !heading || !statItems || !imageFrame) return

    const introContext = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } })

      intro
        .fromTo(
          heading,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
        )
        .fromTo(
          statItems,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.14 },
          '-=0.28',
        )
        .fromTo(
          imageFrame,
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 0.95 },
          '-=0.35',
        )
    }, hero)

    const media = gsap.matchMedia()
    const animateCar = (x, y, scale, rotation) => {
      gsap.fromTo(
        carImage,
        { x: 0, y: 0, scale: 1, rotation: 0, transformOrigin: 'center center' },
        {
          x,
          y,
          scale,
          rotation,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=100%',
            pin: hero,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
    }

    media.add('(max-width: 639px)', () => animateCar(14, -20, 1.04, 0.7))
    media.add('(min-width: 640px)', () => animateCar(40, -38, 1.06, 1))

    return () => {
      introContext.revert()
      media.revert()
    }
  }, [])

  return (
    <main
      ref={heroRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-x-clip bg-[#0b0e0c] px-5 pb-5 pt-6 font-sans text-[#f2f1e9] sm:px-8 sm:pb-7 sm:pt-8 lg:px-14 lg:pb-9 lg:pt-9"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 48% 42% at 50% 56%, rgba(190, 197, 167, 0.14), transparent 74%), linear-gradient(125deg, #0b0e0d 0%, #151916 52%, #090b0a 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 -z-10 border border-white/[0.07] sm:inset-5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(233, 235, 221, 0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(233, 235, 221, 0.7) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />

      <header className="relative z-10 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.25em] text-[#a4a79a] sm:text-[10px]">
        <p className="flex items-center gap-2.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-[#d1d4b8]" />
          ITZFIZZ / MOTORSPORT
        </p>
        <p className="hidden sm:block">A study in motion <span className="px-1.5 text-[#62685b]">/</span> 01</p>
      </header>

      <section className="relative z-10 mx-auto mt-8 w-full text-center sm:mt-10 lg:mt-[4vh]">
        <p className="mb-3 text-[8px] uppercase tracking-[0.38em] text-[#aeb29e] sm:text-[9px]">
          Performance, considered
        </p>
        <h1
          ref={headingRef}
          aria-label="W E L C O M E  I T Z F I Z Z"
          className="font-display text-[clamp(1.55rem,4.55vw,3.8rem)] font-light leading-[0.92] tracking-[0.13em] text-[#f0efe8]"
        >
          <span className="block">W E L C O M E</span>
          <span className="mt-2 block text-[#c9cbb8]">I T Z F I Z Z</span>
        </h1>
      </section>

      <figure ref={imageFrameRef} className="relative z-10 mx-auto flex min-h-[17rem] w-full max-w-[1120px] flex-1 items-center justify-center sm:min-h-[21rem]">
        <div
          aria-hidden="true"
          className="absolute bottom-[10%] left-[17%] right-[17%] h-[13%] rounded-full bg-[#c6cbb0]/20 blur-[55px]"
        />
        <img
          ref={carImageRef}
          src={`${import.meta.env.BASE_URL}car-hero.jpg`}
          alt="A performance sports car on an open road"
          className="relative h-[clamp(17rem,47vh,35rem)] w-full object-cover object-[center_57%] opacity-[0.92] [mask-image:linear-gradient(to_bottom,black_79%,transparent_100%)]"
        />
      </figure>

      <footer className="relative z-10 mt-auto grid grid-cols-1 gap-y-5 border-t border-white/10 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-x-8 sm:pt-6">
        <dl ref={statisticsRef} className="grid grid-cols-3 divide-x divide-white/10">
          {statistics.map((statistic) => (
            <div key={statistic.value} className="px-3 first:pl-0 last:pr-0 sm:px-5">
              <dt className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-none text-[#e3e2d9]">
                {statistic.value}
              </dt>
              <dd className="mt-2 max-w-28 text-[8px] leading-[1.45] tracking-[0.12em] text-[#a7aa9f] sm:text-[9px] md:text-[10px]">
                {statistic.description}
              </dd>
            </div>
          ))}
        </dl>

        <p className="flex items-center justify-center gap-3 text-[8px] font-medium tracking-[0.24em] text-[#dedfd4] sm:justify-end sm:pb-1 sm:text-[9px]">
          <span aria-hidden="true" className="h-7 w-px bg-[#c6cbb0]/60" />
          SCROLL TO EXPLORE
        </p>
      </footer>
    </main>
  )
}

export default App