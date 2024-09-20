/**
 * The base state of {@link useMediaDevices} response.
 */
interface MediaDeviceStateBase {
    isLoading: boolean;
    isError: boolean;
    isReady: boolean;
    error: Error | null;
    devices: MediaDeviceInfo[] | undefined;
    request(): void;
}
/**
 * The error state of the {@link useMediaDevices} response.
 */
interface MediaDeviceErrorState extends MediaDeviceStateBase {
    isLoading: false;
    isError: true;
    isReady: false;
    error: Error;
    devices: undefined;
}
/**
 * The loading state of the {@link useMediaDevices} response.
 */
interface MediaDeviceLoadingState extends MediaDeviceStateBase {
    isLoading: true;
    isError: false;
    isReady: false;
    error: null;
    devices: undefined;
}
/**
 * The ready state of the {@link useMediaDevices} response.
 */
interface MediaDeviceReadyState extends MediaDeviceStateBase {
    isLoading: false;
    isError: false;
    isReady: true;
    error: null;
    devices: MediaDeviceInfo[];
}
/**
 * The state of the {@link useMediaDevices} response.
 */
export type MediaDeviceState = MediaDeviceErrorState | MediaDeviceLoadingState | MediaDeviceReadyState;
/**
 * Options for the {@link useMediaDevices} hook.
 */
export interface UseMediaDeviceOptions {
    /**
     * An optional filter to further limit the results.
     * @param device the device to process.
     * @returns `true` when included, `false` when excluded.
     *
     * Default: `() => true`.
     */
    filter?: (device: MediaDeviceInfo) => boolean;
    /**
     * An optional flag that causes the {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/devicechange_event|devicechange}
     * event to be monitored, automatically requesting updated devices as needed.
     *
     * Default: `true`.
     */
    deviceChangedEvent?: boolean;
}
/**
 * Hook that allows the caller to obtain a list of devices on behalf of the user.
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices|enumerateDevices}.
 * @param options the caller-defined options for the hook.
 * @returns see {@link MediaDeviceState} for more information.
 */
export declare function useMediaDevices(options?: UseMediaDeviceOptions): MediaDeviceState;
export {};
//# sourceMappingURL=use-media-devices.d.ts.map