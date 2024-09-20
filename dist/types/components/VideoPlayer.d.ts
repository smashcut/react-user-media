import { DetailedHTMLProps, VideoHTMLAttributes } from "react";
type VideoElementProps = DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
/**
 * React props for {@link VideoPlayer}.
 */
export interface VideoPlayerProps extends Omit<VideoElementProps, keyof Pick<VideoElementProps, "src">> {
    /**
     * The {@link MediaProvider} instance to play.
     */
    media: MediaProvider;
}
/**
 * Component for easier audio playback. Wraps {@link HTMLVideoElement|&lt;video&gt;}.
 *
 * See {@link VideoPlayerProps}.
 */
export declare const VideoPlayer: import("react").ForwardRefExoticComponent<Omit<VideoPlayerProps, "ref"> & import("react").RefAttributes<HTMLVideoElement>>;
export {};
//# sourceMappingURL=VideoPlayer.d.ts.map