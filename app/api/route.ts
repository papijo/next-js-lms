import { NextResponse } from "next/server";

export async function GET() {
  const appinfo: object = {
    "Application Name": "Aurora Learning Management System",
    "Application Owner": "Ebhota Aurora",
    "Application Version": "1.0.0",
    "Application Engineer": "Ebhota Jonathan",
  };

  return NextResponse.json(appinfo, { status: 200 });
}
