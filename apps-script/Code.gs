const SHEET_NAMES = {
  WORK_ORDERS: 'WorkOrders',
  LEGACY_WORK_ORDER: 'WorkOrder',
  USERS: 'Users'
};

const WORK_ORDER_HEADERS = [
  'ticketNo',
  'dateTime',
  'hotel',
  'room',
  'category',
  'detail',
  'priority',
  'status',
  'technician',
  'closeDate',
  'openedBy',
  'lastEditedBy',
  'closedBy'
];

const USER_HEADERS = [
  'username',
  'displayName',
  'passwordHash',
  'role',
  'active',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy'
];

function doGet(e) {
  try {
    const action = getAction_(e && e.parameter, 'list');

    switch (action) {
      case 'list':
        return jsonOutput_(listWorkOrders_());
      case 'listByHotel':
        return jsonOutput_({ ok: true, data: listWorkOrdersByHotel_(e.parameter.hotel) });
      case 'listIncompleteByHotel':
        return jsonOutput_({ ok: true, data: listIncompleteWorkOrdersByHotel_(e.parameter.hotel) });
      case 'getJobByTicket':
        return jsonOutput_({ ok: true, job: getJobByTicket_(e.parameter.ticketNo) });
      case 'health':
        return jsonOutput_({ ok: true, message: 'ok' });
      case 'listUsers':
        return jsonOutput_({ ok: true, users: listUsers_() });
      case 'getUserProfile':
        return jsonOutput_({ ok: true, user: getUserProfile_(e.parameter.username) });
      default:
        return jsonOutput_({ ok: false, message: 'Unknown action: ' + action });
    }
  } catch (error) {
    return jsonOutput_({
      ok: false,
      message: error.message || 'Unexpected error'
    });
  }
}

function doPost(e) {
  try {
    const payload = parseBody_(e);
    const action = getAction_(payload, 'saveWorkOrder');

    switch (action) {
      case 'saveWorkOrder':
        return jsonOutput_({ ok: true, job: saveWorkOrder_(payload) });
      case 'login':
        return jsonOutput_({ ok: true, user: login_(payload.username, payload.password) });
      case 'createUser':
        return jsonOutput_({
          ok: true,
          user: createUser_(payload)
        });
      case 'toggleUser':
        return jsonOutput_({
          ok: true,
          user: toggleUser_(payload.username, payload.active, payload.updatedBy)
        });
      case 'deleteUser':
        return jsonOutput_({
          ok: true,
          deleted: true,
          username: deleteUser_(payload.username)
        });
      default:
        return jsonOutput_({ ok: false, message: 'Unknown action: ' + action });
    }
  } catch (error) {
    return jsonOutput_({
      ok: false,
      message: error.message || 'Unexpected error'
    });
  }
}

function setupMaintenanceSheets() {
  getSheet_(SHEET_NAMES.WORK_ORDERS, WORK_ORDER_HEADERS);
  getSheet_(SHEET_NAMES.USERS, USER_HEADERS);
}

function migrateLegacyWorkOrders() {
  const legacySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.LEGACY_WORK_ORDER);
  if (!legacySheet) {
    return { migrated: 0, message: 'ไม่พบชีต WorkOrder เดิม' };
  }

  const targetSheet = getSheet_(SHEET_NAMES.WORK_ORDERS, WORK_ORDER_HEADERS);
  const existing = {};

  readObjects_(targetSheet).forEach(function(record) {
    existing[String(record.ticketNo || '')] = true;
  });

  const legacyRows = readObjects_(legacySheet);
  let migrated = 0;

  legacyRows.forEach(function(record) {
    const normalized = normalizeLegacyWorkOrder_(record);
    const ticketNo = String(normalized.ticketNo || '');

    if (!ticketNo || existing[ticketNo]) {
      return;
    }

    appendObject_(targetSheet, WORK_ORDER_HEADERS, normalized);
    existing[ticketNo] = true;
    migrated += 1;
  });

  return {
    migrated: migrated,
    message: migrated ? 'ย้ายข้อมูลจาก WorkOrder ไป WorkOrders แล้ว' : 'ไม่มีข้อมูลใหม่ให้ย้าย'
  };
}

