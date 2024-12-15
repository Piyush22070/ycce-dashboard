
import {data} from './data'

// this is rendering my demo data

export async function GET(req: Request) {
    return Response.json(data, { status: 200 });
}
  
  export async function POST(req: Request) {
    const body = await req.json();
    return Response.json({ message: "Data received", data: body }, { status: 201 });
  }
  