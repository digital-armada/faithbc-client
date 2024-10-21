"use server";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import os from "os";
import { fileUploadService } from "./services/file-service";

// Utility function for filename sanitation
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9]/gi, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
}

export async function convertVideo(videoUrl) {
  console.log("Starting video conversion:", videoUrl);
  try {
    // Hardcoded cookies
    const cookies = [
      {
        name: "__Secure-1PAPISID",
        value: "A8HlVjwHspSZD8gU/AZO5uMe3dfPIg3a1Z",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 1,
      },
      {
        name: "__Secure-1PSID",
        value:
          "g.a000pQhTsj55y7qR6pIjOBkXF4j88Vv2z1nVk5Nk0zkqnGgsl9uRBoHO9CanOi0lLjXDLVAEkAACgYKAesSARYSFQHGX2MigVJjNGlh_N3XiM0FdLXqPBoVAUF8yKryo0uADcho7mYq3ljaXJN00076",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 2,
      },
      {
        name: "__Secure-1PSIDCC",
        value:
          "AKEyXzWrTq0Ky3X08lvVaTwqDw_mnpe3x9xCXQlky1yD0Yhmf1W3xFBBtcqCe3StrCqCYC96",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1761028199,
        storeId: "firefox-default",
        id: 3,
      },
      {
        name: "__Secure-1PSIDTS",
        value:
          "sidts-CjEBQlrA-GVPWpfIxl32DoAy_x5VLhsy5T46Es0LiPF6ZB-6P7gy-rXZiv1xNAFu7ahSEAA",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1761028150,
        storeId: "firefox-default",
        id: 4,
      },
      {
        name: "__Secure-3PAPISID",
        value: "A8HlVjwHspSZD8gU/AZO5uMe3dfPIg3a1Z",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 5,
      },
      {
        name: "__Secure-3PSID",
        value:
          "g.a000pQhTsj55y7qR6pIjOBkXF4j88Vv2z1nVk5Nk0zkqnGgsl9uRUJvdYAlEWkVNeAgbysyH7QACgYKAcsSARYSFQHGX2MiNDvWlo6IWF4HlMjW8CsjqRoVAUF8yKpLtCd7_A4zL5yaybSlV6JC0076",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 6,
      },
      {
        name: "__Secure-3PSIDCC",
        value:
          "AKEyXzWIZWe1p8q_Jr5rEi96nqUnEA6Y2xfj1Tk4OQfvTjxrwaZtD_U8xGSiEV5RLTm6CHPF-A",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1761028199,
        storeId: "firefox-default",
        id: 7,
      },
      {
        name: "__Secure-3PSIDTS",
        value:
          "sidts-CjEBQlrA-GVPWpfIxl32DoAy_x5VLhsy5T46Es0LiPF6ZB-6P7gy-rXZiv1xNAFu7ahSEAA",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1761028150,
        storeId: "firefox-default",
        id: 8,
      },
      {
        name: "APISID",
        value: "EYn7aY9ht5YXxt6l/ARphIMMYvfi4JWe78",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 9,
      },
      {
        name: "GPS",
        value: "1",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729493947,
        storeId: "firefox-default",
        id: 10,
      },
      {
        name: "HSID",
        value: "AmKFcJXq4nr78BaCJ",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 11,
      },
      {
        name: "LOGIN_INFO",
        value:
          "AFmmF2swRgIhAIQnUrML0_rlMbNspguzERBxF5xFCwqbtUYYhUKaLA9JAiEAmjN0XnxKIVW4uSK1ra3jo0DJ9MUcLcAFhUQXqdR6DIM:QUQ3MjNmendqMkRhblhGS25kdGRsZFBrRHRGNHdTekFlZlBOZjZDVmtJU01XWXF0eHN2OU9JclZja2F3NGlVckI3TjJzeVdHYXdHTWUwR09EUlBpU2ZDbnJfYjFzUjU0Z2d4SDJldlNYSm5YZjNZeDBHRV94bE5kYi13NzUxZWhjNmJIeFN4clR3NDBFYl9UdXRVODEwdWZEQ29jaXJ4ZEphVnlQbUdKdW5WakNuRUZwZGtCcVVuT3p2bnJabVEyNFdsT0RHQ1U0bURVYWpKaUYyM2lVV083cU5ET2dWQkRFZw==",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564162,
        storeId: "firefox-default",
        id: 12,
      },
      {
        name: "PREF",
        value: "f4=4000000&f6=40000000&tz=Australia.Sydney",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564163,
        storeId: "firefox-default",
        id: 13,
      },
      {
        name: "SAPISID",
        value: "A8HlVjwHspSZD8gU/AZO5uMe3dfPIg3a1Z",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 14,
      },
      {
        name: "SID",
        value:
          "g.a000pQhTsj55y7qR6pIjOBkXF4j88Vv2z1nVk5Nk0zkqnGgsl9uRlGisPgmGZMFqyY31kgPbAgACgYKARsSARYSFQHGX2MieWSQx-3TdUAHt8xzWk1tXxoVAUF8yKoKWnvEZSdsn_unPQwp4_Sa0076",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 15,
      },
      {
        name: "SIDCC",
        value:
          "AKEyXzUjWAvLEIavECWQJsxkzOrBM5NjKIUd2Hxh3moIPe_zamOP42Tyo6GeA31P-YrM8h6v",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1761028199,
        storeId: "firefox-default",
        id: 16,
      },
      {
        name: "SSID",
        value: "APpXtKTl58NR1iCpc",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1792564150,
        storeId: "firefox-default",
        id: 17,
      },
      {
        name: "ST-1d9jt3w",
        value:
          "session_logininfo=AFmmF2swRQIhAP0uDawTZTTab5Pq7q-s4wZz53dR7Vepzw44uInCet_pAiBqPuqytQrADAodutn2l14kWZMVaVpJg-Ai_FbXYyBp2w%3AQUQ3MjNmekNSXy1CMXpQU3VMVUliX0Nlelg4SVpneWpaZXpqWW43SjFmRWRpN1RZcGNYZy1kQ0taeFQwX2xXcjlqUWhIeDVlRy1CM0poblhqaF9pLWlqbkd6SEk3WGFUS09oVjkzOEhWdkFIVHJKWjhQQnhiY2g4cUltdVBodU9MMkN0MXdId3REU2gxSTdHNjJhN2hvbFhLYWZRM2NNaFhR",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492164,
        storeId: "firefox-default",
        id: 18,
      },
      {
        name: "ST-1supwba",
        value: "remind_identity=1",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492159,
        storeId: "firefox-default",
        id: 19,
      },
      {
        name: "ST-3opvp5",
        value:
          "session_logininfo=AFmmF2swRQIhAP0uDawTZTTab5Pq7q-s4wZz53dR7Vepzw44uInCet_pAiBqPuqytQrADAodutn2l14kWZMVaVpJg-Ai_FbXYyBp2w%3AQUQ3MjNmekNSXy1CMXpQU3VMVUliX0Nlelg4SVpneWpaZXpqWW43SjFmRWRpN1RZcGNYZy1kQ0taeFQwX2xXcjlqUWhIeDVlRy1CM0poblhqaF9pLWlqbkd6SEk3WGFUS09oVjkzOEhWdkFIVHJKWjhQQnhiY2g4cUltdVBodU9MMkN0MXdId3REU2gxSTdHNjJhN2hvbFhLYWZRM2NNaFhR",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492161,
        storeId: "firefox-default",
        id: 20,
      },
      {
        name: "ST-hcbf8d",
        value:
          "session_logininfo=AFmmF2swRgIhAIQnUrML0_rlMbNspguzERBxF5xFCwqbtUYYhUKaLA9JAiEAmjN0XnxKIVW4uSK1ra3jo0DJ9MUcLcAFhUQXqdR6DIM%3AQUQ3MjNmendqMkRhblhGS25kdGRsZFBrRHRGNHdTekFlZlBOZjZDVmtJU01XWXF0eHN2OU9JclZja2F3NGlVckI3TjJzeVdHYXdHTWUwR09EUlBpU2ZDbnJfYjFzUjU0Z2d4SDJldlNYSm5YZjNZeDBHRV94bE5kYi13NzUxZWhjNmJIeFN4clR3NDBFYl9UdXRVODEwdWZEQ29jaXJ4ZEphVnlQbUdKdW5WakNuRUZwZGtCcVVuT3p2bnJabVEyNFdsT0RHQ1U0bURVYWpKaUYyM2lVV083cU5ET2dWQkRFZw%3D%3D",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492168,
        storeId: "firefox-default",
        id: 21,
      },
      {
        name: "ST-l3hjtt",
        value:
          "session_logininfo=AFmmF2swRgIhAIQnUrML0_rlMbNspguzERBxF5xFCwqbtUYYhUKaLA9JAiEAmjN0XnxKIVW4uSK1ra3jo0DJ9MUcLcAFhUQXqdR6DIM%3AQUQ3MjNmendqMkRhblhGS25kdGRsZFBrRHRGNHdTekFlZlBOZjZDVmtJU01XWXF0eHN2OU9JclZja2F3NGlVckI3TjJzeVdHYXdHTWUwR09EUlBpU2ZDbnJfYjFzUjU0Z2d4SDJldlNYSm5YZjNZeDBHRV94bE5kYi13NzUxZWhjNmJIeFN4clR3NDBFYl9UdXRVODEwdWZEQ29jaXJ4ZEphVnlQbUdKdW5WakNuRUZwZGtCcVVuT3p2bnJabVEyNFdsT0RHQ1U0bURVYWpKaUYyM2lVV083cU5ET2dWQkRFZw%3D%3D",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492168,
        storeId: "firefox-default",
        id: 22,
      },
      {
        name: "ST-snvx7d",
        value:
          "session_logininfo=AFmmF2swRQIhANh3fDV7NoMdTjTcBZ5y5l5LnyVopMv8E-rFDwj2I-7oAiBH8sB8hl8wDD2jwqYTceh02L6ukmyHBli3K1M3_83MeA%3AQUQ3MjNmeFlONENzdU5jLUpkZ0kxdDlSZFdqUkhlQ21ZTFZtVDJMZktld3NWY1dOSHlQTWVZcmpmWE5lUmxkZGpPb2dqUGoxMGhmRjN0WW9sd3ZaaWp1RUhjR08zNzRFYXBfT21NRkNWbzdMbTVPWUwxUy1mMFo5cnI4eU1qcE9VVWJ4OWxvRmtlX3BQMjJySlZ2R0haWUhnbnd3alhyVE5B",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492157,
        storeId: "firefox-default",
        id: 23,
      },
      {
        name: "ST-tladcw",
        value:
          "session_logininfo=AFmmF2swRgIhAIQnUrML0_rlMbNspguzERBxF5xFCwqbtUYYhUKaLA9JAiEAmjN0XnxKIVW4uSK1ra3jo0DJ9MUcLcAFhUQXqdR6DIM%3AQUQ3MjNmendqMkRhblhGS25kdGRsZFBrRHRGNHdTekFlZlBOZjZDVmtJU01XWXF0eHN2OU9JclZja2F3NGlVckI3TjJzeVdHYXdHTWUwR09EUlBpU2ZDbnJfYjFzUjU0Z2d4SDJldlNYSm5YZjNZeDBHRV94bE5kYi13NzUxZWhjNmJIeFN4clR3NDBFYl9UdXRVODEwdWZEQ29jaXJ4ZEphVnlQbUdKdW5WakNuRUZwZGtCcVVuT3p2bnJabVEyNFdsT0RHQ1U0bURVYWpKaUYyM2lVV083cU5ET2dWQkRFZw%3D%3D",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492168,
        storeId: "firefox-default",
        id: 24,
      },
      {
        name: "ST-uwicob",
        value:
          "session_logininfo=AFmmF2swRQIhAP0uDawTZTTab5Pq7q-s4wZz53dR7Vepzw44uInCet_pAiBqPuqytQrADAodutn2l14kWZMVaVpJg-Ai_FbXYyBp2w%3AQUQ3MjNmekNSXy1CMXpQU3VMVUliX0Nlelg4SVpneWpaZXpqWW43SjFmRWRpN1RZcGNYZy1kQ0taeFQwX2xXcjlqUWhIeDVlRy1CM0poblhqaF9pLWlqbkd6SEk3WGFUS09oVjkzOEhWdkFIVHJKWjhQQnhiY2g4cUltdVBodU9MMkN0MXdId3REU2gxSTdHNjJhN2hvbFhLYWZRM2NNaFhR",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492162,
        storeId: "firefox-default",
        id: 25,
      },
      {
        name: "ST-xuwub9",
        value:
          "session_logininfo=AFmmF2swRgIhAIQnUrML0_rlMbNspguzERBxF5xFCwqbtUYYhUKaLA9JAiEAmjN0XnxKIVW4uSK1ra3jo0DJ9MUcLcAFhUQXqdR6DIM%3AQUQ3MjNmendqMkRhblhGS25kdGRsZFBrRHRGNHdTekFlZlBOZjZDVmtJU01XWXF0eHN2OU9JclZja2F3NGlVckI3TjJzeVdHYXdHTWUwR09EUlBpU2ZDbnJfYjFzUjU0Z2d4SDJldlNYSm5YZjNZeDBHRV94bE5kYi13NzUxZWhjNmJIeFN4clR3NDBFYl9UdXRVODEwdWZEQ29jaXJ4ZEphVnlQbUdKdW5WakNuRUZwZGtCcVVuT3p2bnJabVEyNFdsT0RHQ1U0bURVYWpKaUYyM2lVV083cU5ET2dWQkRFZw%3D%3D",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: false,
        httpOnly: false,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1729492168,
        storeId: "firefox-default",
        id: 26,
      },
      {
        name: "VISITOR_INFO1_LIVE",
        value: "pl7UB8HvtWE",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1745044147,
        storeId: "firefox-default",
        id: 27,
      },
      {
        name: "VISITOR_PRIVACY_METADATA",
        value: "CgJBVRIEGgAgQw%3D%3D",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: false,
        firstPartyDomain: "",
        partitionKey: null,
        expirationDate: 1745044147,
        storeId: "firefox-default",
        id: 28,
      },
      {
        name: "YSC",
        value: "u0PqyQEiw4g",
        domain: ".youtube.com",
        hostOnly: false,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "no_restriction",
        session: true,
        firstPartyDomain: "",
        partitionKey: null,
        storeId: "firefox-default",
        id: 29,
      },
    ];

    // Manually build the cookie string for headers
    const cookieHeader = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const options = {
      requestOptions: {
        headers: {
          Cookie: cookieHeader,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      },
    };

    const videoInfo = await ytdl.getInfo(videoUrl, options);
    const videoTitle = videoInfo.videoDetails.title;
    const sanitizedTitle = sanitizeFilename(videoTitle);

    console.log("Video info retrieved:", {
      title: videoTitle,
      lengthSeconds: videoInfo.videoDetails.lengthSeconds,
    });

    const videoId = ytdl.getURLVideoID(videoUrl);
    const tempDir = os.tmpdir();
    const outputPath = path.join(tempDir, `${videoId}.mp3`);

    console.log("Converting video to MP3:", {
      outputPath,
      videoId,
    });

    await new Promise((resolve, reject) => {
      const stream = ytdl(videoUrl, {
        ...options,
        filter: "audioonly",
        quality: "highestaudio",
      });

      stream.on("error", (error) => {
        console.error("YouTube download error:", error);
        reject(error);
      });

      ffmpeg(stream)
        .audioCodec("libmp3lame")
        .toFormat("mp3")
        .audioBitrate(192)
        .on("start", () => console.log("FFmpeg conversion started"))
        .on("progress", (progress) => console.log("FFmpeg progress:", progress))
        .on("error", (error) => {
          console.error("FFmpeg error:", error);
          reject(error);
        })
        .on("end", () => {
          console.log("FFmpeg conversion completed");
          resolve(null);
        })
        .save(outputPath);
    });

    console.log("Starting file upload...");
    const mp3FileStream = fs.createReadStream(outputPath);
    const uploadResult = await fileUploadService(mp3FileStream, {
      name: `${sanitizedTitle}.mp3`,
    });

    await fs.promises.unlink(outputPath).catch(console.error);

    return {
      success: true,
      data: uploadResult,
      videoDetails: {
        name: videoTitle,
      },
    };
  } catch (error) {
    console.error("Video conversion error:", {
      message: error.message,
      stack: error.stack,
      type: error.constructor.name,
    });
    return {
      success: false,
      error: error.message,
    };
  }
}
