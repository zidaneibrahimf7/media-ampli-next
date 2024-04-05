import { headers } from 'next/headers'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const act = searchParams.get('act')
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  const deviceId = searchParams.get('deviceId')
  const status = searchParams.get('status')
  const statusActivity = searchParams.get('statusActivity')
  const search = searchParams.get('search')


  let path = ''

  switch (act) {
    case 'devices':
      path = "device/getDevices"
      break;
    case 'maintenances':
      path = "device/setMaintenance"
      break;
    default:
      path = ''
  }


  if (path) {
    const headerList = headers()
    let clientIp = headerList.get('x-forwarded-for').split(':')
    clientIp = clientIp[clientIp.length - 1];

    let body = {offset, limit}
    if(deviceId) body ={...body, deviceId}
    if(status) body = {...body, status}
    if(statusActivity) body = {...body, statusActivity}
    if(search) body = {...body, search}

    let params = JSON.stringify({
      "username": "admin",
      clientIp,
      params: body
    })

    // console.log(body, 'PARAMS')


    try {
      const response = await fetch('http://' + process.env.API_HOST_DEVICES + '/api/' + path, {
        method: 'POST',
        headers: new Headers({
          'Authorization': "Basic " + btoa(process.env.API_USERNAME_DEVICES + ':' + process.env.API_PASSWORD_DEVICES),
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
  } else {
    return new Response(JSON.stringify({ "code": -2, "content": null, "message": "Invalid URL" }))
  }
}

export async function POST(req) {
  const { searchParams } = new URL(req.url)
  const act = searchParams.get('act')

  let path = ''

  switch (act) {
    case 'devices':
      path = "device/getDevices"
      break;
    case 'maintenances':
      path = "device/setMaintenance"
      break;
    default:
      path = ''
  }

//    console.log(path, 'pathhs')

  if (path) {
    const headerList = headers()
    // console.log(headerList, 'headerss')
    let clientIp = headerList.get('x-forwarded-for').split(':')
    // console.log(clientIp, 'clientIp')
    clientIp = clientIp[clientIp.length - 1]
    let bodyReq = await req.json()
    // console.log(bodyReq, 'bodyreq')

    let params = {
      'username': 'admin',
      clientIp,
      params: bodyReq
    }

    // console.log(params, 'paramss')

    const response = await fetch('http://' + process.env.API_HOST_DEVICES + '/api/' + path, {
      method: 'POST',
      headers: new Headers({
        'Authorization': "Basic " + btoa(process.env.API_USERNAME_DEVICES + ':' + process.env.API_PASSWORD_DEVICES),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(params),
      mode: 'cors',
      cache: 'default'
    })

    // console.log(response)

    const data = await response.json()
    // console.log(data)

    return new Response(JSON.stringify(data))
  } else {
    return new Response(JSON.stringify({ 'code': -2, 'content': null, 'message': 'Invalid URL' }))
  }
}
