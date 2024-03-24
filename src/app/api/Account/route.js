import { headers } from 'next/headers'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const act = searchParams.get('act')
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  const search = searchParams.get('search')
  const platform = searchParams.get('platform')
  const status = searchParams.get('status')
  const statusActive = searchParams.get('statusActive')
  const accountId = searchParams.get('accountId')
  const ignoreSlot = searchParams.get('ignoreSlot')
  const ignoreCluster = searchParams.get('ignoreCluster')


  let path = ''

  switch (act) {
    case 'account':
      path = "Account/getAccounts"
      break;
    case 'list':
      path = "Account/getAccountList"
      break;
    default:
      path = ''
  }


  if (path) {
    const headerList = headers()
    let clientIp = headerList.get('x-forwarded-for').split(':')
    clientIp = clientIp[clientIp.length - 1];

    let body = { offset, limit, search: ''}
    if(ignoreSlot) body = {...body, ignoreSlot}
    if(ignoreCluster) body = {...body, ignoreCluster}
    if(status) body = {...body, status}
    if(statusActive) body = {...body, statusActive}
    if(platform) body = {...body, platform}


    let params = JSON.stringify({
      "username": "admin",
      clientIp,
      params: body
    })

    // console.log(params, 'PARAMS')


    try {
      const response = await fetch('http://' + process.env.API_HOST + '/api/' + path, {
        method: 'POST',
        headers: new Headers({
          'Authorization': "Basic " + btoa(process.env.API_USERNAME + ':' + process.env.API_PASSWORD),
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
    case 'account':
      path = "Account/getAccounts"
      break;
    case 'account-summary':
      path = "Account/getAccountSummary"
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
    // clientIp = clientIp[clientIp.length - 1]
    let bodyReq = await req.json()
    // console.log(bodyReq, 'bodyreq')

    let params = {
      'username': 'admin',
      clientIp,
      params: bodyReq
    }

    // console.log(params, 'paramss')

    const response = await fetch('http://' + process.env.API_HOST + '/api/' + path, {
      method: 'POST',
      headers: new Headers({
        'Authorization': "Basic " + btoa(process.env.API_USERNAME + ':' + process.env.API_PASSWORD),
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
