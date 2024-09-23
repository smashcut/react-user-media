"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AudioPlayer: () => AudioPlayer,
  VideoPlayer: () => VideoPlayer,
  closeMedia: () => closeMedia,
  getSupportedConstraints: () => getSupportedConstraints,
  useMedia: () => useMedia,
  useMediaAudioDevices: () => useMediaAudioDevices,
  useMediaAudioInputDevices: () => useMediaAudioInputDevices,
  useMediaAudioOutputDevices: () => useMediaAudioOutputDevices,
  useMediaAudioTracks: () => useMediaAudioTracks,
  useMediaDevices: () => useMediaDevices,
  useMediaRecorder: () => useMediaRecorder,
  useMediaTracks: () => useMediaTracks,
  useMediaVideoDevices: () => useMediaVideoDevices,
  useMediaVideoTracks: () => useMediaVideoTracks,
  useTrackMuteState: () => useTrackMuteState
});
module.exports = __toCommonJS(src_exports);

// src/hooks/use-media-devices.ts
var import_react = require("react");
var defaultMediaDeviceOptions = {
  filter: () => true,
  deviceChangedEvent: true
};
function useMediaDevices(options) {
  const { filter, deviceChangedEvent } = {
    ...defaultMediaDeviceOptions,
    ...options
  };
  const [devices, setDevices] = (0, import_react.useState)(
    void 0
  );
  const [error, setError] = (0, import_react.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const isError = (0, import_react.useMemo)(() => error !== null, [error]);
  const isReady = (0, import_react.useMemo)(() => typeof devices !== "undefined", [devices]);
  const request = (0, import_react.useCallback)(
    function requestMediaDevices() {
      if (!navigator.mediaDevices.enumerateDevices) {
        return setError(
          new Error(
            `enumerateDevices is not available. Are you in a secure context?`
          )
        );
      }
      setIsLoading(true);
      setDevices(void 0);
      setError(null);
      navigator.mediaDevices.enumerateDevices().then(
        function onRequestSuccess(devices2) {
          setDevices(devices2.filter(filter));
          setError(null);
        },
        function onRequestError(error2) {
          setError(error2);
          setDevices(void 0);
        }
      );
    },
    [filter]
  );
  (0, import_react.useEffect)(
    function requestMediaDevicesEvent() {
      if (deviceChangedEvent) {
        const onDeviceChange = () => {
          request();
        };
        navigator.mediaDevices.addEventListener("devicechange", onDeviceChange);
        return function teardown() {
          navigator.mediaDevices.removeEventListener(
            "devicechange",
            onDeviceChange
          );
        };
      }
    },
    [deviceChangedEvent, request]
  );
  const state = {
    isError,
    isLoading,
    isReady,
    error,
    devices,
    request
  };
  return state;
}

// src/hooks/use-media-devices-ext.ts
function useMediaAudioDevices(options) {
  return useMediaDevices({
    ...options,
    filter(device) {
      return device.kind.startsWith("audio") && (!options?.filter || options.filter(device));
    }
  });
}
function useMediaAudioInputDevices(options) {
  return useMediaDevices({
    ...options,
    filter(device) {
      return device.kind === "audioinput" && (!options?.filter || options.filter(device));
    }
  });
}
function useMediaAudioOutputDevices(options) {
  return useMediaDevices({
    ...options,
    filter(device) {
      return device.kind === "audiooutput" && (!options?.filter || options.filter(device));
    }
  });
}
function useMediaVideoDevices(options) {
  return useMediaDevices({
    ...options,
    filter(device) {
      return device.kind.startsWith("video") && (!options?.filter || options.filter(device));
    }
  });
}

// src/hooks/use-media-ext.ts
var import_react2 = require("react");
function useMediaTracks(media) {
  const trackCache = (0, import_react2.useRef)([]);
  return (0, import_react2.useSyncExternalStore)(
    (0, import_react2.useCallback)(
      function subscribe(callback) {
        media?.addEventListener("addtrack", callback);
        media?.addEventListener("removetrack", callback);
        return function unsubscribe() {
          media?.removeEventListener("addtrack", callback);
          media?.removeEventListener("removetrack", callback);
        };
      },
      [media]
    ),
    (0, import_react2.useCallback)(
      function getSnapshot() {
        if (media) {
          const latestTracks = media.getTracks();
          if (latestTracks.length !== trackCache.current.length) {
            const latestTrackIds = latestTracks.map((t) => t.id);
            const cachedTrackIds = trackCache.current.map((t) => t.id);
            if (!latestTrackIds.every((id) => cachedTrackIds.includes(id))) {
              trackCache.current = latestTracks;
            }
          }
        }
        return trackCache.current;
      },
      [media]
    )
  );
}
function useMediaAudioTracks(media) {
  return useMediaTracks(media).filter((t) => t.kind === "audio");
}
function useMediaVideoTracks(media) {
  return useMediaTracks(media).filter((t) => t.kind === "video");
}
function useTrackMuteState(track) {
  return (0, import_react2.useSyncExternalStore)(
    (0, import_react2.useCallback)(
      function subscribe(callback) {
        track.addEventListener("mute", callback);
        track.addEventListener("unmute", callback);
        return function unsubscribe() {
          track.removeEventListener("mute", callback);
          track.removeEventListener("unmute", callback);
        };
      },
      [track]
    ),
    (0, import_react2.useCallback)(
      function getSnapshot() {
        return track.muted ? "muted" : "unmuted";
      },
      [track]
    )
  );
}

// src/hooks/use-media.ts
var import_react3 = require("react");
function useMedia(type) {
  const [media, setMedia] = (0, import_react3.useState)(void 0);
  const [error, setError] = (0, import_react3.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const isError = (0, import_react3.useMemo)(() => error !== null, [error]);
  const isReady = (0, import_react3.useMemo)(() => typeof media !== "undefined", [media]);
  const request = (0, import_react3.useCallback)(
    function requestUserMedia(...args) {
      if (type === "user" && !navigator.mediaDevices.getUserMedia) {
        return setError(
          new Error(
            `getUserMedia is not available. Are you using a modern browser?`
          )
        );
      }
      if (type === "display" && !navigator.mediaDevices.getDisplayMedia) {
        return setError(
          new Error(
            `getDisplayMedia is not available. Are you in a secure context?`
          )
        );
      }
      setIsLoading(true);
      setMedia(void 0);
      setError(null);
      switch (type) {
        case "user":
          navigator.mediaDevices.getUserMedia(...args).then(
            function onRequestSuccess(userMedia) {
              setMedia(userMedia);
              setError(null);
            },
            function onRequestError(error2) {
              setError(error2);
              setMedia(void 0);
            }
          ).then(function finalizeRequest() {
            setIsLoading(false);
          });
          break;
        case "display":
          navigator.mediaDevices.getDisplayMedia(...args).then(
            function onRequestSuccess(userMedia) {
              setMedia(userMedia);
              setError(null);
            },
            function onRequestError(error2) {
              setError(error2);
              setMedia(void 0);
            }
          ).then(function finalizeRequest() {
            setIsLoading(false);
          });
          break;
        default:
          type;
      }
    },
    [type]
  );
  const state = {
    isError,
    isLoading,
    isReady,
    error,
    media,
    request
  };
  return state;
}

// src/hooks/use-media-recorder.ts
var import_react4 = require("react");
function useMediaRecorder() {
  const recorderRef = (0, import_react4.useRef)(null);
  const [isRecorderDirty, setIsRecorderDirty] = (0, import_react4.useState)(false);
  const recorder = (0, import_react4.useMemo)(() => {
    if (isRecorderDirty) setIsRecorderDirty(false);
    return recorderRef.current ?? void 0;
  }, [recorderRef, isRecorderDirty]);
  const recorderState = useMediaRecorderState(recorder);
  const isRecording = (0, import_react4.useMemo)(
    () => recorderState === "recording",
    [recorderState]
  );
  const error = useMediaRecorderError(recorder);
  const isError = (0, import_react4.useMemo)(() => error !== null, [error]);
  const [startTime, setStartTime] = (0, import_react4.useState)(null);
  const [endTime, setEndTime] = (0, import_react4.useState)(null);
  const [segments, setSegments] = (0, import_react4.useState)([]);
  const [mimeType, setMimeType] = (0, import_react4.useState)(null);
  const isFinalized = (0, import_react4.useMemo)(
    () => segments.length > 0 && recorderState === "inactive" && endTime !== null,
    [segments, recorderState, endTime]
  );
  const startRecording = (0, import_react4.useCallback)(function startRecordingMedia(media, options) {
    const { timeslice, dataAvailableHandler, ...recorderOptions } = {
      timeslice: 30 * 1e3,
      dataAvailableHandler: (ev, callback) => {
        callback((current) => current.concat(ev.data));
      },
      ...options
    };
    const recorder2 = new MediaRecorder(media, recorderOptions);
    recorder2.addEventListener("dataavailable", function onDataAvailable(ev) {
      dataAvailableHandler(ev, setSegments);
    });
    setSegments([]);
    setMimeType(recorderOptions.mimeType ?? "");
    setEndTime(null);
    const startTime2 = performance.now();
    recorder2.start(timeslice);
    setStartTime(startTime2);
    recorderRef.current = recorder2;
    setIsRecorderDirty(true);
  }, []);
  const stopRecording = (0, import_react4.useCallback)(function stopRecordingMedia() {
    const endTime2 = performance.now();
    recorderRef.current?.addEventListener(
      "stop",
      function onStopCompleted() {
        setEndTime(endTime2);
      },
      { once: true }
    );
    recorderRef.current?.stop();
  }, []);
  const state = {
    isError,
    isRecording,
    isFinalized,
    error,
    segments,
    startTime,
    endTime,
    mimeType,
    startRecording,
    stopRecording
  };
  return state;
}
function useMediaRecorderState(recorder) {
  return (0, import_react4.useSyncExternalStore)(
    (0, import_react4.useCallback)(
      function subscribe(callback) {
        recorder?.addEventListener("start", callback);
        recorder?.addEventListener("stop", callback);
        recorder?.addEventListener("resume", callback);
        recorder?.addEventListener("pause", callback);
        return function unsubscribe() {
          recorder?.removeEventListener("start", callback);
          recorder?.removeEventListener("stop", callback);
          recorder?.removeEventListener("resume", callback);
          recorder?.removeEventListener("pause", callback);
        };
      },
      [recorder]
    ),
    (0, import_react4.useCallback)(
      function getSnapshot() {
        return recorder?.state ?? "unavailable";
      },
      [recorder]
    )
  );
}
function useMediaRecorderError(recorder) {
  const [error, setError] = (0, import_react4.useState)(null);
  (0, import_react4.useEffect)(
    function observeRecorderError() {
      if (recorder) {
        const onError = () => {
          setError(new Error(`MediaRecorder encountered an unknown error.`));
        };
        recorder.addEventListener("error", onError);
        return function teardown() {
          recorder.removeEventListener("error", onError);
        };
      }
    },
    [recorder]
  );
  return error;
}

// src/components/AudioPlayer.tsx
var import_react5 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var AudioPlayer = (0, import_react5.forwardRef)(
  function AudioPlayer2(props, ref) {
    const { media, ...rest } = props;
    const setRef = (0, import_react5.useCallback)(
      (element) => {
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
        if (element) {
          element.srcObject = media;
        }
      },
      [ref, media]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", { ref: setRef, ...rest });
  }
);

// src/components/VideoPlayer.tsx
var import_react6 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var VideoPlayer = (0, import_react6.forwardRef)(
  function VideoPlayer2(props, ref) {
    const { media, ...rest } = props;
    const setRef = (0, import_react6.useCallback)(
      (element) => {
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
        if (element) {
          element.srcObject = media;
        }
      },
      [ref, media]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("video", { ref: setRef, ...rest });
  }
);

// src/index.ts
function getSupportedConstraints() {
  return navigator.mediaDevices.getSupportedConstraints();
}
function closeMedia(media) {
  media.getTracks().forEach(function closeMediaTrack(track) {
    track.stop();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioPlayer,
  VideoPlayer,
  closeMedia,
  getSupportedConstraints,
  useMedia,
  useMediaAudioDevices,
  useMediaAudioInputDevices,
  useMediaAudioOutputDevices,
  useMediaAudioTracks,
  useMediaDevices,
  useMediaRecorder,
  useMediaTracks,
  useMediaVideoDevices,
  useMediaVideoTracks,
  useTrackMuteState
});
