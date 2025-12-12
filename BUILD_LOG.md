# Build Log: The Human Test

**Date**: December 11, 2025
**Project**: The Human Test
**Live URL**: https://human-or-4gott0uf8-daxtynhs-projects.vercel.app
**GitHub**: https://github.com/daxtynh/daily-build-human-test

## What Was Built

An interactive web experience that celebrates human imperfection in a world obsessed with AI perfection. Instead of trying to catch bots, this flips the script: the MORE imperfect you are, the MORE human you prove yourself to be.

### Features

**6 Interactive Challenges:**
1. **Circle Drawing** - Draw a circle freehand. Wobbliness = humanity. Too perfect = suspicious.
2. **Typing Test** - Type a sentence. Typos are celebrated, not penalized.
3. **Rhythm Test** - Click 10 times with steady rhythm. Variance in timing proves you're human.
4. **Memory Test** - Remember a sequence of tiles. Forgetting is natural and human.
5. **Reaction Test** - React when the screen turns green. Normal human speed is fine.
6. **Straight Line Test** - Draw a line without a ruler. Natural hand shake = humanity.

**Results:**
- Overall "Humanity Score" percentage
- Individual breakdown for each challenge
- Shareable results (X/Twitter integration)
- Playful verdicts: "Certified Human", "Probably Human", "Suspiciously Perfect", or "Beep Boop?"

## Why This Idea

**Cultural Moment**: Anti-AI sentiment is massive right now. TIME's "Person of the Year" AI cover sparked a cultural firestorm with 100k+ engagement posts calling AI "cancer" and defending human creativity.

**The Twist**: Instead of making another "AI detector" or anti-AI tool, this CELEBRATES what makes humans beautiful: our imperfections, mistakes, and natural variance.

**Shareability**: The results are designed to be screenshot-worthy and shareable. "I'm 94% human!" or "I got flagged as suspicious for being too perfect!" are both share-worthy outcomes.

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel
- **No API keys required** - entirely client-side

## Key Technical Decisions

1. **Canvas-based drawing** for circle and line challenges (touch-friendly)
2. **Statistical analysis** for scoring (standard deviation of circle radius, variance in click timing, etc.)
3. **Inverted scoring logic** - imperfection = higher humanity score
4. **Progressive challenge flow** with smooth transitions
5. **Responsive design** that works on mobile and desktop

## What Makes It Interesting

- **Counter-intuitive scoring**: The worse you perform at precision tasks, the better you do
- **No API dependencies**: Ships immediately, no keys needed
- **Taps into cultural anxiety**: AI vs human creativity is THE conversation right now
- **Actually fun**: Not preachy commentary, but a playful experience
- **Sharable results**: Designed for social media virality

## Future Ideas (if expanding)

- More challenges (estimate time, draw from memory, etc.)
- Leaderboard of "most human" scores
- Compare with friends mode
- Daily challenges
- Badge/certificate generator

## Lessons Learned

- Simple interactions can be deeply satisfying when framed correctly
- The anti-AI sentiment is real and people want to celebrate their humanity
- Inverting typical "test" expectations creates surprise and delight
