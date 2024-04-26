export async function GET(req, {params}) {
    // const apiUrl = 'https://picsum.photos/id/12/500/500' // image url
    const apiUrl = `http://${API_HOST}/api/Media/${params.file}`
    // console.log(apiUrl, 'apii')
    const response = await fetch(apiUrl, {
        cache: 'no-cache'
        // next: { revalidate: 3600 }
    })

    return response


}