import { NextResponse } from "next/server";
import { getAllDestinations, createDestination } from "@/lib/db";

export async function GET() {
  try {
    const destinations = getAllDestinations();
    return NextResponse.json({
      success: true,
      data: destinations,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "获取目的地列表失败",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newDestination = createDestination(body);

    if (!newDestination) {
      return NextResponse.json(
        {
          success: false,
          error: "创建目的地失败",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: newDestination,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "创建目的地失败，请检查数据格式",
      },
      { status: 500 }
    );
  }
}
