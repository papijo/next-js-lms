import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  const isAuthorized = isTeacher(userId);

  if (!userId || !isAuthorized) throw new Error("Unauthorised");

  console.log("User ID: ", userId);

  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete((res) => {
      console.log(res);
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
