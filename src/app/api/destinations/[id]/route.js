import { NextResponse } from "next/server";
import {
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "@/lib/database";

export async function GET(request, { params }) {
  try {
    const destination = getDestinationById(params.id);

    if (!destination) {
      return NextResponse.json(
        {
          success: false,
          error: "目的地不存在",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: destination,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "获取目的地失败",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const updatedDestination = updateDestination(params.id, body);

    if (!updatedDestination) {
      return NextResponse.json(
        {
          success: false,
          error: "目的地不存在或更新失败",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedDestination,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "更新目的地失败",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const success = deleteDestination(params.id);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "目的地不存在或删除失败",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "目的地删除成功",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "删除目的地失败",
      },
      { status: 500 }
    );
  }
}
