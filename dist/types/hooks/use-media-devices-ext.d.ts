import { UseMediaDeviceOptions } from "./use-media-devices";
/**
 * Hook that observes {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices|enumerateDevices}
 * results that have a {@link MediaDeviceInfo.kind|`kind`} starting with `audio` and
 * @param options the caller-defined options for the hook.
 * @returns a {@link MediaDeviceState}.
 */
export declare function useMediaAudioDevices(options?: UseMediaDeviceOptions): import("./use-media-devices").MediaDeviceState;
/**
 * Hook that observes {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices|enumerateDevices}
 * results that have a {@link MediaDeviceInfo.kind|`kind`} of `audioinput` and
 * @param options the caller-defined options for the hook.
 * @returns a {@link MediaDeviceState}.
 */
export declare function useMediaAudioInputDevices(options?: UseMediaDeviceOptions): import("./use-media-devices").MediaDeviceState;
/**
 * Hook that observes {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices|enumerateDevices}
 * results that have a {@link MediaDeviceInfo.kind|`kind`} of `audiooutput` and
 * @param options the caller-defined options for the hook.
 * @returns a {@link MediaDeviceState}.
 */
export declare function useMediaAudioOutputDevices(options?: UseMediaDeviceOptions): import("./use-media-devices").MediaDeviceState;
/**
 * Hook that observes {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices|enumerateDevices}
 * results that have a {@link MediaDeviceInfo.kind|`kind`} that starts with `video` and
 * @param options the caller-defined options for the hook.
 * @returns a {@link MediaDeviceState}.
 */
export declare function useMediaVideoDevices(options?: UseMediaDeviceOptions): import("./use-media-devices").MediaDeviceState;
//# sourceMappingURL=use-media-devices-ext.d.ts.map