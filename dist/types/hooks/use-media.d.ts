type UserMediaBaseType = MediaStreamConstraints;
type DisplayMediaBaseType = DisplayMediaStreamOptions;
/**
 * The base state of {@link useMedia} response.
 */
interface MediaStateBase<T> {
    /**
     * Indicates that the {@link media} is being loaded.
     */
    isLoading: boolean;
    /**
     * Indicates that attempting to obtain the {@link media}
     * caused an {@link Error}.
     *
     * See {@link error}.
     */
    isError: boolean;
    /**
     * Indicates that {@link media} is ready for use.
     *
     * See {@link media}.
     */
    isReady: boolean;
    /**
     * An error that occurred attempting to obtain the {@link media}.
     *
     * See {@link isError}.
     */
    error: Error | null;
    /**
     * The obtained media.
     *
     * See {@link isReady}.
     */
    media: MediaStream | undefined;
    /**
     * Requests new {@link media} on behalf of the user.
     */
    request(options?: T): void;
}
/**
 * The error state of {@link useMedia} response.
 */
interface UserMediaErrorState extends MediaStateBase<UserMediaBaseType> {
    isLoading: false;
    isError: true;
    isReady: false;
    error: Error;
    media: undefined;
}
/**
 * The loading state of {@link useMedia} response.
 */
interface UserMediaLoadingState extends MediaStateBase<UserMediaBaseType> {
    isLoading: true;
    isError: false;
    isReady: false;
    error: null;
    media: undefined;
}
/**
 * The ready state of {@link useMedia} response.
 */
interface UserMediaReadyState extends MediaStateBase<UserMediaBaseType> {
    isLoading: false;
    isError: false;
    isReady: true;
    error: null;
    media: MediaStream;
}
/**
 * The state of {@link useMedia} response.
 */
export type UserMediaState = UserMediaErrorState | UserMediaLoadingState | UserMediaReadyState;
/**
 * The displayMedia error state of {@link useMedia} response.
 */
interface DisplayMediaErrorState extends MediaStateBase<DisplayMediaBaseType> {
    isLoading: false;
    isError: true;
    isReady: false;
    error: Error;
    media: undefined;
}
/**
 * The displayMedia loading state of {@link useMedia} response.
 */
interface DisplayMediaLoadingState extends MediaStateBase<DisplayMediaBaseType> {
    isLoading: true;
    isError: false;
    isReady: false;
    error: null;
    media: undefined;
}
/**
 * The displayMedia ready state of {@link useMedia} response.
 */
interface DisplayMediaReadyState extends MediaStateBase<DisplayMediaBaseType> {
    isLoading: false;
    isError: false;
    isReady: true;
    error: null;
    media: MediaStream;
}
/**
 * The displayMedia state of {@link useMedia} response.
 */
export type DisplayMediaState = DisplayMediaErrorState | DisplayMediaLoadingState | DisplayMediaReadyState;
interface MediaDef<Type, RequestExtensionType extends {
    request(...args: any[]): any;
}, StateExtensionType extends MediaStateBase<any>> {
    type: Type;
    requestType: RequestExtensionType;
    stateType: StateExtensionType;
}
type UserMediaDef = MediaDef<"user", {
    request(constraints?: UserMediaBaseType): void;
}, UserMediaState>;
type DisplayMediaDef = MediaDef<"display", {
    request(options?: DisplayMediaBaseType): void;
}, DisplayMediaState>;
type inferMediaDef<Type> = Type extends UserMediaDef["type"] ? UserMediaDef : Type extends DisplayMediaDef["type"] ? DisplayMediaDef : never;
/**
 * Hook that allows the caller to obtain and manage media on behalf of the user.
 *
 * Most commonly, this is used to access webcams, microphones, or mirrored media.
 * @param type - the type of media to use.
 * - `user` causes media to be obtained via {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia|getUserMedia}
 * - `display` causes media to be obtained via {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia|getDisplayMedia}
 * @returns see {@link UserMediaState} and {@link DisplayMediaState} for more information.
 */
export declare function useMedia<TType extends UserMediaDef["type"] | DisplayMediaDef["type"]>(type: TType): inferMediaDef<TType>["stateType"];
export {};
//# sourceMappingURL=use-media.d.ts.map