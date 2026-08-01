import { readdir } from "node:fs/promises";
import path from "node:path";

export async function GET() {
   try {
      const framesDir = path.join(process.cwd(), "public", "frames");
      const entries = await readdir(framesDir, { withFileTypes: true });

      const frames = entries
         .filter((entry) => entry.isFile())
         .map((entry) => entry.name)
         .filter((name) => /\.(jpg|jpeg|png|webp)$/i.test(name))
         .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
         .map((name) => `/frames/${name}`);

      return Response.json({ frames });
   } catch {
      return Response.json({ frames: [] }, { status: 500 });
   }
}
