import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion'
import { loadFont } from '@remotion/google-fonts/Caveat'
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces'
import { loadFont as loadDMMono } from '@remotion/google-fonts/DMMono'

const caveatFont   = loadFont()
const frauncesFont = loadFraunces({ weights: ['400', '700', '900'], subsets: ['latin'], styles: ['normal', 'italic'] })
const dmMonoFont   = loadDMMono()

const caveat   = caveatFont.fontFamily
const fraunces = frauncesFont.fontFamily
const dmMono   = dmMonoFont.fontFamily

const INK     = '#1A1612'
const CREAM   = '#FAF3E3'
const MUSTARD = '#F5C13D'
const CORAL   = '#FF6B47'
const BONE    = '#ECE0BE'

const ease = Easing.bezier(0.16, 1, 0.3, 1)

const fadeIn = (frame, start, duration = 8) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
  })

const drawLine = (frame, start, duration = 14, length = 200) =>
  interpolate(frame, [start, start + duration], [length, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
  })

// ── NotebookGrid ──────────────────────────────────────────────────────────────

const NotebookGrid = () => {
  const lines = []
  const spacing = 54
  for (let y = 54; y < 1080; y += spacing) {
    lines.push(<line key={`h${y}`} x1={0} y1={y} x2={1080} y2={y} stroke={BONE} strokeWidth={1} opacity={0.7} />)
  }
  for (let x = 54; x < 1080; x += spacing) {
    lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={1080} stroke={BONE} strokeWidth={1} opacity={0.4} />)
  }
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0 }} width={1080} height={1080}>
      {lines}
    </svg>
  )
}

// ── ChaosContent ──────────────────────────────────────────────────────────────

