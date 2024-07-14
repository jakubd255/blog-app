import {SERVER_URL} from "@/constants/server"



export const imageUrl = (image: string | undefined) => {
    return image ? SERVER_URL+"/api/files/download/"+image : undefined; 
}
