async function runTests() {
  console.log('====================================================');
  console.log('   RUNNING COMPREHENSIVE BACKEND VERIFICATION TEST  ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Health Check
  try {
    const res = await fetch('http://localhost:3000/api/health');
    const json = await res.json();
    assert(
      res.status === 200 && json.status === 'healthy' && json.database === 'connected',
      `Health endpoint returns 200 and healthy DB connection: ${JSON.stringify(json)}`
    );
  } catch (err) {
    assert(false, `Health endpoint failed: ${err.message}`);
  }

  // 2. Lead Form Validation: Invalid phone & empty name
  try {
    const res = await fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.101',
      },
      body: JSON.stringify({
        name: 'A', // Too short (min 2)
        phone: '12345', // Invalid phone
        type: 'BUYER',
      }),
    });
    const json = await res.json();
    assert(res.status === 400 && !!json.error, `Validation rejects invalid lead: Status ${res.status} (${json.error})`);
  } catch (err) {
    assert(false, `Validation test failed: ${err.message}`);
  }

  // 3. Lead Form: Spam Honeypot Protection
  try {
    const res = await fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.102',
      },
      body: JSON.stringify({
        name: 'Bot Spammer',
        phone: '9839012345',
        type: 'BUYER',
        hp: 'http://spam-link.ru', // honeypot filled
      }),
    });
    const json = await res.json();
    assert(
      res.status === 200 && json.id === 'filtered',
      `Honeypot intercepts bot submission silently: Status ${res.status}, ID: ${json.id}`
    );
  } catch (err) {
    assert(false, `Honeypot test failed: ${err.message}`);
  }

  // 4. Lead Form: Valid Submission
  let validLeadId = null;
  try {
    const res = await fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.103',
      },
      body: JSON.stringify({
        name: 'Deepak Agrawal',
        phone: '9839012345',
        email: 'deepak.kanpur@example.com',
        type: 'BUYER',
        service: 'Turnkey Interior',
        propertyType: '4+ BHK / Penthouse',
        location: 'Khalasi Line, Swaroop Nagar',
        budgetRange: '₹30 Lakhs+',
        message: 'Looking for turnkey interior design for new penthouse near KVM Inter College.',
        language: 'en',
      }),
    });
    const json = await res.json();
    validLeadId = json?.id;
    assert(
      res.status === 201 && json?.ok === true && !!validLeadId,
      `Valid lead created in SQLite DB with ID: ${validLeadId}`
    );
  } catch (err) {
    assert(false, `Valid lead creation failed: ${err.message}`);
  }

  // 5. Rate Limit Protection (5 submissions per 10 min from same IP)
  try {
    const testIp = '192.168.1.200';
    let rateLimited = false;
    for (let i = 0; i < 7; i++) {
      const res = await fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': testIp,
        },
        body: JSON.stringify({
          name: 'Rate Limit Test',
          phone: '9839012345',
          type: 'BUYER',
        }),
      });
      if (res.status === 429) {
        rateLimited = true;
        break;
      }
    }
    assert(rateLimited, 'In-memory LRU IP rate limiter actively blocks excess requests with 429');
  } catch (err) {
    assert(false, `Rate limiter test failed: ${err.message}`);
  }

  // 6. Admin Authentication & Signed Cookie
  let sessionCookie = null;
  try {
    const res = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@dreamproperties.in',
        password: 'admin123',
      }),
    });

    const json = await res.json();
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      sessionCookie = setCookie.split(';')[0];
    }

    assert(
      res.status === 200 && json?.ok === true && !!sessionCookie,
      `Admin logged in successfully, session JWT cookie issued: ${sessionCookie?.substring(0, 30)}...`
    );
  } catch (err) {
    assert(false, `Admin login failed: ${err.message}`);
  }

  // 7. Protected Admin Leads List
  try {
    const res = await fetch('http://localhost:3000/api/leads', {
      method: 'GET',
      headers: {
        Cookie: sessionCookie || '',
      },
    });

    const json = await res.json();
    assert(
      res.status === 200 && Array.isArray(json?.leads) && json.leads.length > 0,
      `Admin API returned ${json?.leads?.length} leads under authentication`
    );
  } catch (err) {
    assert(false, `Admin leads list failed: ${err.message}`);
  }

  // 8. Lead Status Update via PATCH
  if (validLeadId && sessionCookie) {
    try {
      const res = await fetch(`http://localhost:3000/api/leads/${validLeadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: sessionCookie,
        },
        body: JSON.stringify({
          status: 'CONTACTED',
          notes: 'Called client via WhatsApp. Scheduled site visit for tomorrow 4 PM.',
        }),
      });

      const json = await res.json();
      assert(
        res.status === 200 && json?.lead?.status === 'CONTACTED',
        `Lead status updated to CONTACTED with custom notes: ${json?.lead?.notes}`
      );
    } catch (err) {
      assert(false, `Lead PATCH update failed: ${err.message}`);
    }
  }

  // 9. Admin CSV Export
  try {
    const res = await fetch('http://localhost:3000/api/leads/export', {
      method: 'GET',
      headers: {
        Cookie: sessionCookie || '',
      },
    });

    const text = await res.text();
    assert(
      res.status === 200 &&
        res.headers.get('content-type')?.includes('text/csv') &&
        text.includes('Lead ID') &&
        text.includes('Deepak Agrawal'),
      `CSV export generated successfully with headers and lead records (${text.length} bytes)`
    );
  } catch (err) {
    assert(false, `CSV export test failed: ${err.message}`);
  }

  // 10. Admin Logout & Unauthenticated Protection Check
  try {
    const res = await fetch('http://localhost:3000/api/admin/logout', {
      method: 'POST',
      headers: {
        Cookie: sessionCookie || '',
      },
    });

    assert(res.status === 200, 'Admin logout endpoint cleared session');

    // Confirm that accessing /api/leads without cookie is now rejected with 401
    const unauthRes = await fetch('http://localhost:3000/api/leads', {
      method: 'GET',
    });

    assert(
      unauthRes.status === 401,
      `Unauthenticated access to /api/leads is strictly blocked: HTTP ${unauthRes.status}`
    );
  } catch (err) {
    assert(false, `Logout and protection test failed: ${err.message}`);
  }

  console.log('\n====================================================');
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
