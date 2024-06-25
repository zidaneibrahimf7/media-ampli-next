
export async function GET(req, {params}) {
    // const session = await getServerSession(authOptions)
    // const { user : { username } } = session;
    // const { searchParams } = new URL(req.url);
    // console.log(params)

    // const apiUrl = 'https://picsum.photos/id/12/500/500' // image url
    const apiUrl = `http://${process.env.API_HOST}/api/Media/getProfilePicture/${params.file}`
    // console.log(apiUrl, 'apii')
    const response = await fetch(apiUrl, {
        next: { revalidate: 3600 }
    })

    // console.log('ress', response)

    return response

    // return new Response(response.body, {
    //     headers: {
    //         ...response,
    //         'content-disposition': `⁠inline; filename=${params.file}`,
    //     },
    // })

}