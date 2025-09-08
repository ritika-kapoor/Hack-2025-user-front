#!/bin/bash

echo "🚀 Starting Meguru Backend Services..."

# Navigate to backend directory
cd ../meguru-backend/meguru-backend

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env file exists, create it if not
if [ ! -f .env ]; then
    echo "📝 Creating .env file with required environment variables..."
    cat > .env << 'EOF'
DB_HOST=db
DB_PORT=5432
DB_USER=meguru_user
DB_PASSWORD=meguru_password
DB_NAME=meguru_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=8080
DATABASE_URL=postgres://meguru_user:meguru_password@db:5432/meguru_db?sslmode=disable
VAPID_PUBLIC_KEY=BNCeYBXGZPLsE8vPl-WZ4fi-wqIYNs35WsF2uqL1iTRamcwnd4fVxdyDEatst9UrlCjC2Zd1js8QsfFL8MriUvQ
VAPID_PRIVATE_KEY=rR-EeqU6vM1jEm22PPAgLvm_1usu7eNKoUioWFicOUI
GEMINI_API_KEY=AIzaSyAE4OzAbYit2Zb_uC-U-IaI0_IOVCIq87U
R2_BUCKET_URL="https://2d44ce7061796f9eeb11190723a61cd5.r2.cloudflarestorage.com/meguru"
R2_ACCESS_KEY=df5bc889fc928faf6e7d0d78f86fa513
R2_SECRET_KEY=9623124eb7f9fd0aa05690169e47e5bfec5a9a5da3d17e00d76c59099f73d317
R2_ENDPOINT=https://2d44ce7061796f9eeb11190723a61cd5.r2.cloudflarestorage.com
R2_PUBLIC_BUCKET_DOMAIN=https://pub-608156fee9814c35ad00d461a390e841.r2.dev
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=konkuriitonouenokareha128@gmail.com
EMAIL_PASSWORD=nyeavgzutzxnikqx
OPENAI_API_KEY=
EOF
fi

# Start backend services
echo "📦 Starting PostgreSQL and Backend..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if backend is responding
echo "🔍 Checking backend health..."
if curl -s http://localhost:8080/health > /dev/null; then
    echo "✅ Backend is running successfully!"
    echo "🌐 Backend URL: http://localhost:8080"
    echo "📊 Health Check: http://localhost:8080/health"
else
    echo "❌ Backend is not responding. Check logs with: docker-compose logs app"
fi

echo ""
echo "📝 Next steps:"
echo "1. Create .env.local in frontend with: BACKEND_API_URL=http://localhost:8080"
echo "2. Start frontend: npm run dev"
echo "3. Login to get JWT token"
echo "4. Use camera capture to analyze refrigerator images"
