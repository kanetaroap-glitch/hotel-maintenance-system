const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzObs4dlf6NzR-410iJux2KobjhB88TolSQ7icN4GGSWP5ZolNDWRAU4LbOYMMkWvbh/exec";

const SESSION_STORAGE_KEY = "maintenance-session";
const ROLES = {
    EMPLOYEE: "employee",
    SUPERVISOR: "supervisor"
};

const hotels = [
    "Mercure Bangkok Surawong",
    "ibis Styles Bangkok Silom"
];

const mercureRooms = [
    "801", "802", "803", "804", "805", "806", "807", "808", "809", "810", "811", "812", "813", "814", "815", "816", "817", "818", "819", "820", "821",
    "901", "902", "903", "904", "905", "906", "907", "908", "909", "910", "911", "912", "913", "914", "915", "916", "917", "918", "919", "920", "921", "922",
    "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1022",
    "1101", "1102", "1103", "1104", "1105", "1106", "1107", "1108", "1109", "1110", "1111", "1112", "1113", "1114", "1115", "1116", "1117", "1118", "1119", "1120", "1121", "1122",
    "1201", "1202", "1203", "1204", "1205", "1206", "1207", "1208", "1209", "1210", "1211", "1212", "1213", "1214", "1215", "1216", "1217", "1218", "1219", "1220", "1221", "1222",
    "1401", "1402", "1403", "1404", "1405", "1406", "1407", "1408", "1409", "1410", "1411", "1412", "1413", "1414", "1415", "1416", "1417", "1418", "1419", "1420", "1421", "1422",
    "1501", "1502", "1503", "1504", "1505", "1506", "1507", "1508", "1509", "1510", "1511", "1512", "1513", "1514", "1515", "1516", "1517", "1518", "1519",
    "1601", "1602", "1603", "1604", "1605", "1606", "1607", "1608", "1609", "1610", "1611", "1612", "1613", "1614", "1615", "1616", "1617",
    "1701", "1702", "1703", "1704", "1705", "1706", "1707", "1708", "1709", "1710", "1711", "1712", "1713", "1714", "1715",
    "1801", "1802", "1803", "1804", "1805", "1806", "1807", "1808", "1809", "1810", "1811", "1812", "1813",
    "1901", "1902", "1903", "1904", "1905", "1906", "1907", "1908", "1909", "1910", "1911", "1912",
    "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"
];

const mercureExtraLocations = [
    "Corridor F.8", "Corridor F.9", "Corridor F.10", "Corridor F.11", "Corridor F.12",
    "Corridor F.13", "Corridor F.14", "Corridor F.15", "Corridor F.16", "Corridor F.17",
    "Corridor F.18", "Corridor F.19", "Corridor F.20", "Lobby", "Back Office", "Kitchen",
    "Canteen", "YHB", "VIP1", "VIP2", "Starlight", "Other"
];

const ibisRooms = [
    "101", "102", "103", "104", "105", "106", "107", "108",
    "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234",
    "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "329", "330", "331", "332", "333", "334", "335", "336", "338",
    "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "423", "424", "425", "426", "427", "428", "429", "430", "432", "433", "434", "435", "436", "438",
    "501", "502", "503", "504", "505", "506", "507", "508", "509", "510", "511", "512", "513", "514", "515", "516", "517", "518", "519", "520", "521", "522", "523", "524", "525", "526", "527", "528", "529", "530", "531", "532", "533", "534", "535", "536", "538",
    "601", "602", "603", "604", "605", "606", "607", "608", "609", "610", "611", "612", "613", "614", "615", "616", "617", "618", "619", "620", "621", "622", "623", "624", "625", "626", "627", "628", "629", "630", "631", "632", "633", "634", "635", "636", "638",
    "701", "702", "703", "704", "705", "706", "707", "708", "709", "710", "711", "712", "713", "714", "715", "716", "717", "718", "719", "720", "721", "722", "723", "724", "725", "726", "727", "728", "729", "730", "731", "732", "733", "734", "735", "736", "738",
    "801", "802", "803", "804", "805", "806", "807", "808", "809", "810", "811", "812", "813", "814", "815", "816", "817", "818", "819", "820", "821", "822", "823", "824", "825", "826", "827", "828", "829", "830", "831", "832", "833", "834", "835", "836"
];

const ibisExtraLocations = [
    "Corridor F.1", "Corridor F.2", "Corridor F.3", "Corridor F.4", "Corridor F.5",
    "Corridor F.6", "Corridor F.7", "Corridor F.8", "Rooftop", "Lumpini1", "Lumpini2",
    "Lumpini3", "Lobby", "Prungrod", "Popup", "Boho", "Pool", "Back Office", "Kitchen",
    "Canteen", "Other"
];

const incompleteStatuses = ["รอดำเนินการ", "กำลังดำเนินการ", "ยังไม่เสร็จ"];

const state = {
    hotel: "",
    room: "",
    user: null,
    allJobs: [],
    hotelJobs: [],
    editingJob: null,
    usersCache: []
};

const loginScreen = document.getElementById("loginScreen");
const appRoot = document.getElementById("appRoot");
const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");
const activeUserLabel = document.getElementById("activeUserLabel");
const logoutButton = document.getElementById("logoutButton");
const openSummaryButton = document.getElementById("openSummaryButton");
const workOrderList = document.getElementById("workOrderList");
const refreshJobs = document.getElementById("refreshJobs");
const summaryView = document.getElementById("summaryView");
const backFromSummary = document.getElementById("backFromSummary");
const summaryHotelFilter = document.getElementById("summaryHotelFilter");
const summaryStatusFilter = document.getElementById("summaryStatusFilter");
const summaryTotal = document.getElementById("summaryTotal");
const summaryIncomplete = document.getElementById("summaryIncomplete");
const summaryMercure = document.getElementById("summaryMercure");
const summaryIbis = document.getElementById("summaryIbis");

