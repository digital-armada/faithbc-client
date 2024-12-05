import React, { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { convertVideo } from "@/data/ytConvert";

interface AudioUploaderProps {
  audioFileId: number | null;
  setAudioFileId: React.Dispatch<React.SetStateAction<number | null>>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export function AudioUploader({
  audioFileId,
  setAudioFileId,
  setValue,
  watch,
}: AudioUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (result: any[]) => {
    if (result && Array.isArray(result) && result[0]) {
      const fileId = result[0].id;
      setAudioFileId(fileId);
      setValue("audio", fileId, { shouldValidate: true });
      setValue("audioUrl", result[0].url);
      setValue("audioName", result[0].name);
    }
  };

  //   const handleConvertVideo = async () => {
  //     setLoading(true);
  //     setError(null);
  //
  //     try {
  //       const result = await convertVideo(watch("youtube"));
  //
  //       if (result.error) {
  //         setError(result.error);
  //         return;
  //       }
  //
  //       if (
  //         result.data?.data &&
  //         Array.isArray(result.data.data) &&
  //         result.data.data.length > 0
  //       ) {
  //         const fileData = result.data.data[0];
  //         setAudioFileId(fileData.id);
  //         setValue("audio", fileData.id, { shouldValidate: true });
  //         setValue("audioUrl", fileData.url);
  //         setValue("audioName", fileData.name);
  //       } else {
  //         setError("No audio file was generated from the conversion");
  //       }
  //     } catch (error) {
  //       setError(
  //         error instanceof Error ? error.message : "An unexpected error occurred",
  //       );
  //       console.error("Error in video conversion:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="space-y-4">
      {/* <Button type="button" onClick={handleConvertVideo} disabled={loading}>
        {loading ? "Converting..." : "Convert YouTube to MP3"}
      </Button> */}

      {error && <div className="text-sm text-red-500">{error}</div>}

      {audioFileId && (
        <div className="space-y-2">
          <div className="text-xs text-gray-600">
            File: {watch("audioName")}
          </div>
          {watch("audioUrl") && (
            <audio controls className="w-full">
              <source src={watch("audioUrl")} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}

      <FileUploader
        allowedTypes={["audio/mpeg", "audio/ogg", "audio/wav", "audio/mp3"]}
        onUpload={handleFileUpload}
        multiple={false}
      />
    </div>
  );
}
