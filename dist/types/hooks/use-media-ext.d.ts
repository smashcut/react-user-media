/**
 * Hook that observes {@link MediaStream.getTracks} and provides access
 * to the results.
 * @param media the {@link MediaStream} to observe.
 * @returns an array of {@link MediaStreamTrack}s.
 */
export declare function useMediaTracks(media: MediaStream | undefined): MediaStreamTrack[];
/**
 * Hook that observes {@link MediaStream.getTracks} results that
 * have a {@link MediaStreamTrack.kind|`kind`} of `audio` and
 * provides access to the results.
 * @param media the {@link MediaStream} to observe.
 * @returns an array of audio {@link MediaStreamTrack}s.
 */
export declare function useMediaAudioTracks(media: MediaStream | undefined): MediaStreamTrack[];
/**
 * Hook that observes {@link MediaStream.getTracks} results that
 * have a {@link MediaStreamTrack.kind|`kind`} of `video` and
 * provides access to the results.
 * @param media the {@link MediaStream} to observe.
 * @returns an array of video {@link MediaStreamTrack}s.
 */
export declare function useMediaVideoTracks(media: MediaStream | undefined): MediaStreamTrack[];
/**
 * Either `muted` or `unmuted`.
 *
 * See {@link useTrackMuteState}.
 */
export type TrackMuteState = "muted" | "unmuted";
/**
 * Hook that observes a {@link MediaStreamTrack} {@link MediaStreamTrack.muted|`muted`} value
 * and provides access to the results.
 * @param track the {@link MediaStreamTrack} to observe.
 * @returns The {@link TrackMuteState} for the `track`.
 */
export declare function useTrackMuteState(track: MediaStreamTrack): TrackMuteState;
//# sourceMappingURL=use-media-ext.d.ts.map