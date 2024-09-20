/**
 * Options for configuring the recorder. Extends {@link MediaRecorderOptions}.
 */
export interface RecorderOptions extends MediaRecorderOptions {
    /**
     * The number of milliseconds to record into each `Blob`.
     *
     * If this parameter isn't included, the entire media duration is recorded
     * into a single `Blob` unless the `requestData()` method is called to
     * obtain the `Blob` and trigger the creation of a new `Blob` into which
     * the media continues to be recorded.
     */
    timeslice?: number;
    /**
     * A custom handler for the `datavailable` event.
     *
     * Note: This is for advanced use-cases only. You probably don't need to modify the default handler.
     * @param ev - the event
     * @param callback - the callback that updates internal state
     *
     * @example
     * ```ts
     * function handleData(ev: BlobEvent, callback: (value: React.SetStateAction<Blob[]>) => void) {
     *    callback((current) => current.concat(ev.data));
     * }
     * ```
     */
    dataAvailableHandler?: (ev: BlobEvent, callback: (value: React.SetStateAction<Blob[]>) => void) => void;
}
/**
 * The base state of the recorder.
 */
interface RecorderStateBase {
    /**
     * Indicates that attempting to record the `media`.
     * caused an {@link Error}.
     *
     * See {@link error}.
     */
    isError: boolean;
    /**
     * Indicates that media is actively being recorded.
     *
     * See {@link startTime}.
     */
    isRecording: boolean;
    /**
     * Indicates that {@link segments} are ready for consumption.
     *
     * See {@link segments} and {@link endTime}.
     */
    isFinalized: boolean;
    /**
     * An error that occurred attempting to record the `media`.
     *
     * See {@link isError}.
     */
    error: Error | null;
    /**
     * The time at which the `media` began recording.
     *
     * See {@link isRecording}.
     */
    startTime: DOMHighResTimeStamp | null;
    /**
     * The time at which the `media` stopped recording.
     *
     * See {@link isFinalized}.
     */
    endTime: DOMHighResTimeStamp | null;
    /**
     * The segments of the recorded `media`.
     *
     * See {@link isRecording} and {@link isFinalized}.
     */
    segments: Blob[];
    /**
     * Starts recording `media` with this recorder.
     * @param media the media to record.
     * @param options the optional options for recording.
     */
    startRecording(media: MediaStream, options?: RecorderOptions): void;
    /**
     * Stops recording `media` with this recorder.
     */
    stopRecording(): void;
}
/**
 * The error state of the recorder.
 */
interface RecorderErrorState extends RecorderStateBase {
    isError: true;
    isRecording: false;
    isFinalized: false;
    error: Error;
    startTime: null;
    endTime: null;
    segments: [];
}
/**
 * The recording state of the recorder.
 */
interface RecorderRecordingState extends RecorderStateBase {
    isError: false;
    isRecording: true;
    isFinalized: false;
    error: null;
    startTime: DOMHighResTimeStamp;
    endTime: null;
    segments: [];
}
/**
 * The final state of the recorder.
 */
interface RecorderFinalizedState extends RecorderStateBase {
    isError: false;
    isRecording: false;
    isFinalized: true;
    error: null;
    startTime: DOMHighResTimeStamp;
    endTime: DOMHighResTimeStamp;
    segments: Blob[];
}
/**
 * The state of the recorder.
 */
export type RecorderState = RecorderErrorState | RecorderRecordingState | RecorderFinalizedState;
/**
 * Hook that facilitates recording {@link MediaStream} `media` with a {@link MediaRecorder}.
 * @returns See {@link RecorderState} for more information.
 */
export declare function useMediaRecorder(): RecorderState;
export {};
//# sourceMappingURL=use-media-recorder.d.ts.map