function seedDefaultUsers() {
  const defaults = [
    {
      username: 'admin',
      displayName: 'หัวหน้าช่าง',
      password: '1234',
      role: 'supervisor',
      createdBy: 'system'
    },
    {
      username: 'somchai',
      displayName: 'สมชาย ใจดี',
      password: '1234',
      role: 'employee',
      createdBy: 'system'
    },
    {
      username: 'wichai',
      displayName: 'วิชัย ช่างแอร์',
      password: '1234',
      role: 'employee',
      createdBy: 'system'
    }
  ];

  defaults.forEach(function(user) {
    if (!findUserRow_(user.username)) {
      createUser_(user);
    }
  });
}

function listWorkOrders_() {
  const primarySheet = getSheet_(SHEET_NAMES.WORK_ORDERS, WORK_ORDER_HEADERS);
  const jobs = [];
  const merged = {};

  readObjects_(primarySheet).forEach(function(record) {
    const normalized = normalizeWorkOrderRecord_(record);
    const key = getWorkOrderKey_(normalized);
    if (!merged[key]) {
      merged[key] = true;
      jobs.push(normalized);
    }
  });

  const legacySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.LEGACY_WORK_ORDER);
  if (legacySheet) {
    readObjects_(legacySheet).forEach(function(record) {
      const normalized = normalizeLegacyWorkOrder_(record);
      const key = getWorkOrderKey_(normalized);
      if (!merged[key]) {
        merged[key] = true;
        jobs.push(normalized);
      }
    });
  }

  return jobs;
}

function saveWorkOrder_(payload) {
  const sheet = getSheet_(SHEET_NAMES.WORK_ORDERS, WORK_ORDER_HEADERS);
  const now = new Date().toISOString();
  const record = normalizeWorkOrderRecord_({
    ticketNo: normalizeString_(payload.ticketNo) || ('MT' + new Date().getTime()),
    dateTime: normalizeString_(payload.dateTime) || now,
    hotel: normalizeString_(payload.hotel),
    room: normalizeString_(payload.room),
    category: normalizeString_(payload.category),
    detail: normalizeString_(payload.detail),
    priority: normalizeString_(payload.priority) || 'Medium',
    status: normalizeString_(payload.status),
    technician: normalizeString_(payload.technician),
    closeDate: normalizeString_(payload.closeDate),
    openedBy: normalizeString_(payload.openedBy),
    lastEditedBy: normalizeString_(payload.lastEditedBy),
    closedBy: normalizeString_(payload.closedBy)
  });

  if (record.status === 'เสร็จสิ้น' && !record.closeDate) {
    record.closeDate = now;
  }

  const rowInfo = findRowByValue_(sheet, 1, record.ticketNo);
  if (rowInfo) {
    writeObjectAtRow_(sheet, rowInfo.rowIndex, WORK_ORDER_HEADERS, record);
  } else {
    appendObject_(sheet, WORK_ORDER_HEADERS, record);
  }

  return record;
}

function listWorkOrdersByHotel_(hotel) {
  const normalizedHotel = normalizeString_(hotel);
  if (!normalizedHotel) {
    return listWorkOrders_();
  }

  return listWorkOrders_().filter(function(record) {
    return normalizeString_(record.hotel) === normalizedHotel;
  });
}

function listIncompleteWorkOrdersByHotel_(hotel) {
  return listWorkOrdersByHotel_(hotel).filter(function(record) {
    return isIncompleteStatus_(record.status);
  });
}

function getJobByTicket_(ticketNo) {
  const normalizedTicketNo = normalizeString_(ticketNo);
  if (!normalizedTicketNo) {
    throw new Error('กรุณาระบุเลขที่งาน');
  }

  const jobs = listWorkOrders_();
  for (var i = 0; i < jobs.length; i += 1) {
    if (normalizeString_(jobs[i].ticketNo) === normalizedTicketNo) {
      return jobs[i];
    }
  }

  throw new Error('ไม่พบเลขที่งานนี้');
}

