# ReactJS use SWR & Prisma - Server Side
contoh sederhana penggunaan NodeJS, Prisma (NodeJS ORM) pada bagian backend.

- Buka Terminal pada lokasi folder project server side 
- Ketikkan `npm install`
- Buka file .env dan edit konfigurasi database / port untuk server
- ` DATABASE_URL="[mysql/potsgre/mongodb]://root:[password_database]@localhost:[port_database]/[nama_database]" `
- Ketikkan `npx prisma migrate dev` untuk membuat database dan table secara otomatis
- Setelah itu ketikkan `npm run dev` (tahap development) / `npm run start` (tahap production)