const ChaosContent = ({ frame }) => {
  const hw = (size, color = INK, rotation = 0, weight = 400, italic = false) => ({
    fontFamily: caveat,
    fontSize: size,
    color,
    position: 'absolute',
    transform: `rotate(${rotation}deg)`,
    lineHeight: 1.2,
    fontWeight: weight,
    fontStyle: italic ? 'italic' : 'normal',
    whiteSpace: 'nowrap',
  })

  return (
    <>
      {/* ── LEFT COLUMN — grocery list ── */}
      <div style={{ ...hw(28, INK, -1), top: 120, left: 80, opacity: fadeIn(frame, 30) }}>eggs</div>
      <div style={{ ...hw(26, INK,  1), top: 160, left: 80, opacity: fadeIn(frame, 36) }}>milk (2%?)</div>
      <div style={{ ...hw(24, INK, -2), top: 196, left: 80, opacity: fadeIn(frame, 42) }}>→ or whole?</div>
      <div style={{ ...hw(26, INK,  0), top: 238, left: 80, opacity: fadeIn(frame, 48) }}>bread</div>
      <div style={{ ...hw(26, INK,  1), top: 278, left: 80, opacity: fadeIn(frame, 54) }}>onions</div>
      <div style={{ ...hw(22, INK, -1), top: 318, left: 80, opacity: fadeIn(frame, 58) }}>butter — unsalted</div>
      <div style={{ ...hw(22, INK,  2), top: 352, left: 80, opacity: fadeIn(frame, 62) }}>coffee (beans not pods)</div>
      <div style={{ ...hw(24, INK, -1), top: 390, left: 80, opacity: fadeIn(frame, 66) }}>lemons x4</div>

      {/* Crossed-out line over "butter" */}
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width={1080} height={1080}>
        <line
          x1={80} y1={334} x2={340} y2={330}
          stroke={CORAL} strokeWidth={2} strokeLinecap="round"
          strokeDasharray={262} strokeDashoffset={drawLine(frame, 64, 8, 262)}
          opacity={fadeIn(frame, 64, 4)}
        />
      </svg>

      {/* ── PHILOSOPHY DIVERGENCE ── */}
      <div style={{ ...hw(32, INK, -3), top: 480, left: 200, opacity: fadeIn(frame, 52) }}>
        does fat = clarity?
      </div>

      {/* Connecting curved line downward */}
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width={1080} height={1080}>
        <path
          d="M300,520 Q295,545 290,570"
          stroke={INK} strokeWidth={1.5} fill="none" strokeLinecap="round"
          strokeDasharray={60} strokeDashoffset={drawLine(frame, 58, 10, 60)}
          opacity={fadeIn(frame, 58, 4)}
        />
      </svg>

      <div style={{ ...hw(30, INK, 1), top: 576, left: 120, opacity: fadeIn(frame, 64) }}>
        the mind works better full
      </div>
      {/* Wavy mustard underline */}
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width={1080} height={1080}>
        <path
          d="M120,614 Q175,608 230,614 Q285,620 340,614 Q395,608 450,614 Q480,617 510,614"
          stroke={MUSTARD} strokeWidth={2} fill="none" strokeLinecap="round"
          strokeDasharray={400} strokeDashoffset={drawLine(frame, 68, 16, 400)}
          opacity={fadeIn(frame, 68, 6)}
        />
      </svg>

      <div style={{ ...hw(28, CORAL, 2, 400, true), top: 634, left: 160, opacity: fadeIn(frame, 70) }}>
        Descartes ate well.
      </div>
      <div style={{ ...hw(24, CORAL, -1, 400, true), top: 674, left: 190, opacity: fadeIn(frame, 76) }}>
        Newton too.
      </div>

      {/* ── ASSOCIATION CHAIN — right side ── */}
      <div style={{ ...hw(28, INK, -2), top: 120, left: 560, opacity: fadeIn(frame, 72) }}>onions → layers</div>
      <div style={{ ...hw(26, INK,  1), top: 162, left: 580, opacity: fadeIn(frame, 78) }}>layers → complexity</div>
      <div style={{ ...hw(26, INK, -1), top: 202, left: 560, opacity: fadeIn(frame, 84) }}>complexity → notebooks?</div>
      <div style={{ ...hw(26, INK,  2), top: 244, left: 580, opacity: fadeIn(frame, 88) }}>notebooks → ideas</div>
      <div style={{ ...hw(32, MUSTARD, -3), top: 288, left: 620, opacity: fadeIn(frame, 92) }}>ideas → ?</div>

      {/* Curved arrow onions → philosophy */}
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width={1080} height={1080}>
        <path
          d="M200,300 Q230,420 280,470"
          stroke={INK} strokeWidth={1.5} fill="none" strokeLinecap="round"
          strokeDasharray={220} strokeDashoffset={drawLine(frame, 68, 14, 220)}
          opacity={fadeIn(frame, 68, 6)}
        />
        <polygon points="275,463 285,476 290,463" fill={INK} opacity={fadeIn(frame, 82, 4)} />
      </svg>

      {/* ── MORE NOTES — filling gaps ── */}
      <div style={{ ...hw(26, INK, -2), top: 730, left: 300, opacity: fadeIn(frame, 82) }}>
        why do good ideas arrive
      </div>
      <div style={{ ...hw(30, INK, -2), top: 768, left: 320, opacity: fadeIn(frame, 86) }}>
        in the shower?
      </div>

      <div style={{ ...hw(24, INK,  1), top: 820, left: 80, opacity: fadeIn(frame, 90) }}>something about constraint</div>
      <div style={{ ...hw(26, INK, -1), top: 858, left: 80, opacity: fadeIn(frame, 94) }}>the small page forces</div>
      <div style={{ ...hw(38, INK, -2, 700), top: 896, left: 80, opacity: fadeIn(frame, 98) }}>precision</div>

      <div style={{ ...hw(22, INK,  3), top: 720, left: 600, opacity: fadeIn(frame, 92) }}>tuesday meeting — postpone?</div>
      <div style={{ ...hw(22, INK, -1), top: 756, left: 620, opacity: fadeIn(frame, 96) }}>call M re: the thing</div>
      <div style={{ ...hw(24, CORAL, 2), top: 794, left: 600, opacity: fadeIn(frame, 100) }}>★ do NOT forget</div>

      <div style={{ ...hw(22, INK, -2, 400, true), top: 440, left: 580, opacity: fadeIn(frame, 104) }}>
        a notebook is not a filing
      </div>
      <div style={{ ...hw(22, INK, -2, 400, true), top: 472, left: 600, opacity: fadeIn(frame, 108) }}>
        cabinet. it is a mind.
      </div>

      <div style={{ ...hw(20, INK, 1), top: 960, left: 80, opacity: fadeIn(frame, 96) }}>remember: buy olive oil</div>
      <div style={{ ...hw(18, INK, 0), top: 990, left: 100, opacity: fadeIn(frame, 100) * 0.5 }}>the good kind</div>

      <div style={{ ...hw(28, INK, -3), top: 870, left: 400, opacity: fadeIn(frame, 104) }}>pages don't judge</div>
      <div style={{ ...hw(24, INK,  2), top: 908, left: 420, opacity: fadeIn(frame, 108) }}>half-thoughts welcome</div>

      <div style={{ ...hw(26, INK, 0), top: 940, left: 80, opacity: fadeIn(frame, 110) }}>monday:</div>
      <div style={{ ...hw(24, INK, 1), top: 976, left: 100, opacity: fadeIn(frame, 112) }}>— write more</div>
      <div style={{ ...hw(24, INK, -1), top: 1008, left: 100, opacity: fadeIn(frame, 114) }}>— think less</div>
      <div style={{ ...hw(28, MUSTARD, -2, 700), top: 1040, left: 100, opacity: fadeIn(frame, 116) }}>— begin.</div>

      <div style={{ ...hw(30, INK, -2), top: 960, left: 400, opacity: fadeIn(frame, 112) }}>
        what if disorder IS the system?
      </div>
      <div style={{ ...hw(36, MUSTARD, 3, 700), top: 1002, left: 440, opacity: fadeIn(frame, 118) }}>→ yes.</div>

      {/* Scattered dots/dashes */}
      <div style={{ ...hw(20, INK, 0), top: 520, left: 480, opacity: fadeIn(frame, 106) * 0.3 }}>· · ·</div>
      <div style={{ ...hw(18, INK, -5), top: 840, left: 380, opacity: fadeIn(frame, 110) * 0.25 }}>— — —</div>

    </>
  )
}