const sectionTitle = document.getElementById("sectionTitle");
const sectionDescription = document.getElementById("sectionDescription");
const stepBadge = document.getElementById("stepBadge");
const hotelView = document.getElementById("hotelView");
const roomView = document.getElementById("roomView");
const formView = document.getElementById("formView");
const roomGrid = document.getElementById("roomGrid");
const selectedHotelLabel = document.getElementById("selectedHotelLabel");
const selectedContext = document.getElementById("selectedContext");
const hotelInput = document.getElementById("hotelInput");
const roomInput = document.getElementById("roomInput");
const jobForm = document.getElementById("jobForm");
const message = document.getElementById("message");
const category = document.getElementById("category");
const status = document.getElementById("status");
const detail = document.getElementById("detail");
const searchPanel = document.getElementById("searchPanel");
const roomSearchInput = document.getElementById("roomSearchInput");
const roomSearchResults = document.getElementById("roomSearchResults");
const searchHint = document.getElementById("searchHint");
const caseList = document.getElementById("caseList");
const caseBadge = document.getElementById("caseBadge");
const caseBoardDescription = document.getElementById("caseBoardDescription");
const openReportButton = document.getElementById("openReportButton");
const openReportFromCases = document.getElementById("openReportFromCases");
const reportModal = document.getElementById("reportModal");
const reportForm = document.getElementById("reportForm");
const reportDateFrom = document.getElementById("reportDateFrom");
const reportDateTo = document.getElementById("reportDateTo");
const reportHotel = document.getElementById("reportHotel");
const reportPreview = document.getElementById("reportPreview");
const printReportRoot = document.getElementById("printReportRoot");
const activeUserRole = document.getElementById("activeUserRole");
const openUserManageButton = document.getElementById("openUserManageButton");
const userManageModal = document.getElementById("userManageModal");
const addUserForm = document.getElementById("addUserForm");
const newUserUsername = document.getElementById("newUserUsername");
const newUserDisplayName = document.getElementById("newUserDisplayName");
const newUserPassword = document.getElementById("newUserPassword");
const newUserRole = document.getElementById("newUserRole");
const userList = document.getElementById("userList");
const userManageMessage = document.getElementById("userManageMessage");
const hotelButtons = [...document.querySelectorAll("[data-hotel]")];
const loginSubmitButton = loginForm.querySelector('button[type="submit"]');
const jobSubmitButton = jobForm.querySelector('button[type="submit"]');
const addUserSubmitButton = addUserForm.querySelector('button[type="submit"]');
const reportSubmitButton = reportForm.querySelector('button[type="submit"]');

function buildQuery(params) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            search.set(key, String(value));
        }
    });
    return search.toString();
}

function looksLikeWorkOrderRecord(item) {
    return Boolean(item) && typeof item === "object" && ("ticketNo" in item || "hotel" in item || "category" in item);
}

function normalizeBoolean(value, fallback = true) {
    if (typeof value === "boolean") {
        return value;
    }

    if (typeof value === "number") {
        return value !== 0;
    }

    if (typeof value === "string") {
        const normalized = value.trim().toLowerCase();

        if (["false", "0", "inactive", "disabled", "no"].includes(normalized)) {
            return false;
        }

        if (["true", "1", "active", "enabled", "yes"].includes(normalized)) {
            return true;
        }
    }

    return fallback;
}

async function parseApiResponse(response) {
    let payload = null;

    try {
        payload = await response.json();
    } catch {
        payload = null;
    }

    if (!response.ok) {
        throw new Error(payload?.message || "ไม่สามารถเชื่อมต่อ Apps Script ได้");
    }

    if (payload?.ok === false) {
        throw new Error(payload.message || "Apps Script ตอบกลับไม่สำเร็จ");
    }

    return payload;
}

async function apiGet(action, params = {}) {
    const query = buildQuery({ action, ...params });
    const url = query ? `${WEBAPP_URL}?${query}` : WEBAPP_URL;
    const response = await fetch(url);
    return parseApiResponse(response);
}

async function apiPost(action, payload = {}) {
    const response = await fetch(WEBAPP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
            action,
            ...payload
        })
    });

    return parseApiResponse(response);
}

function setButtonBusy(button, busy, busyText) {
    if (!button) {
        return;
    }

    if (!button.dataset.defaultText) {
        button.dataset.defaultText = button.textContent.trim();
    }

    button.disabled = busy;
    button.classList.toggle("is-busy", busy);
    button.textContent = busy ? busyText : button.dataset.defaultText;
}

function setButtonsBusy(buttons, busy, busyText) {
    buttons.forEach((button) => {
        setButtonBusy(button, busy, busyText);
    });
}

function normalizeUserRecord(user) {
    if (!user || typeof user !== "object") {
        return null;
    }

    const username = String(user.username || user.login || "").trim().toLowerCase();

    if (!username) {
        return null;
    }

    return {
        username,
        displayName: String(user.displayName || user.name || username).trim(),
        role: user.role === ROLES.SUPERVISOR ? ROLES.SUPERVISOR : ROLES.EMPLOYEE,
        active: normalizeBoolean(user.active, true)
    };
}

function normalizeUsersPayload(payload) {
    const users = Array.isArray(payload)
        ? payload
        : (Array.isArray(payload?.users) ? payload.users : (Array.isArray(payload?.data) ? payload.data : []));

    if (users.length && users.every(looksLikeWorkOrderRecord)) {
        throw new Error("Apps Script ปัจจุบันยังไม่รองรับระบบผู้ใช้ กรุณาอัปเดตสคริปต์ฝั่ง Google Apps Script ก่อน");
    }

    return users
        .map(normalizeUserRecord)
        .filter(Boolean);
}

async function fetchUsers() {
    const users = normalizeUsersPayload(await apiGet("listUsers"));
    state.usersCache = users;
    return users;
}

async function fetchWorkOrdersByHotel(hotel) {
    const payload = await apiGet("listByHotel", { hotel });
    return normalizeJobsPayload(payload?.data || payload);
}

