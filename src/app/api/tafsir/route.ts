import { NextRequest, NextResponse } from "next/server";
import { TAFSIR_EDITIONS, fetchTafsir, getEdition } from "@/lib/data/tafsir";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const surah = parseInt(searchParams.get("surah") || "", 10);
  const ayah = parseInt(searchParams.get("ayah") || "", 10);
  const editionId = searchParams.get("edition") || "muyassar";
  const multi = searchParams.get("multi") === "1";

  if (!surah || !ayah || surah < 1 || surah > 114 || ayah < 1) {
    return NextResponse.json({ error: "رقم السورة والآية مطلوبان" }, { status: 400 });
  }

  if (multi) {
    // جلب عدة تفاسير بالتوازي (الأساسية السهلة أولاً)
    const preferred = ["muyassar", "saadi", "jalalayn", "mukhtasar", "ibn-kathir"];
    const results = await Promise.all(
      preferred.map(async (id) => {
        const ed = getEdition(id);
        if (!ed) return null;
        const data = await fetchTafsir(surah, ayah, ed);
        if (!data) return null;
        return { editionId: id, name: ed.name, author: ed.author, level: ed.level, ...data };
      })
    );
    return NextResponse.json({
      surah,
      ayah,
      tafsirs: results.filter(Boolean),
    });
  }

  const edition = getEdition(editionId) || TAFSIR_EDITIONS[0];
  const data = await fetchTafsir(surah, ayah, edition);
  if (!data) {
    return NextResponse.json({ error: "تعذر جلب التفسير" }, { status: 404 });
  }

  return NextResponse.json({
    surah,
    ayah,
    editionId: edition.id,
    name: edition.name,
    author: edition.author,
    ...data,
  });
}
