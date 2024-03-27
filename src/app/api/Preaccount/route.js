import { headers } from "next/headers";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const act = searchParams.get('act')
    const offset = searchParams.get('offset')
    const limit = searchParams.get('limit')

    let path = ''

    switch(act) {
        case 'getPreaccount':
            path = 'preaccount/getPreaccount'
            break;
        case 'createPreaccount':
            path = 'preaccount/createPreaccount'
            break;
        case 'updatePreaccount':
            path = 'preaccount/updatePreaccount'
            break;
        default:
            path = ''
    }

    if(path) {
        const headerList = headers()
        let clientIp = headerList.get('x-forwarded-for').split(':')
        clientIp = clientIp[clientIp.length - 1];

        let body = {offset, limit}

        let params = JSON.stringify({
            "username": "admin",
            clientIp,
            params: body
          })

        try {
        const response = await fetch('http://' + process.env.API_HOST_PREACCOUNT+ '/api/' + path, {
            method: 'POST',
            headers: new Headers({
                'Authorization': "Basic " + btoa(process.env.API_USERNAME_PREACCOUNT + ':' + process.env.API_PASSWORD_PREACCOUNT),
                'Content-Type': 'application/json'
            }),
            body: params,
            mode: 'cors',
            cache: 'default'
            })
      
            const list = await response.json()
      
            return new Response(JSON.stringify(list))
          } catch (error) {
            return new Response(JSON.stringify({ object: 'error ini' }))
          }

    }  else {
        return new Response(JSON.stringify({ "code": -2, "content": null, "message": "Invalid URL" }))
      }

}

export async function POST(req) {
    const { searchParams } = new URL(req.url)
    const act = searchParams.get('act')
  
    let path = ''
  
    switch(act) {
        case 'getPreaccount':
            path = 'preaccount/getPreaccount'
            break;
        case 'createPreaccount':
            path = 'preaccount/createPreaccount'
            break;
        case 'deletePreaccount':
            path = 'preaccount/deletePreaccount'
            break;
        default:
            path = ''
    }
  
    //  console.log(path, 'pathhs')
  
    if (path) {
      const headerList = headers()
      let clientIp = headerList.get('x-forwarded-for').split(':')
      clientIp = clientIp[clientIp.length - 1]
      let bodyReq = await req.json()
  
      let params = {
        'username': null,
        clientIp,
        params: bodyReq
      }
  
      // console.log(params, 'paramss')
  
      const response = await fetch('http://' + process.env.API_HOST_PREACCOUNT + '/api/' + path, {
        method: 'POST',
        headers: new Headers({
          'Authorization': "Basic " + btoa(process.env.API_USERNAME_PREACCOUNT + ':' + process.env.API_PASSWORD_PREACCOUNT),
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(params),
        mode: 'cors',
        cache: 'default'
      })
  
    //   console.log(response)
  
      const data = await response.json()
    //   console.log(data)
  
      return new Response(JSON.stringify(data))
    } else {
      return new Response(JSON.stringify({ 'code': -2, 'content': null, 'message': 'Invalid URL' }))
    }
  }
  