async function fetchIncompleteWorkOrdersByHotel(hotel) {
    const payload = await apiGet("listIncompleteByHotel", { hotel });
    return normalizeJobsPayload(payload?.data || payload);
}

async function fetchUserProfile(username) {
    const payload = await apiGet("getUserProfile", {
        username: username.trim().toLowerCase()
    });
    const user = normalizeUserRecord(payload?.user || payload?.data || payload);
    return user && user.active ? user : null;
}

async function authenticateUser(username, password) {
    const payload = await apiPost("login", {
        username: username.trim().toLowerCase(),
        password
    });
    const user = normalizeUserRecord(payload?.user || payload?.data || payload);
    return user && user.active ? user : null;
}

async function createUserAccount({ username, displayName, password, role }) {
    const payload = await apiPost("createUser", {
        username: username.trim().toLowerCase(),
        displayName: displayName.trim(),
        password,
        role,
        createdBy: getCurrentDisplayName()
    });
    return normalizeUserRecord(payload?.user || payload?.data || payload);
}

async function toggleUserAccount(username, active) {
    return apiPost("toggleUser", {
        username,
        active,
        updatedBy: getCurrentDisplayName()
    });
}

async function deleteUserAccount(username) {
    return apiPost("deleteUser", {
        username,
        deletedBy: getCurrentDisplayName()
    });
}

function getCurrentUser() {
    return state.user;
}

function getCurrentDisplayName() {
    return state.user?.displayName || state.user?.username || "-";
}

function isSupervisor() {
    return state.user?.role === ROLES.SUPERVISOR;
}

function getRoleLabel(role) {
    return role === ROLES.SUPERVISOR ? "หัวหน้า" : "พนักงาน";
}

function updatePermissionsUI() {
    const supervisor = isSupervisor();

    document.querySelectorAll(".supervisor-only").forEach((element) => {
        element.hidden = !supervisor;
    });

    if (activeUserRole) {
        activeUserRole.textContent = getRoleLabel(state.user?.role);
        activeUserRole.className = `role-badge role-badge--${supervisor ? "supervisor" : "employee"}`;
    }
}

async function renderUserList() {
    const users = await fetchUsers();
    userList.innerHTML = "";

    users.forEach((user) => {
        const card = document.createElement("article");
        card.className = "user-card";
        const isCurrentUser = state.user?.username === user.username;

        card.innerHTML = `
            <div class="user-card-main">
                <strong>${escapeHtml(user.displayName)}</strong>
                <span class="user-card-login">${escapeHtml(user.username)}</span>
                <span class="role-badge role-badge--${user.role === ROLES.SUPERVISOR ? "supervisor" : "employee"}">${escapeHtml(getRoleLabel(user.role))}</span>
            </div>
            <div class="user-card-actions">
                ${isCurrentUser ? '<span class="user-card-note">บัญชีปัจจุบัน</span>' : `
                    <button type="button" class="ghost-button user-toggle-button" data-user-action="toggle" data-username="${user.username}">${user.active ? "ปิดใช้งาน" : "เปิดใช้งาน"}</button>
                    <button type="button" class="ghost-button user-delete-button" data-user-action="delete" data-username="${user.username}">ลบ</button>
                `}
            </div>
        `;

        userList.appendChild(card);
    });
}

function showUserManageMessage(text, isError = false) {
    userManageMessage.hidden = false;
    userManageMessage.textContent = text;
    userManageMessage.className = isError ? "user-manage-message user-manage-message--error" : "user-manage-message";
}

async function openUserManageModal() {
    if (!isSupervisor()) {
        return;
    }
    setButtonBusy(openUserManageButton, true, "กำลังโหลด...");
    userManageMessage.hidden = true;
    addUserForm.reset();
    userList.innerHTML = '<p class="workorder-empty">กำลังโหลดรายชื่อผู้ใช้...</p>';
    userManageModal.hidden = false;
    document.body.classList.add("modal-open");

    try {
        await renderUserList();
    } catch (error) {
        console.error(error);
        userList.innerHTML = '<p class="workorder-empty workorder-empty--error">❌ โหลดรายชื่อผู้ใช้ไม่สำเร็จ</p>';
        showUserManageMessage(error.message || "โหลดรายชื่อผู้ใช้ไม่สำเร็จ", true);
    } finally {
        setButtonBusy(openUserManageButton, false);
    }
}

function closeUserManageModal() {
    userManageModal.hidden = true;
    if (reportModal.hidden) {
        document.body.classList.remove("modal-open");
    }
}

