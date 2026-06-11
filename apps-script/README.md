# Google Apps Script Setup

ไฟล์นี้ใช้ย้าย `ผู้ใช้/รหัสผ่าน` ไปเก็บบน Google Sheet จริง และยังรองรับงานซ่อมชุดเดิมในชีตเดียวกันด้วย

## สิ่งที่จะได้

- ชีต `WorkOrders` สำหรับรายการงานซ่อม
- ชีต `Users` สำหรับบัญชีผู้ใช้
- รหัสผ่านถูกเก็บเป็น `SHA-256 hash` ไม่เก็บเป็น plain text
- รองรับ `login`, `list users`, `create user`, `toggle user`, `delete user`

## วิธีติดตั้ง

1. สร้าง Google Sheet ใหม่ 1 ไฟล์
2. เปิด `Extensions > Apps Script`
3. ลบโค้ดเดิมใน `Code.gs`
4. วางโค้ดจากไฟล์ [Code.gs](C:/งานโปรเจคต่างๆ/Maintenance-System/apps-script/Code.gs)
5. กด `Save`
6. รันฟังก์ชัน `setupMaintenanceSheets`
7. ถ้าต้องการบัญชีเริ่มต้นแบบเดิม รัน `seedDefaultUsers`
8. Deploy เป็น `Web app`
9. ตั้งค่า
   `Execute as`: Me
   `Who has access`: Anyone
10. นำ URL ที่ deploy ได้ มาแทนค่า `WEBAPP_URL` ใน [script.js](C:/งานโปรเจคต่างๆ/Maintenance-System/script.js)

## โครงชีต Users

ระบบจะสร้างหัวตารางให้อัตโนมัติ:

`username`, `displayName`, `passwordHash`, `role`, `active`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`

## บัญชีเริ่มต้นจาก `seedDefaultUsers`

- `admin / 1234`
- `somchai / 1234`
- `wichai / 1234`

ควรเปลี่ยนรหัสผ่านทันทีหลังทดสอบเสร็จ

## Actions ที่หน้าเว็บจะเรียก

- `GET ?action=list`
- `GET ?action=listUsers`
- `GET ?action=getUserProfile&username=...`
- `POST { action: "login" }`
- `POST { action: "createUser" }`
- `POST { action: "toggleUser" }`
- `POST { action: "deleteUser" }`
- `POST { action: "saveWorkOrder" }`

## หมายเหตุ

- ถ้าใช้ URL เดิมที่ยังไม่มี action เรื่องผู้ใช้ หน้า login จะฟ้องว่า Apps Script ยังไม่รองรับระบบผู้ใช้
- หลังแก้ Apps Script แล้ว ต้อง `Deploy > Manage deployments > Edit > Deploy` ใหม่ทุกครั้ง
