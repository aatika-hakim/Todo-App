import { baseUrl } from "@/src/data/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const { id } = params;
  const url = baseUrl();

  const res = await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  console.log("Delete", res.status, res.statusText);

  revalidatePath("/");
  revalidateTag("todos");

  return NextResponse.json(res);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { id: todo_id } = params;
  const body = await req.json();
  console.log("BODY: ", body);

  const url = baseUrl();

  const data = {
    content: body.content,
  };

  const res = await fetch(`${url}/todos/${todo_id}`, {
    // Include todo_id in URL
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  console.log("Got a PUT request status:", res.status, res.statusText); // Update message

  return NextResponse.json(res);
}