function formatThaiDateTime(value) {
    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function formatThaiDate(value) {
    if (!value) {
        return "-";
    }

    const date = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? new Date(`${value}T12:00:00`)
        : (value instanceof Date ? value : new Date(value));

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function toDateKey(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function endOfDay(dateKey) {
    const date = new Date(`${dateKey}T23:59:59`);
    return Number.isNaN(date.getTime()) ? null : date;
}

function startOfDay(dateKey) {
    const date = new Date(`${dateKey}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
}

function getJobReceivedAt(job) {
    return job.receivedAt || job.dateTime || null;
}

function getJobCompletedAt(job) {
    if (job.completedAt) {
        return job.completedAt;
    }

    if (job.status === "เสร็จสิ้น") {
        return job.dateTime || null;
    }

    return null;
}

function normalizeLocalCase(job, hotel) {
    return {
        ticketNo: job.ticketNo || "",
        hotel,
        room: job.room,
        category: job.category,
        status: job.status,
        detail: job.detail,
        receivedAt: job.receivedAt,
        completedAt: job.completedAt,
        openedBy: job.openedBy || null,
        lastEditedBy: job.lastEditedBy || null,
        closedBy: job.closedBy || null
    };
}

function collectAllJobs() {
    return state.allJobs.map((job) => ({
        ...job,
        room: String(job.room || ""),
        ticketNo: job.ticketNo || "",
        hotel: job.hotel || "",
        category: job.category || "",
        detail: job.detail || "",
        status: job.status || "",
        receivedAt: job.receivedAt || job.dateTime || null,
        completedAt: job.completedAt || job.closeDate || (job.status === "à¹€à¸ªà¸£à¹‡à¸ˆà¸ªà¸´à¹‰à¸™" ? job.dateTime : null),
        openedBy: job.openedBy || "",
        lastEditedBy: job.lastEditedBy || "",
        closedBy: job.closedBy || ""
    }));
}

function getIncompleteCasesForHotel(hotelName) {
    return (state.hotelJobs.length ? state.hotelJobs : collectAllJobs())
        .filter((job) => job.hotel === hotelName && incompleteStatuses.includes(job.status))
        .sort((left, right) => {
            const leftTime = new Date(getJobReceivedAt(left) || 0).getTime();
            const rightTime = new Date(getJobReceivedAt(right) || 0).getTime();
            return rightTime - leftTime;
        });
}

async function refreshAllJobs() {
    state.allJobs = [...(await fetchWorkOrders())].reverse();
    return state.allJobs;
}

async function refreshHotelJobs(hotelName) {
    state.hotelJobs = [...(await fetchIncompleteWorkOrdersByHotel(hotelName))].reverse();
    return state.hotelJobs;
}

async function ensureJobsLoaded() {
    if (!state.allJobs.length) {
        await refreshAllJobs();
    }

    return state.allJobs;
}

function matchesHotel(job, hotelFilter) {
    return hotelFilter === "all" || job.hotel === hotelFilter;
}

function buildReportData(hotelFilter, dateFromKey, dateToKey) {
    const closeDate = endOfDay(dateToKey);
    const fromTime = startOfDay(dateFromKey)?.getTime();
    const toTime = closeDate?.getTime();
    const allJobs = collectAllJobs().filter((job) => matchesHotel(job, hotelFilter));

    const receivedInRange = [];
    const completedInRange = [];
    const pendingCases = [];

    allJobs.forEach((job) => {
        const receivedAt = getJobReceivedAt(job);
        const completedAt = getJobCompletedAt(job);
        const receivedTime = receivedAt ? new Date(receivedAt).getTime() : null;
        const completedTime = completedAt ? new Date(completedAt).getTime() : null;

        if (receivedTime !== null && fromTime !== undefined && toTime !== undefined && receivedTime >= fromTime && receivedTime <= toTime) {
            receivedInRange.push(job);
        }

        if (completedTime !== null && fromTime !== undefined && toTime !== undefined && completedTime >= fromTime && completedTime <= toTime) {
            completedInRange.push(job);
        }

        const receivedDate = receivedAt ? new Date(receivedAt) : null;
        const completedDate = completedAt ? new Date(completedAt) : null;
        const isPendingOnCloseDate = receivedDate
            && closeDate
            && receivedDate <= closeDate
            && (!completedDate || completedDate > closeDate)
            && incompleteStatuses.includes(job.status);

        if (isPendingOnCloseDate) {
            pendingCases.push(job);
        }
    });

    return {
        receivedInRange,
        completedInRange,
        pendingCases,
        totalListed: receivedInRange.length + completedInRange.length + pendingCases.length
    };
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function renderReportTableRows(jobs) {
    if (!jobs.length) {
        return '<tr><td colspan="10" class="report-empty-row">ไม่มีรายการ</td></tr>';
    }

    return jobs.map((job) => `
        <tr>
            <td>${escapeHtml(job.ticketNo || "-")}</td>
            <td>${escapeHtml(job.room || "-")}</td>
            <td>${escapeHtml(job.category || "-")}</td>
            <td>${escapeHtml(job.status || "-")}</td>
            <td>${escapeHtml(formatThaiDateTime(getJobReceivedAt(job)))}</td>
            <td>${escapeHtml(formatThaiDateTime(getJobCompletedAt(job)))}</td>
            <td>${escapeHtml(job.openedBy || "-")}</td>
            <td>${escapeHtml(job.lastEditedBy || "-")}</td>
            <td>${escapeHtml(job.closedBy || "-")}</td>
            <td>${escapeHtml(job.detail || "-")}</td>
        </tr>
    `).join("");
}

function renderReportSection(title, jobs) {
    return `
        <section class="print-report-section">
            <h2>${escapeHtml(title)} <span>(${jobs.length} รายการ)</span></h2>
            <table class="print-report-table">
                <thead>
                    <tr>
                        <th>เลขที่งาน</th>
                        <th>ห้อง/พื้นที่</th>
                        <th>หมวดงาน</th>
                        <th>สถานะ</th>
                        <th>รับงาน</th>
                        <th>เสร็จ</th>
                        <th>เปิดโดย</th>
                        <th>แก้ไขโดย</th>
                        <th>ปิดโดย</th>
                        <th>รายละเอียด</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderReportTableRows(jobs)}
                </tbody>
            </table>
        </section>
    `;
}

function buildPrintReportHtml(hotelFilter, dateFromKey, dateToKey) {
    const report = buildReportData(hotelFilter, dateFromKey, dateToKey);
    const hotelLabel = hotelFilter === "all" ? "ทุกโรงแรมในคลัสเตอร์" : hotelFilter;
    const printedAt = formatThaiDateTime(new Date().toISOString());
    const printedBy = getCurrentDisplayName();

    return `
        <div class="print-report-document">
            <header class="print-report-header">
                <p class="print-report-kicker">Engineering Daily Closing Report</p>
                <h1>รายงานปิดวันงานช่างประจำโรงแรม</h1>
                <div class="print-report-meta">
                    <p><strong>โรงแรม:</strong> ${escapeHtml(hotelLabel)}</p>
                    <p><strong>ช่วงวันที่:</strong> ${escapeHtml(formatThaiDate(dateFromKey))} - ${escapeHtml(formatThaiDate(dateToKey))}</p>
                    <p><strong>พิมพ์เมื่อ:</strong> ${escapeHtml(printedAt)}</p>
                    <p><strong>ผู้พิมพ์:</strong> ${escapeHtml(printedBy)}</p>
                </div>
            </header>

            <section class="print-report-summary">
                <div><span>รับงานในช่วงวันที่</span><strong>${report.receivedInRange.length}</strong></div>
                <div><span>เสร็จในช่วงวันที่</span><strong>${report.completedInRange.length}</strong></div>
                <div><span>งานค้าง ณ สิ้นวัน</span><strong>${report.pendingCases.length}</strong></div>
            </section>

            ${renderReportSection("งานที่รับในช่วงวันที่ที่เลือก", report.receivedInRange)}
            ${renderReportSection("งานที่เสร็จในช่วงวันที่ที่เลือก", report.completedInRange)}
            ${renderReportSection("งานค้าง ณ สิ้นวันสุดท้าย", report.pendingCases)}
        </div>
    `;
}

function updateReportPreview() {
    if (!reportDateFrom.value || !reportDateTo.value) {
        reportPreview.innerHTML = "";
        return;
    }

    const report = buildReportData(reportHotel.value, reportDateFrom.value, reportDateTo.value);

    reportPreview.innerHTML = `
        <strong>ตัวอย่างข้อมูลที่จะพิมพ์</strong>
        <span>ช่วงวันที่ ${formatThaiDate(reportDateFrom.value)} - ${formatThaiDate(reportDateTo.value)}</span>
        <span>รับงานในช่วงวันที่ ${report.receivedInRange.length} รายการ</span>
        <span>เสร็จในช่วงวันที่ ${report.completedInRange.length} รายการ</span>
        <span>งานค้าง ณ สิ้นวัน ${report.pendingCases.length} รายการ</span>
    `;
}

function openReportModal(defaultHotel = "all") {
    if (!isSupervisor()) {
        return;
    }

    const todayKey = toDateKey(new Date());
    reportDateFrom.value = todayKey;
    reportDateTo.value = todayKey;
    reportHotel.value = defaultHotel === "all"
        ? "all"
        : (hotels.includes(defaultHotel) ? defaultHotel : "all");
    reportModal.hidden = false;
    document.body.classList.add("modal-open");
    updateReportPreview();
}

function closeReportModal() {
    reportModal.hidden = true;
    if (userManageModal.hidden) {
        document.body.classList.remove("modal-open");
    }
}

function printDailyReport(hotelFilter, dateFromKey, dateToKey) {
    printReportRoot.innerHTML = buildPrintReportHtml(hotelFilter, dateFromKey, dateToKey);
    printReportRoot.hidden = false;

    const cleanup = () => {
        printReportRoot.hidden = true;
        printReportRoot.innerHTML = "";
        window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();
}

function saveSession(user) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        username: user.username,
        displayName: user.displayName,
        role: user.role
    }));
}

function clearSession() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
}

function loadSession() {
    try {
        const raw = localStorage.getItem(SESSION_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function showAppForUser(user) {
    state.user = {
        username: user.username,
        displayName: user.displayName,
        role: user.role
    };

    activeUserLabel.textContent = user.displayName;
    updatePermissionsUI();

    loginScreen.style.display = "none";
    appRoot.classList.remove("app-shell--hidden");
}

function showLogin() {
    state.user = null;
    loginScreen.style.display = "flex";
    appRoot.classList.add("app-shell--hidden");

    loginForm.reset();
    loginMessage.hidden = true;
}

function setActiveView(viewName) {
    hotelView.classList.toggle("active", viewName === "hotel");
    roomView.classList.toggle("active", viewName === "room");
    formView.classList.toggle("active", viewName === "form");
    summaryView.classList.toggle("active", viewName === "summary");

    if (viewName === "hotel") {
        stepBadge.textContent = "ขั้นตอน 1";
        sectionTitle.textContent = "เลือกโรงแรมที่ต้องการทำงาน";
        sectionDescription.textContent = "เลือกได้ 2 โรงในคลัสเตอร์นี้";
    }

    if (viewName === "room") {
        stepBadge.textContent = "ขั้นตอน 2";
        sectionTitle.textContent = "เลือกห้องที่ต้องการเข้าไปทำงาน";
        sectionDescription.textContent = state.hotel === "ibis Styles Bangkok Silom"
            ? "ค้นหาเลขห้องหรือพื้นที่ของ ibis Styles Bangkok Silom จากข้อมูลที่ลงไว้"
            : "ค้นหาเลขห้องหรือพื้นที่ของ Mercure Bangkok Surawong แล้วเลือกเปิดงานได้ทันที";
    }

    if (viewName === "form") {
        stepBadge.textContent = "ขั้นตอน 3";
        sectionTitle.textContent = "กรอกรายละเอียดงานของห้องนี้";
        sectionDescription.textContent = "เลือกส่วนงาน สถานะ และบันทึกรายละเอียดการทำงาน";
    }

    if (viewName === "summary") {
        stepBadge.textContent = "ภาพรวม";
        sectionTitle.textContent = "รายการงานรวมทั้งคลัสเตอร์";
        sectionDescription.textContent = "ดูงานจาก Google Sheets ทั้ง Mercure และ ibis Styles พร้อมกรองตามโรงแรมและสถานะ";
    }
}

function updateSummaryStats(jobs) {
    summaryTotal.textContent = String(jobs.length);
    summaryIncomplete.textContent = String(
        jobs.filter((job) => incompleteStatuses.includes(job.status)).length
    );
    summaryMercure.textContent = String(
        jobs.filter((job) => job.hotel === "Mercure Bangkok Surawong").length
    );
    summaryIbis.textContent = String(
        jobs.filter((job) => job.hotel === "ibis Styles Bangkok Silom").length
    );
}

function getFilteredJobs() {
    const hotelFilter = summaryHotelFilter.value;
    const statusFilter = summaryStatusFilter.value;

    return state.allJobs.filter((job) => {
        const hotelMatch = hotelFilter === "all" || job.hotel === hotelFilter;
        const statusMatch = statusFilter === "all" || job.status === statusFilter;
        return hotelMatch && statusMatch;
    });
}

function renderWorkOrders(jobs) {
    workOrderList.innerHTML = "";

    if (!jobs.length) {
        workOrderList.innerHTML = '<p class="workorder-empty">ไม่พบรายการงานตามตัวกรองที่เลือก</p>';
        return;
    }

    jobs.forEach((job) => {
        const card = document.createElement("article");
        const isMercure = job.hotel === "Mercure Bangkok Surawong";
        const isEditable = incompleteStatuses.includes(job.status);
        card.className = `workorder-card${isMercure ? " workorder-card--mercure" : " workorder-card--ibis"}${isEditable ? " workorder-card--editable" : ""}`;

        const receivedAt = job.receivedAt || job.dateTime;
        const completedAt = job.completedAt || (job.status === "เสร็จสิ้น" ? job.dateTime : null);

        card.innerHTML = `
            <div class="ticket-no">#${job.ticketNo || "-"}</div>
            <div class="workorder-meta">รับงาน: ${formatThaiDateTime(receivedAt)}</div>
            <div class="workorder-meta">เสร็จ: ${formatThaiDateTime(completedAt)}</div>
            <div class="workorder-meta">เปิดโดย: ${escapeHtml(job.openedBy || "-")}</div>
            <div class="workorder-meta">แก้ไขโดย: ${escapeHtml(job.lastEditedBy || "-")}</div>
            <div class="workorder-meta">ปิดโดย: ${escapeHtml(job.closedBy || "-")}</div>
            <div class="workorder-meta">🏨 ${job.hotel || "-"}</div>
            <div class="workorder-meta">🚪 ห้อง ${job.room || "-"}</div>
            <div class="workorder-meta">🔧 ${job.category || "-"}</div>
            <p class="workorder-detail">${job.detail || "-"}</p>
            <div class="status">📋 ${job.status || "-"}</div>
            ${isEditable ? '<div class="workorder-edit-hint">กดเพื่อเปิดแก้ไขงานนี้</div>' : ""}
        `;

        if (isEditable) {
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.addEventListener("click", () => openJobFormFromSummary(job));
            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openJobFormFromSummary(job);
                }
            });
        }

        workOrderList.appendChild(card);
    });
}

function renderSummaryView() {
    const filteredJobs = getFilteredJobs();
    updateSummaryStats(state.allJobs);
    renderWorkOrders(filteredJobs);
}

function normalizeJobsPayload(payload) {
    const jobs = Array.isArray(payload)
        ? payload
        : (payload && Array.isArray(payload.data) ? payload.data : []);

    return jobs.filter((job) => {
        if (!job || typeof job !== "object") {
            return false;
        }

        return Boolean(
            String(job.ticketNo || "").trim()
            || String(job.hotel || "").trim()
            || String(job.room || "").trim()
            || String(job.category || "").trim()
            || String(job.detail || "").trim()
            || String(job.status || "").trim()
        );
    });
}

async function fetchWorkOrders() {
    const endpoints = [WEBAPP_URL + "?action=list", WEBAPP_URL];

    for (const endpoint of endpoints) {
        const response = await fetch(endpoint);
        const jobs = normalizeJobsPayload(await response.json());

        if (jobs.length) {
            return jobs;
        }
    }

    return [];
}

async function loadWorkOrders() {
    workOrderList.innerHTML = '<p class="workorder-empty">กำลังโหลดข้อมูล...</p>';
    setButtonBusy(refreshJobs, true, "กำลังรีเฟรช...");

    try {
        await refreshAllJobs();
        renderSummaryView();
    } catch (error) {
        console.error(error);
        workOrderList.innerHTML = '<p class="workorder-empty workorder-empty--error">❌ โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง</p>';
    } finally {
        setButtonBusy(refreshJobs, false);
    }
}

async function openSummaryView() {
    if (!isSupervisor()) {
        return;
    }

    setActiveView("summary");
    setButtonBusy(openSummaryButton, true, "กำลังโหลด...");
    try {
        await loadWorkOrders();
    } finally {
        setButtonBusy(openSummaryButton, false);
    }
}

function openJobForm(room) {
    state.room = room;
    state.editingJob = null;

    hotelInput.value = state.hotel;
    roomInput.value = room;

    selectedContext.textContent =
        `โรงแรม ${state.hotel} | จุดงาน ${state.room}`;

    category.value = "";
    status.value = "";
    detail.value = "";
    message.hidden = true;

    setActiveView("form");
}

function openJobFormFromSummary(job) {
    state.hotel = job.hotel;
    state.room = job.room;
    state.editingJob = { ...job };

    selectedHotelLabel.textContent = job.hotel;
    hotelInput.value = job.hotel;
    roomInput.value = job.room;
    selectedContext.textContent = `โรงแรม ${job.hotel} | จุดงาน ${job.room}`;

    category.value = job.category || "";
    status.value = job.status || "";
    detail.value = job.detail || "";
    message.hidden = true;

    setActiveView("form");
}

function renderCases(hotelName) {
    const cases = getIncompleteCasesForHotel(hotelName);
    caseList.innerHTML = "";
    caseBadge.textContent = `${cases.length} เคส`;
    caseBoardDescription.textContent = "แสดงเฉพาะงานที่ยังไม่เสร็จจากฐานข้อมูลจริงใน Google Sheets";

    if (!cases.length) {
        caseList.innerHTML = '<p class="workorder-empty">ยังไม่มีงานค้างของโรงแรมนี้</p>';
        return;
    }

    cases.forEach((job) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "case-card";
        card.innerHTML = `
            <div class="case-room">${job.room}</div>
            <div class="case-meta">${job.category}</div>
            <div class="case-status">${job.status}</div>
            <div class="case-dates">
                <span>รับงาน: ${formatThaiDateTime(job.receivedAt)}</span>
                <span>เสร็จ: ${job.completedAt ? formatThaiDateTime(job.completedAt) : "-"}</span>
            </div>
            <div class="case-staff">
                <span>เปิดโดย: ${escapeHtml(job.openedBy || "-")}</span>
                <span>แก้ไขโดย: ${escapeHtml(job.lastEditedBy || "-")}</span>
                <span>ปิดโดย: ${escapeHtml(job.closedBy || "-")}</span>
            </div>
            <p>${escapeHtml(job.detail)}</p>
        `;
        card.addEventListener("click", () => openJobFormFromSummary(job));
        caseList.appendChild(card);
    });
}

function getSearchTargetsForHotel(hotelName) {
    return hotelName === "ibis Styles Bangkok Silom"
        ? [...ibisRooms, ...ibisExtraLocations]
        : [...mercureRooms, ...mercureExtraLocations];
}

function getExtraLocationsForHotel(hotelName) {
    return hotelName === "ibis Styles Bangkok Silom" ? ibisExtraLocations : mercureExtraLocations;
}

function renderSearchResults(query = "") {
    roomSearchResults.innerHTML = "";
    const normalizedQuery = query.trim();
    const hotelName = state.hotel;
    const searchTargets = getSearchTargetsForHotel(hotelName);
    const extraLocations = getExtraLocationsForHotel(hotelName);

    if (!normalizedQuery) {
        searchHint.textContent = `เริ่มพิมพ์เพื่อค้นหาห้องหรือพื้นที่ของ ${hotelName}`;
        return;
    }

    const loweredQuery = normalizedQuery.toLowerCase();
    const matchedResults = searchTargets
        .filter((item) => item.toLowerCase().includes(loweredQuery))
        .slice(0, 18);

    searchHint.textContent = matchedResults.length
        ? `พบ ${matchedResults.length} รายการจากคำค้นหา "${normalizedQuery}"`
        : `ไม่พบรายการจากคำค้นหา "${normalizedQuery}"`;

    matchedResults.forEach((item) => {
        const resultButton = document.createElement("button");
        resultButton.type = "button";
        resultButton.className = "search-result-button";
        resultButton.textContent = extraLocations.includes(item) ? item : `ห้อง ${item}`;
        resultButton.addEventListener("click", () => {
            roomSearchInput.value = item;
            renderSearchResults(item);
            openJobForm(item);
        });
        roomSearchResults.appendChild(resultButton);
    });
}

function renderRoomSelection() {
    roomGrid.hidden = true;
    roomGrid.innerHTML = "";
    searchPanel.hidden = false;
    roomSearchInput.value = "";
    renderSearchResults("");
    renderCases(state.hotel);
}

async function selectHotel(hotelName) {
    if (!hotels.includes(hotelName)) {
        return;
    }

    state.editingJob = null;
    state.hotel = hotelName;
    state.room = "";
    selectedHotelLabel.textContent = hotelName;
    hotelInput.value = hotelName;
    roomInput.value = "";
    selectedContext.textContent = `โรงแรม ${state.hotel} | จุดงาน -`;
    category.value = "";
    status.value = "";
    detail.value = "";
    message.hidden = true;
    state.hotelJobs = [];
    renderRoomSelection();
    setActiveView("room");
    caseList.innerHTML = '<p class="workorder-empty">กำลังโหลดงานค้างของโรงแรม...</p>';
    caseBadge.textContent = "กำลังโหลด...";
    searchHint.textContent = `กำลังโหลดข้อมูลของ ${hotelName}`;
    try {
        await refreshHotelJobs(hotelName);
        renderRoomSelection();
    } catch (error) {
        console.error(error);
        state.hotelJobs = [];
        caseList.innerHTML = '<p class="workorder-empty workorder-empty--error">❌ โหลดงานค้างไม่สำเร็จ กรุณาลองใหม่อีกครั้ง</p>';
        caseBadge.textContent = "0 เคส";
    }
}
openSummaryButton.addEventListener("click", () => void openSummaryView());
openReportButton.addEventListener("click", () => openReportModal("all"));
openReportFromCases.addEventListener("click", () => openReportModal(state.hotel || "all"));
openUserManageButton.addEventListener("click", openUserManageModal);
userManageModal.querySelectorAll("[data-close-user-manage]").forEach((element) => {
    element.addEventListener("click", closeUserManageModal);
});

addUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isSupervisor()) {
        return;
    }

    const username = newUserUsername.value.trim().toLowerCase();
    const displayName = newUserDisplayName.value.trim();
    const password = newUserPassword.value.trim();
    const role = newUserRole.value;

    if (!username || !displayName || !password) {
        showUserManageMessage("กรุณากรอกข้อมูลให้ครบถ้วน", true);
        return;
    }

    try {
        setButtonBusy(addUserSubmitButton, true, "กำลังเพิ่มผู้ใช้...");
        await createUserAccount({
            username,
            displayName,
            password,
            role
        });
        addUserForm.reset();
        await renderUserList();
        showUserManageMessage("เพิ่มผู้ใช้สำเร็จ");
    } catch (error) {
        console.error(error);
        showUserManageMessage(error.message || "ไม่สามารถเพิ่มผู้ใช้ได้", true);
    } finally {
        setButtonBusy(addUserSubmitButton, false);
    }
});

userList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-user-action]");
    if (!button || !isSupervisor()) {
        return;
    }

    const username = button.dataset.username;
    const action = button.dataset.userAction;

    if (username === state.user?.username) {
        showUserManageMessage("ไม่สามารถแก้ไขบัญชีที่กำลังใช้งาน", true);
        return;
    }

    const targetUser = state.usersCache.find((user) => user.username === username);

    if (!targetUser) {
        showUserManageMessage("ไม่พบข้อมูลผู้ใช้ล่าสุด กรุณาลองรีเฟรชใหม่", true);
        return;
    }

    try {
        if (action === "toggle") {
            await toggleUserAccount(username, !targetUser.active);
            await renderUserList();
            showUserManageMessage(!targetUser.active ? "เปิดใช้งานบัญชีแล้ว" : "ปิดใช้งานบัญชีแล้ว");
            return;
        }

        if (action === "delete") {
            await deleteUserAccount(username);
            await renderUserList();
            showUserManageMessage("ลบบัญชีผู้ใช้แล้ว");
        }
    } catch (error) {
        console.error(error);
        showUserManageMessage(error.message || "อัปเดตข้อมูลผู้ใช้ไม่สำเร็จ", true);
    }
});
reportDateFrom.addEventListener("change", updateReportPreview);
reportDateTo.addEventListener("change", updateReportPreview);
reportHotel.addEventListener("change", updateReportPreview);
reportForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isSupervisor()) {
        return;
    }

    if (!reportDateFrom.value || !reportDateTo.value) {
        return;
    }

    if (reportDateFrom.value > reportDateTo.value) {
        reportPreview.innerHTML = "<strong>กรุณาเลือกช่วงวันที่ให้ถูกต้อง</strong><span>วันที่เริ่มต้นต้องไม่มากกว่าวันที่สิ้นสุด</span>";
        return;
    }

    if (!state.allJobs.length) {
        try {
            setButtonBusy(reportSubmitButton, true, "กำลังเตรียมรายงาน...");
            await refreshAllJobs();
        } catch (error) {
            console.error(error);
        } finally {
            setButtonBusy(reportSubmitButton, false);
        }
    }

    printDailyReport(reportHotel.value, reportDateFrom.value, reportDateTo.value);
    closeReportModal();
});
reportModal.querySelectorAll("[data-close-report]").forEach((element) => {
    element.addEventListener("click", closeReportModal);
});
refreshJobs.addEventListener("click", loadWorkOrders);
backFromSummary.addEventListener("click", () => setActiveView("hotel"));
summaryHotelFilter.addEventListener("change", renderSummaryView);
summaryStatusFilter.addEventListener("change", renderSummaryView);

document.querySelectorAll("[data-hotel]").forEach((button) => {
    button.addEventListener("click", () => {
        void selectHotel(button.dataset.hotel);
    });
});

document.getElementById("backToHotels").addEventListener("click", () => {
    setActiveView("hotel");
});

document.getElementById("backToRooms").addEventListener("click", () => {
    message.hidden = true;
    setActiveView("room");
});

roomSearchInput.addEventListener("input", (event) => {
    renderSearchResults(event.target.value);
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    if (!username || !password) {
        loginMessage.hidden = false;
        loginMessage.textContent = "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน";
        return;
    }

    try {
        setButtonBusy(loginSubmitButton, true, "กำลังเข้าสู่ระบบ...");
        loginMessage.hidden = true;
        const user = await authenticateUser(username, password);

        if (!user) {
            loginMessage.hidden = false;
            loginMessage.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
            return;
        }

        saveSession(user);
        showAppForUser(user);
        setActiveView("hotel");
    } catch (error) {
        console.error(error);
        loginMessage.hidden = false;
        loginMessage.textContent = error.message || "ไม่สามารถเข้าสู่ระบบได้";
    } finally {
        setButtonBusy(loginSubmitButton, false);
    }
});
jobForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const editorName = getCurrentDisplayName();
    const isComplete = status.value === "เสร็จสิ้น";
    const editingJob = state.editingJob;
    const existingCase = editingJob || getIncompleteCasesForHotel(state.hotel).find((job) => String(job.room) === String(state.room));
    const ticketNo = editingJob?.ticketNo || existingCase?.ticketNo || "MT" + Date.now();

    const jobData = {
        ticketNo,
        hotel: state.hotel,
        room: state.room,
        category: category.value,
        status: status.value,
        detail: detail.value.trim(),
        receivedAt: existingCase?.receivedAt || editingJob?.receivedAt || new Date().toISOString(),
        completedAt: isComplete ? new Date().toISOString() : null,
        openedBy: existingCase?.openedBy || editingJob?.openedBy || editorName,
        lastEditedBy: editorName,
        closedBy: isComplete ? editorName : null
    };

    try {
        setButtonBusy(jobSubmitButton, true, "กำลังบันทึก...");
        await apiPost("saveWorkOrder", {
            ticketNo: ticketNo,
            dateTime: jobData.receivedAt,
            hotel: jobData.hotel,
            room: jobData.room,
            category: jobData.category,
            detail: jobData.detail,
            priority: "Medium",
            status: jobData.status,
            closeDate: jobData.completedAt,
            openedBy: jobData.openedBy,
            lastEditedBy: jobData.lastEditedBy,
            closedBy: jobData.closedBy
        });

        await refreshHotelJobs(jobData.hotel);
        if (summaryView.classList.contains("active")) {
            await refreshAllJobs();
        }
        renderCases(jobData.hotel);
        if (summaryView.classList.contains("active")) {
            renderSummaryView();
        }

        message.hidden = false;
        message.innerHTML = `
            <strong>✅ บันทึกงานสำเร็จ</strong><br>
            เลขที่งาน: ${ticketNo}<br>
            โรงแรม: ${jobData.hotel}<br>
            ห้อง: ${jobData.room}<br>
            หมวดงาน: ${jobData.category}
        `;

        jobForm.reset();
        state.editingJob = null;

    } catch (error) {

        console.error(error);

        message.hidden = false;
        message.innerHTML =
            "❌ ไม่สามารถเชื่อมต่อ Google Sheets ได้";
    } finally {
        setButtonBusy(jobSubmitButton, false);
    }
});
logoutButton.addEventListener("click", () => {
    clearSession();
    showLogin();
});

async function initializeApp() {
    const existingSession = loadSession();
    let startupError = "";

    if (!existingSession?.username) {
        showLogin();
        return;
    }

    try {
        const sessionUser = await fetchUserProfile(existingSession.username);

        if (sessionUser) {
            showAppForUser(sessionUser);
            setActiveView("hotel");
            return;
        }
    } catch (error) {
        console.error(error);
        startupError = error.message || "ไม่สามารถโหลดข้อมูลผู้ใช้จากระบบได้";
    }

    clearSession();
    showLogin();

    if (startupError) {
        loginMessage.hidden = false;
        loginMessage.textContent = startupError;
    }
}

initializeApp();
