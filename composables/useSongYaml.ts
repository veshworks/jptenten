import { stringify } from 'yaml';

function timeParse(timeString: string) {
  if (timeString === undefined) return 0;
  if (timeString === '+') return Infinity;

  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
}

function timeFormat(time: number) {
  if (time === Infinity) return '+';

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

type LyricsRaw = {
  kanji: string;
  translation: string;
  start: string;
  stop?: string;
}[];

export default function useSongYaml(initialValue = {}) {
  const rawInitial = toValue(initialValue) as any;

  const song = reactive({
    title: (rawInitial.title ?? '') as string,
    artist: (rawInitial.artist ?? '') as string,
    player: {
      type: (rawInitial.player?.type ?? 'youtube') as 'youtube',
      source: (rawInitial.player?.source ?? '') as string,
    },
    lyrics: ((rawInitial.lyrics ?? []) as LyricsRaw)
      .map((line, index, array) => {
        // set '+' to stop if next.start === item.start
        const next = array[index + 1];
        const stop = next?.start === line.start
          ? '+'
          : line?.stop ?? next?.start ?? '+';

          return {
            kanji: line.kanji,
            translation: line.translation,
            start: timeParse(line.start),
            stop: timeParse(stop),
          };
      }),
  });

  const toString = () => {
    const yaml = JSON.parse(JSON.stringify(song));

    yaml.lyrics = (yaml as typeof song).lyrics.map((line) => {
      return {
        ...line,
        start: timeFormat(line.start),
        stop: timeFormat(line.stop),
      };
    });

    return stringify(yaml);
  };

  const download = () => {
    const blob = new Blob([toString()], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${song.artist} ／ ${song.title}.yml`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return {
    song,
    toString,
    download,
  };
}
