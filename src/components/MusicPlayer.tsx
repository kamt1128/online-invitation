import { useRef, useState } from "react";
import "../styles/_music.scss";

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
      <audio ref={audioRef} loop src="/musica.mp3" />
      <button onClick={toggleMusic}>
        {playing ? "🔊 Música activada" : "🔈 Activar música"}
      </button>
    </div>
  );
}
