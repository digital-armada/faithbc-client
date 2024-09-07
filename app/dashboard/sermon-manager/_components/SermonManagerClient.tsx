"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [prevPageToken, setPrevPageToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isConverting, setIsConverting] = useState(""); // Track the video being converted
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  console.log(session);
  const fetchVideos = useCallback(
    async (token = "") => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/youtube?pageToken=${token}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setVideos(data.videos);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        router.push(`?page=${token}`, { scroll: false });
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    const pageToken = searchParams.get("page") || "";
    fetchVideos(pageToken);
  }, [searchParams, fetchVideos]);

  //   const handleConvert = async (video) => {
  //     setIsConverting(video.id); // Track the video being converted
  //     try {
  //       const response = await fetch(`/api/convert`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           videoId: video.id,
  //           title: video.title,
  //         }),
  //       });
  //
  //       if (!response.ok) throw new Error("Failed to convert video");
  //       console.log(`Video ${video.id} converted successfully`);
  //       // After conversion, refetch the current page to update the list
  //       fetchVideos(searchParams.get("page") || "");
  //     } catch (error) {
  //       console.error("Error converting video:", error);
  //     } finally {
  //       setIsConverting(""); // Reset conversion tracking
  //     }
  //   };

  const handleConvert = async (videoId) => {
    console.log(typeof videoId);
    try {
      const response = await axios.post(
        // `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/convert-sermon`,
        `http://localhost:1337/api/customroutes/convert-sermon`,
        { videoId },
        {
          headers: {
            Authorization: `Bearer ${session?.data?.strapiToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Conversion failed.");
      }

      console.log("Sermon created:", result.sermon);
    } catch (error) {
      console.error("Error creating sermon:", error);
    }
  };

  return (
    <div>
      <h1>My YouTube Videos</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {videos.map((video) => (
              <li key={video.id}>
                <h3>{video.title}</h3>
                <p>
                  Published: {new Date(video.publishedAt).toLocaleDateString()}
                </p>
                <Image src={video.thumbnails.default.url} alt={video.title} />
                {video.isConverted ? (
                  <span>Already converted</span>
                ) : (
                  <button
                    onClick={() => handleConvert(video.id)}
                    disabled={isConverting === video.id} // Disable button during conversion
                  >
                    {isConverting === video.id
                      ? "Converting..."
                      : "Convert to Sermon"}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div>
            <button
              onClick={() => fetchVideos(prevPageToken)}
              disabled={!prevPageToken || isLoading}
            >
              Previous Page
            </button>
            <button
              onClick={() => fetchVideos(nextPageToken)}
              disabled={!nextPageToken || isLoading}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}
