const pathRequest = (request: any) => {
  const path = request.req.headers.requestpath
  return path
}
export default pathRequest
