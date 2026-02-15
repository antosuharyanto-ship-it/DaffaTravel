# start-local.ps1
# This script starts both the backend and frontend for local simulation.

Write-Host "🧹 Aggressively cleaning up ports 5000, 5173, and 5174..." -ForegroundColor Yellow
try {
    # Find and kill any process on our target ports
    $ports = @(5000, 5173, 5174)
    foreach ($port in $ports) {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        foreach ($conn in $connections) {
            Write-Host "Killing process $($conn.OwningProcess) on port $port" -ForegroundColor Gray
            Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
        }
    }
    Start-Sleep -Seconds 1
}
catch {
    Write-Host "Note: Some processes could not be cleared, but we will try starting anyway." -ForegroundColor Gray
}

Write-Host "🚀 Starting Daffa Travel Local Simulation..." -ForegroundColor Cyan

# 1. Start Backend in a new window
Write-Host "Starting Backend on http://localhost:5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm start"

# 2. Start Frontend in a new window (Strict Port 5173)
Write-Host "Starting Frontend on http://localhost:5173..." -ForegroundColor Green
$env:VITE_API_URL = "http://localhost:5000/api"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; `$env:VITE_API_URL='http://localhost:5000/api'; npm run dev -- --port 5173 --strictPort"

Write-Host "`n✅ Both servers are starting in separate windows." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "Backend: http://localhost:5000" -ForegroundColor White