function listUsers_() {
  const sheet = getSheet_(SHEET_NAMES.USERS, USER_HEADERS);
  return readObjects_(sheet).map(toPublicUser_);
}

function getUserProfile_(username) {
  const row = findUserRow_(username);
  if (!row) {
    throw new Error('ไม่พบบัญชีผู้ใช้');
  }

  const user = toPublicUser_(row.record);
  if (!user.active) {
    throw new Error('บัญชีนี้ถูกปิดใช้งาน');
  }

  return user;
}

function login_(username, password) {
  const row = findUserRow_(username);
  if (!row) {
    throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  }

  const record = row.record;
  if (!toBoolean_(record.active, true)) {
    throw new Error('บัญชีนี้ถูกปิดใช้งาน');
  }

  const passwordHash = hashPassword_(password);
  if (passwordHash !== record.passwordHash) {
    throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  }

  return toPublicUser_(record);
}

function createUser_(payload) {
  const username = normalizeUsername_(payload.username);
  const displayName = normalizeString_(payload.displayName);
  const password = normalizeString_(payload.password);
  const role = normalizeRole_(payload.role);
  const createdBy = normalizeString_(payload.createdBy) || 'system';

  if (!username || !displayName || !password) {
    throw new Error('กรุณากรอกข้อมูลผู้ใช้ให้ครบถ้วน');
  }

  if (findUserRow_(username)) {
    throw new Error('ชื่อผู้ใช้นี้มีในระบบแล้ว');
  }

  const now = new Date().toISOString();
  const record = {
    username: username,
    displayName: displayName,
    passwordHash: hashPassword_(password),
    role: role,
    active: true,
    createdAt: now,
    updatedAt: now,
    createdBy: createdBy,
    updatedBy: createdBy
  };

  const sheet = getSheet_(SHEET_NAMES.USERS, USER_HEADERS);
  appendObject_(sheet, USER_HEADERS, record);
  return toPublicUser_(record);
}

function toggleUser_(username, active, updatedBy) {
  const row = findUserRow_(username);
  if (!row) {
    throw new Error('ไม่พบบัญชีผู้ใช้');
  }

  row.record.active = toBoolean_(active, true);
  row.record.updatedAt = new Date().toISOString();
  row.record.updatedBy = normalizeString_(updatedBy) || 'system';
  writeObjectAtRow_(row.sheet, row.rowIndex, USER_HEADERS, row.record);
  return toPublicUser_(row.record);
}

function deleteUser_(username) {
  const row = findUserRow_(username);
  if (!row) {
    throw new Error('ไม่พบบัญชีผู้ใช้');
  }

  row.sheet.deleteRow(row.rowIndex);
  return row.record.username;
}

function findUserRow_(username) {
  const normalized = normalizeUsername_(username);
  if (!normalized) {
    return null;
  }

  const sheet = getSheet_(SHEET_NAMES.USERS, USER_HEADERS);
  const rows = readObjects_(sheet);
  for (var i = 0; i < rows.length; i += 1) {
    if (normalizeUsername_(rows[i].username) === normalized) {
      return {
        sheet: sheet,
        rowIndex: i + 2,
        record: rows[i]
      };
    }
  }

  return null;
}

function getSheet_(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  ensureHeaders_(sheet, headers);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  const existing = sheet.getLastColumn() > 0
    ? sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0]
    : [];

  const needsUpdate = headers.some(function(header, index) {
    return existing[index] !== header;
  });

  if (needsUpdate) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function readObjects_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow < 2 || lastColumn < 1) {
    return [];
  }

  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();

  return values.map(function(row) {
    const record = {};
    headers.forEach(function(header, index) {
      record[header] = row[index];
    });
    return record;
  });
}

