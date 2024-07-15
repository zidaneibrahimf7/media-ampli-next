import { headers } from "next/headers";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const act = searchParams.get('act')
    const ip = searchParams.get('ip')
    const port = searchParams.get('port')
    const deviceId = searchParams.get('deviceId')

    let path = ''

    switch(act) {
        case 'getMonitoring':
            path = 'Connect/getUrlMonitoring'
            break;
        case 'disconnectMonitoring':
            path = 'Connect/disconnectMonitoring'
            break;
        default:
            path = ''
    }

    if(path) {
        const headerList = headers()
        let clientIp = headerList.get('x-forwarded-for').split(':')
        clientIp = clientIp[clientIp.length - 1];

        let body = {ip, port, deviceId}

        let params = JSON.stringify({
            "username": "admin",
            clientIp,
            params: body
          })

        try {
        const response = await fetch('http://' + process.env.API_HOST_MONITORING+ '/api/' + path, {
            method: 'POST',
            headers: new Headers({
                'Authorization': "Basic " + btoa(process.env.API_USERNAME_MONITORING + ':' + process.env.API_PASSWORD_MONITORING),
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
        case 'getMonitoring':
            path = 'Connect/getUrlMonitoring'
            break;
        case 'disconnectMonitoring':
            path = 'Connect/disconnectMonitoring'
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
        'username': "sample-docs",
        clientIp,
        params: bodyReq
      }
  
      // console.log(params, 'paramss')
  
      const response = await fetch('http://' + process.env.API_HOST_MONITORING + '/api/' + path, {
        method: 'POST',
        headers: new Headers({
          // 'Authorization': "Basic " + btoa(process.env.API_USERNAME_MONITORING + ':' + process.env.API_PASSWORD_MONITORING),
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
  