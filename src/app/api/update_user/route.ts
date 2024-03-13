import useSWR, { mutate } from 'swr';
import { User } from '@/app/lib/schemas/user';


export async function PUT(id: number, data: User) {
    try {
     console.log("PUT REQUEST")

      return Response.json({ message: "successful !" }, { status: 200 });
      } catch (error) {
        console.error(error);
    
        return Response.json({ error: "Internal server error" }, { status: 500 });
      }


}