function appendObject_(sheet, headers, record) {
  const row = headers.map(function(header) {
    return record[header] !== undefined ? record[header] : '';
  });
  sheet.appendRow(row);
}

function writeObjectAtRow_(sheet, rowIndex, headers, record) {
  const row = headers.map(function(header) {
    return record[header] !== undefined ? record[header] : '';
  });
  sheet.getRange(rowIndex, 1, 1, headers.length).setValues([row]);
}

function findRowByValue_(sheet, columnIndex, value) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return null;
  }

  const values = sheet.getRange(2, columnIndex, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i += 1) {
    if (String(values[i][0]) === String(value)) {
      return {
        rowIndex: i + 2
      };
    }
  }

  return null;
}

function normalizeUsername_(value) {
  return normalizeString_(value).toLowerCase();
}

function normalizeString_(value) {
  return value === undefined || value === null ? '' : String(value).trim();
}

function normalizeRole_(value) {
  return value === 'supervisor' ? 'supervisor' : 'employee';
}

function isIncompleteStatus_(status) {
  var normalized = normalizeString_(status);
  return normalized === 'รอดำเนินการ'
    || normalized === 'กำลังดำเนินการ'
    || normalized === 'ยังไม่เสร็จ';
}

function normalizeWorkOrderRecord_(record) {
  return {
    ticketNo: normalizeString_(record.ticketNo),
    dateTime: normalizeDateValue_(record.dateTime),
    hotel: normalizeString_(record.hotel),
    room: normalizeString_(record.room),
    category: normalizeString_(record.category),
    detail: normalizeString_(record.detail),
    priority: normalizeString_(record.priority) || 'Medium',
    status: normalizeString_(record.status),
    technician: normalizeString_(record.technician),
    closeDate: normalizeDateValue_(record.closeDate),
    openedBy: normalizeString_(record.openedBy),
    lastEditedBy: normalizeString_(record.lastEditedBy),
    closedBy: normalizeString_(record.closedBy)
  };
}

function normalizeLegacyWorkOrder_(record) {
  return normalizeWorkOrderRecord_({
    ticketNo: record.ticketNo,
    dateTime: record.dateTime,
    hotel: record.hotel,
    room: record.room,
    category: record.category,
    detail: record.detail,
    priority: record.priority,
    status: record.status,
    technician: record.technician,
    closeDate: record.closeDate,
    openedBy: record.openedBy,
    lastEditedBy: record.lastEditedBy,
    closedBy: record.closedBy
  });
}

function getWorkOrderKey_(record) {
  const ticketNo = normalizeString_(record.ticketNo);
  if (ticketNo) {
    return ticketNo;
  }

  return [
    normalizeString_(record.hotel),
    normalizeString_(record.room),
    normalizeDateValue_(record.dateTime)
  ].join('|');
}

function toBoolean_(value, fallback) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value !== 0;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['false', '0', 'inactive', 'disabled', 'no'].indexOf(normalized) >= 0) {
      return false;
    }
    if (['true', '1', 'active', 'enabled', 'yes'].indexOf(normalized) >= 0) {
      return true;
    }
  }

  return fallback;
}

function toPublicUser_(record) {
  return {
    username: normalizeUsername_(record.username),
    displayName: normalizeString_(record.displayName),
    role: normalizeRole_(record.role),
    active: toBoolean_(record.active, true)
  };
}

function hashPassword_(password) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    normalizeString_(password),
    Utilities.Charset.UTF_8
  );

  return bytes.map(function(byte) {
    const value = byte < 0 ? byte + 256 : byte;
    return ('0' + value.toString(16)).slice(-2);
  }).join('');
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  return JSON.parse(e.postData.contents);
}

function getAction_(source, fallbackAction) {
  const action = source && source.action ? String(source.action).trim() : '';
  return action || fallbackAction;
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalizeDateValue_(value) {
  if (!value) {
    return '';
  }

  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return value.toISOString();
  }

  return normalizeString_(value);
}
