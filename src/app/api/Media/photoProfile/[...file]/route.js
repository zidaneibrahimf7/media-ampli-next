import { headers } from 'next/headers'

export default async function GET(req, {params}) {
    // const url = `http://${API_HOST}/api/Media/getProfilePicture/${params.file}`
    const url = 'https://picsum.photos/id/12/500/500' // image url

    const response = await fetch(url, {
        // next: { revalidate: 3600 }
        // method: 'GET',
        // headers: new Headers({
        //     'Authorization': "Basic " + btoa(process.env.API_HOST+ ':' + process.env.API_HOST),
        //     'Content-Type': 'application/json'
        //   }),
        // //   body: params,
        //   mode: 'cors',
          cache: 'no-cache'
    })

    return response
}