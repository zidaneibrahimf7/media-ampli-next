export const getMedia = async (fileName) => {
    console.log(fileName, 'filee')
    // let response = await fetch('/api/Account?act=media-profile&filename=' + fileName)
    // let response = await fetch('/api/Media?act=profile-picture&filename=' + fileName)
    // let response = await fetch('http://' + process.env.API_HOST + '/api/Media/getProfilePicture/' + fileName)
    let response = await fetch('/api/Media/getProfilePicture?filename=' + fileName)
    // console.log(response, 'responseee')
    const dataMedia = await response?.json()
    console.log(dataMedia, 'medsss')
}

export default async function getMediaPhotoProfile(data) {
    for await(let [index, value] of data.entries()) {
        console.log(value, index)
        // console.log(value.profilePicture, index)
        // value.photoProfile = await getMedia(value.profilePicture)
        await getMedia(value.profilePicture)
    }
    return data

}