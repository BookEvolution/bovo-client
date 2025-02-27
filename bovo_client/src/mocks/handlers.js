import { http } from 'msw'
import dummyData from './dummy.json'

export const handlers = [
  http.get('/api/data', () => {
    return new Response(
      JSON.stringify(dummyData),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }),
  
  http.get('/archive', () => {
    return new Response(
      JSON.stringify(dummyData),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }),
  
  // POST 요청 예시
  http.post('/api/submit', async ({ request }) => {
    const data = await request.json()
    
    return new Response(
      JSON.stringify({
        success: true,
        message: '데이터가 성공적으로 전송되었습니다.',
        receivedData: data
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  })
]