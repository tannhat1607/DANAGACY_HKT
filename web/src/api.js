export async function api(path, body) {
  let response;
  try {
    response = await fetch(`/api${path}`, {
    method: body ? 'POST' : 'GET',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(45000),
    });
  } catch (error) {
    throw new Error(error.name === 'TimeoutError'
      ? 'Yêu cầu quá thời gian chờ. Vui lòng thử lại.'
      : 'Không kết nối được API. Hãy kiểm tra backend và kết nối mạng.');
  }
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Không kết nối đúng API. Hãy chạy FastAPI ở cổng 8080 và mở ứng dụng bằng Vite hoặc FastAPI.');
  }
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('API trả về dữ liệu không hợp lệ. Vui lòng thử lại.');
  }
  if (!response.ok) {
    throw new Error(typeof data.detail === 'string' ? data.detail : 'Không thể xử lý yêu cầu');
  }
  return data;
}
