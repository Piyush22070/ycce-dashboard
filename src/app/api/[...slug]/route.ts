export async function GET(req: Request, { params }: { params: { slug: string[] } }) {
    return Response.json({ slug: params.slug }, { status: 200 });
  }
  