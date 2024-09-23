// src/hooks/use-media-devices.ts
import { useState, useMemo, useCallback, useEffect } from "react";
var defaultMediaDeviceOptions = {
  filter: () => true,
  deviceChangedEvent: true
};
function useMediaDevices(options) {
  const { filter, deviceChangedEvent } = {
    ...defaultMediaDeviceOptions,
    ...options
  };
  const [devices, setDevices] = useState(
    void 0
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isError = useMemo(() => error !== null, [error]);
  const isReady = useMemo(() => typeof devices !== "undefined", [devices]);
  const request = useCallback(
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
  useEffect(
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
import { useSyncExternalStore, useCallback as useCallback2, useRef } from "react";
function useMediaTracks(media) {
  const trackCache = useRef([]);
  return useSyncExternalStore(
    useCallback2(
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
    useCallback2(
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
  return useSyncExternalStore(
    useCallback2(
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
    useCallback2(
      function getSnapshot() {
        return track.muted ? "muted" : "unmuted";
      },
      [track]
    )
  );
}

// src/hooks/use-media.ts
import { useCallback as useCallback3, useMemo as useMemo2, useState as useState2 } from "react";
function useMedia(type) {
  const [media, setMedia] = useState2(void 0);
  const [error, setError] = useState2(null);
  const [isLoading, setIsLoading] = useState2(false);
  const isError = useMemo2(() => error !== null, [error]);
  const isReady = useMemo2(() => typeof media !== "undefined", [media]);
  const request = useCallback3(
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
import {
  useState as useState3,
  useMemo as useMemo3,
  useCallback as useCallback4,
  useSyncExternalStore as useSyncExternalStore2,
  useEffect as useEffect2,
  useRef as useRef2
} from "react";
function useMediaRecorder() {
  const recorderRef = useRef2(null);
  const [isRecorderDirty, setIsRecorderDirty] = useState3(false);
  const recorder = useMemo3(() => {
    if (isRecorderDirty) setIsRecorderDirty(false);
    return recorderRef.current ?? void 0;
  }, [recorderRef, isRecorderDirty]);
  const recorderState = useMediaRecorderState(recorder);
  const isRecording = useMemo3(
    () => recorderState === "recording",
    [recorderState]
  );
  const error = useMediaRecorderError(recorder);
  const isError = useMemo3(() => error !== null, [error]);
  const [startTime, setStartTime] = useState3(null);
  const [endTime, setEndTime] = useState3(null);
  const [segments, setSegments] = useState3([]);
  const [mimeType, setMimeType] = useState3(null);
  const isFinalized = useMemo3(
    () => segments.length > 0 && recorderState === "inactive" && endTime !== null,
    [segments, recorderState, endTime]
  );
  const startRecording = useCallback4(function startRecordingMedia(media, options) {
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
  const stopRecording = useCallback4(function stopRecordingMedia() {
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
  return useSyncExternalStore2(
    useCallback4(
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
    useCallback4(
      function getSnapshot() {
        return recorder?.state ?? "unavailable";
      },
      [recorder]
    )
  );
}
function useMediaRecorderError(recorder) {
  const [error, setError] = useState3(null);
  useEffect2(
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
import {
  forwardRef,
  useCallback as useCallback5
} from "react";
import { jsx } from "react/jsx-runtime";
var AudioPlayer = forwardRef(
  function AudioPlayer2(props, ref) {
    const { media, ...rest } = props;
    const setRef = useCallback5(
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
    return /* @__PURE__ */ jsx("audio", { ref: setRef, ...rest });
  }
);

// src/components/VideoPlayer.tsx
import {
  forwardRef as forwardRef2,
  useCallback as useCallback6
} from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var VideoPlayer = forwardRef2(
  function VideoPlayer2(props, ref) {
    const { media, ...rest } = props;
    const setRef = useCallback6(
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
    return /* @__PURE__ */ jsx2("video", { ref: setRef, ...rest });
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
export {
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
};
