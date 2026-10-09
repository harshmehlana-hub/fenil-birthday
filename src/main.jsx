import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, Music2, Volume2, VolumeX, ArrowRight, Star, Cake, Mail, RotateCcw, PartyPopper, Flower2, ChevronDown } from 'lucide-react';
import './styles.css';

const burst = () => {
  confetti({ particleCount: 90, spread: 75, origin: { y: 0.68 }, colors: ['#ff7ba8', '#ffd166', '#c9b6ff', '#ffb4c8', '#ffffff'] });
};
const floaties = ['♡', '✦', '✿', '♡', '✧', '♥', '✿', '✦'];

function App() {
  const [stage, setStage] = useState('welcome');
  const [wrongGift, setWrongGift] = useState(-1);
  const [lit, setLit] = useState([true, true, true]);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [revealed, setRevealed] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const audioRef = useRef(null);

  const startMusic = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setMusicOn(true);
    } catch (error) {
      setMusicOn(false);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      await startMusic();
    } else {
      audioRef.current.pause();
      setMusicOn(false);
    }
  };

  useEffect(() => {
    document.title = stage === 'letter' ? 'One last little thing ♡' : 'For Fenil ♡';
  }, [stage]);

  const go = (next) => {
    setStage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGift = (index) => {
    if (index !== 1) {
      setWrongGift(index);
      return;
    }
    burst();
    go('birthday');
  };

  const blowCandles = () => {
    setLit([false, false, false]);
    burst();
  };

  const revealCard = (index) => {
    setRevealed((old) => old.includes(index) ? old : [...old, index]);
    if (revealed.length === 2) burst();
  };

  return (
    <main className="app-shell">
      <audio ref={audioRef} src="/wonderwall.mp3" loop preload="none" onPlay={() => setMusicOn(true)} onPause={() => setMusicOn(false)} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="float-layer" aria-hidden="true">
        {floaties.map((f, i) => <span key={i} className={`floatie floatie-${i + 1}`}>{f}</span>)}
      </div>

      <header className="topbar">
        <button className="brand" onClick={() => go('welcome')} aria-label="Back to beginning"><span className="brand-heart">♡</span> a little thing for you</button>
        <button className="sound-toggle" onClick={toggleMusic} aria-label={musicOn ? 'Pause Wonderwall' : 'Play Wonderwall'} title="Play or pause Wonderwall">
          {musicOn ? <Volume2 size={17} /> : <Music2 size={17} />} <span>{musicOn ? 'playing' : 'play song ♡'}</span>
        </button>
      </header>

      {stage === 'welcome' && <section className="welcome page-section">
        <div className="eyebrow"><Sparkles size={14} /> A tiny corner of the internet, just for you</div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="hero-heart"><Heart size={64} fill="currentColor" strokeWidth={1.2} /></div>
          <span className="art-star star-a">✦</span><span className="art-star star-b">✧</span><span className="art-star star-c">✿</span>
          <span className="art-label">made with ♡</span>
        </div>
        <p className="tiny-overline">HEY, MY KITKAT 🍫</p>
        <h1>Someone made<br />you a <em>little something.</em></h1>
        <p className="hero-copy">It's full of tiny surprises, a little bit of chaos, and a whole lot of love. Basically, very you.</p>
        <button className="primary-btn" onClick={() => { if (!musicOn) startMusic(); go('gifts'); }}>Open your surprise <ArrowRight size={17} /></button>
        <div className="scroll-hint"><ChevronDown size={15} /> made especially for Fenil</div>
      </section>}

      {stage === 'gifts' && <section className="page-section gift-stage">
        <div className="eyebrow"><Gift size={14} /> THE FIRST LITTLE QUEST</div>
        <h2>Pick a present,<br /><em>any present.</em></h2>
        <p className="section-copy">One of these has your birthday magic inside. Choose with your heart (or, you know, your finger).</p>
        <div className="gift-grid">
          {['🎀', '🎁', '🧸'].map((gift, i) => <button key={gift} className={`gift-card ${wrongGift === i ? 'gift-wrong' : ''}`} onClick={() => openGift(i)}>
            <span className="gift-emoji">{gift}</span><span className="gift-number">MYSTERY NO. 0{i + 1}</span>
            <span className="gift-caption">{wrongGift === i ? ['Not this one, Bataku 😌', 'You found it! 💗', 'Almost, cutie ✨'][i] : ['A tiny surprise', 'A little magic', 'Something sweet'][i]}</span>
          </button>)}
        </div>
        <p className="micro-copy">{wrongGift >= 0 && wrongGift !== 1 ? 'Hehe, try another one. I believe in you ♡' : 'Psst… one is a little more special.'}</p>
        <button className="text-btn" onClick={() => go('welcome')}>← back</button>
      </section>}

      {stage === 'birthday' && <section className="page-section birthday-stage">
        <div className="eyebrow"><PartyPopper size={14} /> IT'S YOUR DAY</div>
        <p className="tiny-overline">HAPPY BIRTHDAY, FENIL ♡</p>
        <h1>Today, the world<br />got <em>luckier.</em></h1>
        <p className="hero-copy">And I'm really, really glad it did. Here's a tiny wish for the girl who deserves all the soft things in life.</p>
        <div className="cake-card">
          <div className="cake-sparkle cake-sparkle-a">✦</div><div className="cake-sparkle cake-sparkle-b">✧</div>
          <div className="candles">{lit.map((on, i) => <button key={i} className={`candle ${on ? 'candle-lit' : 'candle-out'}`} onClick={() => setLit(old => old.map((v, j) => j === i ? !v : v))} aria-label={on ? 'Blow out candle' : 'Relight candle'}><span className="flame">{on ? '✦' : ''}</span><span className="candle-stick" /></button>)}</div>
          <div className="cake"><div className="icing" /><div className="cake-face">♡</div><div className="cake-base" /></div>
          <p className="cake-instruction">{lit.some(Boolean) ? 'Tap each candle to make a wish ✨' : 'Wish sent straight to the universe 💫'}</p>
          <button className="small-pill" onClick={lit.some(Boolean) ? blowCandles : () => { setLit([true, true, true]); }}> {lit.some(Boolean) ? 'Blow out the candles' : 'Light them again'} </button>
        </div>
        <button className="primary-btn" onClick={() => go('little-things')}>A few things I adore <Heart size={16} /></button>
      </section>}

      {stage === 'little-things' && <section className="page-section things-stage">
        <div className="eyebrow"><Flower2 size={14} /> A FEW LITTLE THINGS</div>
        <h2>Things that make you<br /><em>so wonderfully you.</em></h2>
        <p className="section-copy">Tap each card. I put a tiny thought inside every one.</p>
        <div className="memory-grid">
          {[
            { icon: '☀️', title: 'Your kind of sunshine', text: 'You have this way of making an ordinary day feel a little less ordinary. I hope you know that.' },
            { icon: '🦋', title: 'Your little chaos', text: 'The silly moments, the random things you say, the way you are unapologetically YOU. Never change that.' },
            { icon: '🌷', title: 'Your soft heart', text: 'I hope life gives you back all the kindness you give everyone else. You deserve that and so much more.' },
            { icon: '🍫', title: 'My Kitkat', text: 'A nickname for someone who makes life a little sweeter. And yes, I am absolutely smiling while writing this.' }
          ].map((card, i) => <button key={card.title} className={`memory-card ${revealed.includes(i) ? 'memory-revealed' : ''}`} onClick={() => revealCard(i)}>
            <span className="memory-icon">{card.icon}</span><span className="memory-title">{card.title}</span>
            {revealed.includes(i) ? <span className="memory-text">{card.text}</span> : <span className="tap-reveal">tap to unwrap ↗</span>}
          </button>)}
        </div>
        <div className="bataku-note"><span>♡</span> A reminder from your very own admirer: <strong>My Bataku</strong>, you deserve the whole universe.</div>
        <button className="primary-btn" onClick={() => go('letter')}>One last little thing <Mail size={16} /></button>
      </section>}

      {stage === 'letter' && <section className="page-section letter-stage">
        <div className="eyebrow"><Mail size={14} /> SOMETHING FROM MY HEART</div>
        <h2>Okay, one last<br /><em>little surprise.</em></h2>
        <p className="section-copy">This one's a little more personal. Open it whenever you're ready.</p>
        <button className={`envelope ${letterOpen ? 'envelope-open' : ''}`} onClick={() => { setLetterOpen(true); setShowNote(true); }} aria-label="Open your letter">
          <span className="envelope-heart">♡</span><span className="envelope-flap" /><span className="envelope-label">{letterOpen ? 'a little truth, unfolded' : 'for you, Fenil'}</span>
        </button>
        {!letterOpen && <button className="primary-btn" onClick={() => { setLetterOpen(true); setShowNote(true); }}>Open my letter <Heart size={16} /></button>}
        {showNote && <article className="letter-paper">
          <p className="letter-hello">Dear Fenil,</p>
          <p>First of all, happy birthday, <strong>My Kitkat</strong>. 🍫 I hope this new year of your life brings you the kind of happiness that stays, the kind of laughter that makes your cheeks hurt, and a hundred little reasons to smile when you least expect them.</p>
          <p>I made this tiny corner of the internet for you because a normal birthday text didn't feel like enough. You deserve effort, thought, and something that makes you feel just a little bit as special as you are to me.</p>
          <p>And there's one thing I've been wanting to say honestly. Somewhere along the way, you became more than just someone I love talking to. I've started to have feelings for you, and I didn't want to keep pretending that wasn't true.</p>
          <p>I'm not telling you this because I expect anything from you, and you don't owe me an answer. I value you, your comfort, and what we share too much for that. I just wanted you to know, gently and honestly, from me to you.</p>
          <p>Whatever you feel, I hope your birthday is beautiful. Keep being your lovely, chaotic, wonderful self, <strong>My Bataku</strong>. The world is better with you in it, and I'm grateful that mine has you in it too. ♡</p>
          <p className="letter-signoff">With lots of warmth (and a tiny bit of nervousness),<br /><span>someone who thinks you're pretty special.</span></p>
          <div className="letter-stamp">♡</div>
        </article>}
        {letterOpen && <div className="after-letter">
          <p>Whatever happens next, today is still about <em>you</em>. ♡</p>
          <button className="primary-btn" onClick={() => { burst(); go('finale'); }}>One final wish <Sparkles size={16} /></button>
        </div>}
      </section>}

      {stage === 'finale' && <section className="page-section finale-stage">
        <div className="finale-heart"><Heart fill="currentColor" size={52} strokeWidth={1.2} /></div>
        <div className="eyebrow"><Star size={14} /> THAT'S MY LITTLE SURPRISE</div>
        <h1>Keep being<br /><em>your magic.</em></h1>
        <p className="hero-copy">I hope this made you smile, Fenil. Happy birthday, My Kitkat. May this year be kind to your heart, gentle with your dreams, and full of moments worth keeping.</p>
        <div className="finale-signature">made with a whole lot of ♡</div>
        <button className="text-btn restart-btn" onClick={() => { setStage('welcome'); setWrongGift(-1); setLit([true,true,true]); setLetterOpen(false); setShowNote(false); setRevealed([]); }}><RotateCcw size={14} /> relive the little surprise</button>
      </section>}

      <footer className="footer"><span>made with love, and probably too many hearts</span><Heart size={12} fill="currentColor" /></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);