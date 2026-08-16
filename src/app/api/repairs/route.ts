import { NextResponse } from "next/server";
import { db } from "@/db";
import { repairRequests } from "@/db/schema";
import { ensureSeeded } from "@/lib/products";

export const dynamic = "force-dynamic";

function generateProtocol() {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `OS-${random}`;
}

export async function POST(request: Request) {
  try {
    await ensureSeeded();
    const body = (await request.json()) as {
      customerName?: string;
      customerPhone?: string;
      deviceBrand?: string;
      deviceModel?: string;
      serviceType?: string;
      description?: string;
    };

    if (!body.customerName || !body.customerPhone || !body.deviceModel) {
      return NextResponse.json(
        { error: "Informe nome, telefone e modelo do aparelho." },
        { status: 400 },
      );
    }

    const [row] = await db
      .insert(repairRequests)
      .values({
        protocol: generateProtocol(),
        customerName: body.customerName.slice(0, 120),
        customerPhone: body.customerPhone.slice(0, 40),
        deviceBrand: (body.deviceBrand ?? "Outra").slice(0, 40),
        deviceModel: body.deviceModel.slice(0, 80),
        serviceType: (body.serviceType ?? "Diagnóstico geral").slice(0, 80),
        description: body.description ?? "",
      })
      .returning();

    return NextResponse.json({ protocol: row.protocol }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível enviar o orçamento." }, { status: 500 });
  }
}
