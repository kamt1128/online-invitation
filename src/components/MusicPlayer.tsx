import { useRef, useState } from "react";
import "../styles/_music.scss";
import speakerOn from "../assets/speaker-on.svg";
import speakerOff from "../assets/speaker-off.svg";


export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} loop src="/vals.mp3" />
      <button onClick={toggleMusic}>
        {playing ? <img src={speakerOn} alt="Speaker On" className="music-player__speaker" /> : <img src={speakerOff} alt="Speaker On" className="music-player__speaker" />}
      </button>
    </div>
  );
}