// ── HeadlineSection ───────────────────────────────────────────────────────────

const HeadlineSection = ({ frame }) => {
  const lineReveal = (start) => interpolate(frame, [start, start + 14], [80, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
  })
  const lineOpacity = (start) => interpolate(frame, [start, start + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const punch = interpolate(frame, [205, 212], [1.05, 1.0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const wordmarkOpacity = interpolate(frame, [208, 218], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  const lineWrap = { overflow: 'hidden', height: 96, display: 'flex', alignItems: 'flex-end' }
  const textBase = { fontFamily: fraunces, fontSize: 82, lineHeight: 1, display: 'block' }

  return (
    <div style={{ position: 'absolute', left: 72, top: 340, right: 72 }}>

      <div style={lineWrap}>
        <span style={{
          ...textBase, fontWeight: 900, color: CREAM,
          transform: `translateY(${lineReveal(178)}px)`,
          opacity: lineOpacity(178),
        }}>Why Your Notebook</span>
      </div>

      <div style={{ ...lineWrap, marginTop: 4 }}>
        <span style={{
          ...textBase, fontWeight: 900, color: CREAM,
          transform: `translateY(${lineReveal(188)}px)`,
          opacity: lineOpacity(188),
        }}>Should Never Be</span>
      </div>

      <div style={{ ...lineWrap, marginTop: 4 }}>
        <span style={{
          ...textBase, fontWeight: 400, fontStyle: 'italic', color: MUSTARD,
          display: 'inline-block',
          transform: `translateY(${lineReveal(198)}px) scale(${punch})`,
          transformOrigin: 'left bottom',
          opacity: lineOpacity(198),
        }}>Organised.</span>
      </div>

      <div style={{ position: 'absolute', bottom: -240, right: 0, textAlign: 'right', opacity: wordmarkOpacity }}>
        <div style={{ fontFamily: dmMono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: CREAM, opacity: 0.6 }}>
          POCKET NOTES
        </div>
        <div style={{ fontFamily: dmMono, fontSize: 9, letterSpacing: '0.1em', color: CREAM, opacity: 0.35, marginTop: 4 }}>
          pocketnotes.in
        </div>
      </div>

    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export const NotebookAnimation = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const chaosOpacity = interpolate(frame, [150, 170], [1, 0.08], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  const overlayOpacity = interpolate(frame, [150, 175], [0, 0.88], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ background: INK }}>

      {/* Cream chaos page */}
      <div style={{ position: 'absolute', inset: 0, background: CREAM, opacity: chaosOpacity }}>
        <NotebookGrid />
        <ChaosContent frame={frame} />
      </div>

      {/* Ink overlay dims chaos for headline */}
      <div style={{
        position: 'absolute', inset: 0,
        background: INK,
        opacity: overlayOpacity,
        pointerEvents: 'none',
      }} />

      {/* Headline on top */}
      {frame >= 175 && <HeadlineSection frame={frame} />}

    </AbsoluteFill>
  )
}
