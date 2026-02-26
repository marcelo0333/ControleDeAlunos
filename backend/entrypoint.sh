#!/bin/sh
echo "=== Arquivos em dist/ ==="
ls dist/
npx prisma migrate deploy
node dist/server.js