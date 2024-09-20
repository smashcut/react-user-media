import { DetailedHTMLProps, AudioHTMLAttributes } from "react";
type AudioElementProps = DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
/**
 * React props for {@link AudioPlayer}.
 */
export interface AudioPlayerProps extends Omit<AudioElementProps, keyof Pick<AudioElementProps, "src">> {
    /**
     * The {@link MediaProvider} instance to play.
     */
    media: MediaProvider;
}
/**
 * Component for easier audio playback. Wraps {@link HTMLAudioElement|&lt;audio&gt;}.
 *
 * See {@link AudioPlayerProps}.
 */
export declare const AudioPlayer: import("react").ForwardRefExoticComponent<Omit<AudioPlayerProps, "ref"> & import("react").RefAttributes<HTMLAudioElement>>;
export {};
//# sourceMappingURL=AudioPlayer.d.ts.map