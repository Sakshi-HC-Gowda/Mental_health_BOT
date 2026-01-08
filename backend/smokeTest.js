const http = require('http');

function post(message, sessionId) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ message });
    const start = Date.now();
    const req = http.request({
      host: '127.0.0.1',
      port: 3000,
      path: '/api/v1/send',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User-Session-Id': sessionId }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ statusCode: res.statusCode, time: Date.now() - start, body }));
    });
    req.on('error', e => reject(e));
    req.write(data);
    req.end();
  });
}

(async () => {
  try {
    console.log('Running normal message test...');
    const r1 = await post('hello', 'smoke-1');
    console.log('Normal:', r1.statusCode, r1.time, r1.body);

    console.log('Running crisis message test...');
    const r2 = await post("I want to kill myself", 'smoke-2');
    console.log('Crisis:', r2.statusCode, r2.time, r2.body);

  } catch (err) {
    console.error('Smoke test failed:', err.message || err);
    process.exit(1);
  }
})();